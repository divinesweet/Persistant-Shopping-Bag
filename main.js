
window.onload = function () {


  allData = {};
  currentData = {some: "data", goes: "here"};

  // to initialize the all data using the storage
  chrome.storage.sync.get('allData', function(data) {
    // check if data exists.
    if (data) {
        allData = data;
    } else {
        allData[Object.keys(allData).length] = currentData;
    }
  });

  // Save it using the Chrome extension storage API.
  chrome.storage.sync.set({'allData': allData}, function() {
    // Notify that we saved.
    message('Settings saved');
  });


(function () {alert "Hello"};)()
/*
  function add_item() {
    let curUrl = window.location.href
    let curTitle = document.title

    let item_url = document.createElement("a")
    let list_item = document.createElement("li");
    item_url.href = curUrl;
    item_url.innerHTML = curTitle;
    list_item.appendChild(item_url);
    document.querySelector('ol').append(list_item);
    chrome.storage.sync.set({'url' : curTitle}, function (curTitle) {
      console.log(curTitle);
    });


    console.log('Running function!')
  }
*/

}
