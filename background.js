/**
 * Webmatik Chrome Extension — background service worker
 * Receives API key from content script and stores it.
 */

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'webmatik-connected' && message.key) {
    chrome.storage.local.set({ apiKey: message.key }, () => {
      sendResponse({ ok: true });
    });
    // Close the connect tab
    if (sender.tab && sender.tab.id) {
      chrome.tabs.remove(sender.tab.id);
    }
    return true; // keep channel open for async sendResponse
  }
});
