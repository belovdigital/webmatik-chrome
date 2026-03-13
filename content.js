/**
 * Webmatik Chrome Extension — content script
 * Runs on webmatik.ai/connect to capture the API key after authorization.
 */

(function () {
  'use strict';

  var observer = new MutationObserver(function () {
    var el = document.getElementById('webmatik-ext-key');
    if (el && el.dataset.key) {
      chrome.runtime.sendMessage({
        type: 'webmatik-connected',
        key: el.dataset.key
      });
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Also check immediately in case element already exists
  var el = document.getElementById('webmatik-ext-key');
  if (el && el.dataset.key) {
    chrome.runtime.sendMessage({
      type: 'webmatik-connected',
      key: el.dataset.key
    });
    observer.disconnect();
  }
})();
