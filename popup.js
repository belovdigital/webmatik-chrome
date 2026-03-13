/**
 * Webmatik Chrome Extension — popup logic
 */
(function () {
  'use strict';

  var API_BASE = 'https://webmatik.ai/api/v1';
  var CONNECT_URL = 'https://webmatik.ai/connect?source=Chrome';

  var states = {
    loading: document.getElementById('state-loading'),
    connect: document.getElementById('state-connect'),
    ready: document.getElementById('state-ready'),
    running: document.getElementById('state-running'),
    result: document.getElementById('state-result'),
    error: document.getElementById('state-error')
  };

  function show(name) {
    Object.keys(states).forEach(function (k) {
      states[k].style.display = k === name ? 'flex' : 'none';
    });
  }

  function getApiKey(cb) {
    chrome.storage.local.get('apiKey', function (data) {
      cb(data.apiKey || null);
    });
  }

  // Init
  getApiKey(function (key) {
    if (key) {
      showReady();
    } else {
      show('connect');
    }
  });

  // Listen for key changes (in case connect tab saves key while popup is open)
  chrome.storage.onChanged.addListener(function (changes) {
    if (changes.apiKey && changes.apiKey.newValue) {
      showReady();
    }
  });

  function showReady() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var url = (tabs[0] && tabs[0].url) || '';
      document.getElementById('site-url').textContent = url;
      document.getElementById('site-url').title = url;
      show('ready');
    });
  }

  // Connect
  document.getElementById('btn-connect').addEventListener('click', function () {
    chrome.tabs.create({ url: CONNECT_URL });
  });

  // Disconnect
  document.getElementById('btn-disconnect').addEventListener('click', function () {
    chrome.storage.local.remove('apiKey', function () {
      show('connect');
    });
  });

  // Run Audit
  document.getElementById('btn-audit').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var url = (tabs[0] && tabs[0].url) || '';
      if (!url || url.startsWith('chrome://') || url.startsWith('chrome-extension://')) {
        showError('Navigate to a website first.');
        return;
      }
      startAudit(url);
    });
  });

  function startAudit(url) {
    show('running');
    document.getElementById('running-status').textContent = 'Starting audit...';

    getApiKey(function (key) {
      if (!key) {
        show('connect');
        return;
      }

      fetch(API_BASE + '/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': key
        },
        body: JSON.stringify({ url: url })
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.auditId) {
            document.getElementById('running-status').textContent =
              'Analyzing\u2026 this takes 2\u20133 minutes.';
            pollAudit(data.auditId, key);
          } else {
            showError(data.error || 'Failed to start audit');
          }
        })
        .catch(function (err) {
          showError(err.message || 'Network error');
        });
    });
  }

  function pollAudit(auditId, key) {
    fetch(API_BASE + '/audit/' + auditId, {
      headers: { 'X-API-Key': key }
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.status === 'processing') {
          setTimeout(function () { pollAudit(auditId, key); }, 5000);
        } else if (data.status === 'completed') {
          showResult(data);
        } else {
          showError('Audit failed. Please try again.');
        }
      })
      .catch(function () {
        // Retry on network error
        setTimeout(function () { pollAudit(auditId, key); }, 10000);
      });
  }

  function showResult(data) {
    document.getElementById('score-value').textContent = Math.round(data.score);
    document.getElementById('score-grade').textContent = 'Grade: ' + (data.grade || '');

    var link = document.getElementById('report-link');
    if (data.reportUrl) {
      link.href = data.reportUrl;
      link.style.display = 'inline-flex';
    } else {
      link.style.display = 'none';
    }

    show('result');
  }

  function showError(msg) {
    document.getElementById('error-msg').textContent = msg;
    show('error');
  }

  // New Audit
  document.getElementById('btn-new-audit').addEventListener('click', function () {
    showReady();
  });

  // Retry
  document.getElementById('btn-retry').addEventListener('click', function () {
    showReady();
  });
})();
