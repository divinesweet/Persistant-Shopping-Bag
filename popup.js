
window.onload = function() {
//  cleateTheList();
  //doSomethingElse();
};

  const addItems = document.getElementById('add_link');
  console.log(addItems);

/*
function cleateTheList() {
  console.log("Loged from the list");
  chrome.storage.sync.get("title", function (storageContent) {

  })
}

*/



chrome.storage.sync.get("savedUrls", function (result) {
  let savedUrls = {};

  if (result.savedUrls) {
    console.log(true);
    savedUrls = JSON.parse(result.savedUrls);
    let allKeys = Object.keys(savedUrls);
    for (let i = 0; i < allKeys.length; i++) {
      let item_url = document.createElement("a");
      let item_delete = document.createElement("button");
      item_delete.innerHTML = 'x';

      let list_item = document.createElement("li");
      item_url.href = allKeys[i];
      item_url.innerHTML = savedUrls[allKeys[i]].title;
      list_item.appendChild(item_url);
      list_item.appendChild(item_delete);
      document.querySelector('ol').append(list_item);
/*
      document.getElementsByTagName("button").forEach((item, i) => {
        item[i].parentNode.removeChild(item[i]);

      });*/

    }


  }
});

/*
function deleteFunction(object, key) {
  delete object[key];
}
*/


addItems.addEventListener('click', addingToStorage);

  function addingToStorage() {
    let params = {
      active : true,
      currentWindow: true
    }

    chrome.tabs.query(params, gotTabs);

    function gotTabs(tab) {
      let title = tab[0].title;
      let url = tab[0].url;
      let timeAdded = Date.now();

    //  console.log('titile' , title, 'url' , url);
      let savedUrls = {};
      chrome.storage.sync.get("savedUrls", function (result) {


        if (result.savedUrls) {

          console.log(true);
          savedUrls = JSON.parse(result.savedUrls);

          if (!savedUrls[url]) {
            let item_url = document.createElement("a");
            let list_item = document.createElement("li");

            item_url.href =url;

            item_url.innerHTML = title;
            list_item.appendChild(item_url);
            document.querySelector('ol').append(list_item);
          } else{


            if (!document.querySelector('span')) {
              let repetition = document.createElement("span");
              repetition.innerHTML = "The item already exist";
                document.querySelector('body').append(repetition);
                setTimeout(function () {
                  document.querySelector('span').parentNode.removeChild(document.querySelector('span'));
                }, 1500)
            }

          }

          savedUrls[url] = {
            "title" : title,
            "timeAdded" : timeAdded
          }



          savedUrls = JSON.stringify(savedUrls);

          chrome.storage.sync.set({
            savedUrls  : savedUrls
          }, function () {
            console.log("Value is set to" + savedUrls);
          })

        } else{
          console.log(false);
          savedUrls[url] = {
            "title" : title,
            "timeAdded" : timeAdded
          }
          let item_url = document.createElement("a");
          let list_item = document.createElement("li");

          item_url.href =url;

          item_url.innerHTML = title;
          list_item.appendChild(item_url);
          document.querySelector('ol').append(list_item);

          savedUrls = JSON.stringify(savedUrls);

          chrome.storage.sync.set({
            savedUrls  : savedUrls
          }, function () {
            console.log("Value is set to" + savedUrls);
          })

        }
        //allTitles.push(title);
        //title = JSON.stringify(allTitles);


      }

    )





    }
  //  console.log("button clicked");
  }

  chrome.storage.onChanged.addListener(function(changes, namespace) {
     for (var key in changes) {
       var storageChange = changes[key];
       console.log('Storage key "%s" in namespace "%s" changed. ' +
                   'Old value was "%s", new value is "%s".',
                   key,
                   namespace,
                   storageChange.oldValue,
                   storageChange.newValue);
     }
   });
