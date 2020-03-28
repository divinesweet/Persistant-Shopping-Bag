
let title =  document.title;
let url = window.location.href;


chrome.runtime.sendMessage({
  "title": title,
  "url" : url,
  "timeSeen" : new Date().getDay()
}, function(response) {
  console.log(response.farewell);
});

console.log("Title taken: " + title);
console.log("URL taken: " + url);
