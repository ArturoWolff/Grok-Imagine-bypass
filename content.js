function observeTweets() {
  const observer = new MutationObserver(() => {
    document.querySelectorAll('article[data-testid="tweet"]').forEach(tweet => {
      if (tweet.dataset.grokInjected) return;

      const video = tweet.querySelector("video[poster]");
      if (!video) return;

      tweet.dataset.grokInjected = "true";
      injectButton(tweet, video);
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function injectButton(tweet, video) {
  const btn = document.createElement("button");
  btn.textContent = "Send to Grok";
  btn.style.marginLeft = "8px";
  btn.style.padding = "6px 10px";
  btn.style.cursor = "pointer";

btn.onclick = () => {
  const posterUrl = video.getAttribute("poster");
  if (!posterUrl) {
    alert("No thumbnail found.");
    return;
  }

  // Force download
  const a = document.createElement("a");
  a.href = posterUrl;
  a.download = "tweet-thumbnail.jpg";
  document.body.appendChild(a);
  a.click();
  a.remove();

  // Open Grok
  window.open("https://x.com/i/grok", "_blank");
};

  const actionBar = tweet.querySelector('[role="group"]');
  if (actionBar) actionBar.appendChild(btn);
}

observeTweets();
