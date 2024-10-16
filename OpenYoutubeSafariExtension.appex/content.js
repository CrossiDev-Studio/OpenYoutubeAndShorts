browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});

function afterNavigate() {
    if (location.pathname.startsWith('/watch') || location.pathname.startsWith('/shorts')) {
        window.location.href = `youtube://${window.location.pathname.slice(1)}${window.location.search}${window.location.hash}`;
    }
}

// Füge hier den popstate Listener hinzu
window.addEventListener('popstate', afterNavigate);

(document.body || document.documentElement).addEventListener('transitionend',
  function(/*TransitionEvent*/ event) {
    if (event.propertyName === 'width' && event.target.id === 'progress') {
        afterNavigate();
    }
}, true);

// After page load
afterNavigate();
