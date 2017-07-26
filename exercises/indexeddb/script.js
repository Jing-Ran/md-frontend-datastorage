(function () {
  'use strict';

  var ulEle = document.querySelector('ul');

  function createLi() {
    var li = document.createElement('li');
    var nameInput = document.createElement('input');
    var emailInput = document.createElement('input');
    var phoneInput = document.createElement('input');
    var deleteBtn = document.createElement('button');
    var updateBtn = document.createElement('button');
    var elementArr = [nameInput, emailInput, phoneInput, deleteBtn, updateBtn];
    nameInput.type = 'text';
    nameInput.name = 'name';
    emailInput.type = 'text';
    emailInput.name = 'email';
    phoneInput.type = 'text';
    phoneInput.name = 'phone'
    deleteBtn.type = 'button';
    deleteBtn.classList.add('btn--delete');
    deleteBtn.innerHTML = 'Delete';
    updateBtn.type = 'button';
    updateBtn.classList.add('btn--update');
    updateBtn.innerHTML = 'Update';

    for (var i = 0; i < elementArr.length; i++) {
      li.appendChild(elementArr[i]);
    }

    return li;
  }

  function initiateDB() {
    if ('indexedDB' in window) {
      var openRequest = window.indexedDB.open('myDB', 1);
      openRequest.onupgradeneeded = function (e) {
        console.log('initializing DB');
        var db = e.target.result;
        var objectStore = db.createObjectStore('friends', {keyPath: 'id', autoIncrement: true});
        objectStore.transaction.oncomplete = function (e) {
          var transaction = db.transaction('friends', 'readwrite');
          var objStore = transaction.objectStore('friends');
          var friendsArr = [
            {
              name: 'Rachel Green',
              email: 'rachel@gmail.com',
              phone: '111-111-1111'
            },
            {
              name: 'Monica Geller',
              email: 'monica@gmail.com',
              phone: '222-222-2222'
            },
            {
              name: 'Ross Geller',
              email: 'ross@gmail.com',
              phone: '333-333-3333'
            },
            {
              name: 'Chandler Bing',
              email: 'chandler@gmail.com',
              phone: '444-444-4444'
            },
            {
              name: 'Joey Tribbiani',
              email: 'joey@gmail.com',
              phone: '555-555-5555'
            }
          ];

          // add data
          for (var x in friendsArr) {
            objStore.add(friendsArr[x]);
          }
        };

      };
    }
  }


  function listFriends() {
    console.log('list friends');
    if ('indexedDB' in window) {
      var openRequest = window.indexedDB.open('myDB');

      openRequest.onsuccess = function (e) {
        // start a new transaction - get all records in the "friends" object store
        var db = e.target.result;
        var transaction = db.transaction('friends', 'readonly');
        var objectStore = transaction.objectStore('friends');
        var getRequest = objectStore.getAll();

        getRequest.onsuccess = function () {
          console.log('success ', getRequest.result);
          var results = getRequest.result;
          var fragment = document.createDocumentFragment();
          var liElement;
          for (var i = 0; i < results.length; i++) {
            liElement = createLi();
            liElement.querySelector('[name="name"]').value = results[i].name;
            liElement.querySelector('input[name="email"]').value = results[i].email;
            liElement.querySelector('input[name="phone"]').value = results[i].phone;
            liElement.setAttribute('id', results[i].id);
            fragment.appendChild(liElement);
          }
          ulEle.appendChild(fragment);
        };
      };
    }
  }

  function deleteItem(e) {
    if ('indexedDB')
    var key = parseInt(e.target.parentNode.id);

    // Delete Data from Database
    var openRequest = window.indexedDB.open('myDB');
    openRequest.onsuccess = function () {
      var db = openRequest.result;
      var objectStore = db.transaction('friends', 'readwrite').objectStore('friends');
      var deleteRequest = objectStore.delete(key);
      deleteRequest.onsuccess = function () {
        console.log('deleted ', deleteRequest);
        // Delete from UI
        ulEle.removeChild(e.target.parentNode);
      };

      deleteRequest.onerror = function () {
        console.log('delete fail');
      };
    };
  }
  
  
  function updateData(e) {
    var targetLi = e.target.parentNode;
    var key = parseInt(targetLi.id);

    var openRequest = window.indexedDB.open('myDB');

    openRequest.onsuccess = function () {
      var db = openRequest.result;
      var objectStore = db.transaction('friends', 'readwrite').objectStore('friends');
      var updatedData = {
        name: targetLi.querySelector('[name="name"]').value,
        email: targetLi.querySelector('[name="email"]').value,
        phone: targetLi.querySelector('[name="phone"]').value,
        id: key //in-line key
      };
      var updateRequest = objectStore.put(updatedData);

      updateRequest.onsuccess = function () {
        console.log('success update ');
        var getRequest = objectStore.getAll();
        getRequest.onsuccess = function () {
          console.log('success ', getRequest.result);
        }
      };
    }
  }
  


  // Delete database - call this function to reset
  function deleteDB() {
    var openRequest = window.indexedDB.deleteDatabase('myDB');
    openRequest.onsuccess = function () {
      console.log('Deleted DB');
    }
  }

  // deleteDB();


  initiateDB();
  listFriends();

  ulEle.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn--delete')) deleteItem(e);
    if (e.target.classList.contains('btn--update')) updateData(e);
  });

})();