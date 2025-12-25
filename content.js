function observeTweets() {
  const observer = new MutationObserver(() => {
    document.querySelectorAll('article[data-testid="tweet"]').forEach(tweet => {
      if (tweet.dataset.grokInjected) return;

      injectButton(tweet);
      tweet.dataset.grokInjected = "true";
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function injectButton(tweet) {
  const btn = document.createElement("button");
  btn.textContent = "Send to Grok";
  btn.style.marginLeft = "8px";
  btn.style.padding = "6px 10px";
  btn.style.cursor = "pointer";

  btn.onclick = () => handleClick(tweet);

  const actionBar = tweet.querySelector('[role="group"]');
  if (actionBar) actionBar.appendChild(btn);
}

function handleClick(tweet) {
  const mediaUrl = findMediaUrl(tweet);

  if (!mediaUrl) {
    alert("No image or video thumbnail found in this tweet.");
    return;
  }

  downloadAndOpen(mediaUrl);
}

function findMediaUrl(tweet) {
  // 1️⃣ Video thumbnail
  const video = tweet.querySelector("video[poster]");
  if (video?.poster) return video.poster;

  // 2️⃣ Card preview image
  const cardImg = tweet.querySelector('img[src*="/card_img/"]');
  if (cardImg?.src) return cardImg.src;

  // 3️⃣ Fallback: any pbs.twimg.com image
  const anyImg = tweet.querySelector('img[src*="pbs.twimg.com"]');
  if (anyImg?.src) return anyImg.src;

  return null;
}

function downloadAndOpen(url) {
  const a = document.createElement("a");
  a.href = url;
  a.download = "tweet-media.jpg";
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.open("https://x.com/i/grok", "_blank");
}

observeTweets();
