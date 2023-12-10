// ==UserScript==
// @name        Revert X to Twitter Embed
// @namespace   https://github.com/CatmanFan/Revert-X-to-Twitter-Embed
// @icon        https://www.iconarchive.com/download/i76545/xenatt/minimalism/App-Twitter.256.png
// @author      Mr._Lechkar / CatmanFan
// @description Fixes Twitter/X embed by reverting X references back to original Twitter ones.
// @version     0.1
// @match       https://platform.twitter.com/embed/Tweet.html
// @run-at      document-start
// @grant       GM_addStyle
// ==/UserScript==

// Original color (copied from Yakisova's X to Twitter userscript)
GM_addStyle(`
svg.r-18jsvk2 {
	color: rgb(29, 155, 240);
}
`);

// Original bird (copied from Yakisova's X to Twitter userscript)
var birdPath = 'M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z';
var xPath = 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'

// Check for "X"/"post" string and return reverted, function
function revertString(item) {
    var string = item;

    if (string.includes("post"))  { string = string.replace("post", "Tweet"); }
    if (string.includes(" X"))    { string = string.replace(" X", " Twitter"); }

    return string;
}

function revertXLogo() {
  SVG = document.getElementsByClassName("r-18jsvk2 r-4qtqp9 r-yyyyoo r-6zzn7w r-19fsva8 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-q1j0wu")[0].querySelector('g').querySelector('path');

  if (SVG.getAttribute('d') == xPath) {
    SVG.setAttribute('d', birdPath);
  }
}

function revertHover() {
  var Text = document.getElementById("layers").getElementsByClassName("css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0")[0];

  if (Text) { Text.innerHTML = revertString(Text.innerHTML); }
}


// Revert all strings
function revertStrings() {

  // "Share this post"
  var items = document.getElementsByClassName("css-901oao css-1hf3ou5 r-14j79pv r-1qd0xha r-1b43r93 r-b88u0q r-1cwl3u0 r-13hce6t r-bcqeeo r-qvutc0");

  for (itemX of items) {
    item = itemX.getElementsByClassName("css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0")[0];
    if (item) { item.innerHTML = revertString(item.innerHTML); }
  }

  // "Read more on X"
  items = document.getElementsByClassName("css-901oao css-16my406 css-1hf3ou5 r-poiln3 r-1b43r93 r-1cwl3u0 r-bcqeeo r-qvutc0");

  for (itemX of items) {
    item = itemX.getElementsByClassName("css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0")[0];
    if (item) { item.innerHTML = revertString(item.innerHTML); }
  }

  // Same for Accessibility Labels
  /* items = document.querySelectorAll('body *');

  for (item of items) {
    if (item.getAttribute('aria-label').includes(" X") || item.getAttribute('aria-label').includes(" post"))
    {
      string = item.getAttribute('aria-label');
      window.alert(string);
      item.setAttribute('aria-label', revertString(string));
    }
  } */
}

setInterval(revertXLogo, 1);
setInterval(revertHover, 1);
setInterval(revertStrings, 5);
