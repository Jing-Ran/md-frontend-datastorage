(function () {
  'use strict';

  var updateBtn = document.querySelector('.update-btn');
  var inputs = document.querySelectorAll('.settingItem input[type="radio"]');

  function findCheckedInput() {
    var results = [];
    var i;
    for (i = 0; i < inputs.length; i++) {
      if (inputs[i].checked ) results.push(inputs[i]);
    }
    return results;
  }

  function updateStorage() {
    // name attribute -> key
    // value attribute -> value
    var checkedInputs = findCheckedInput();
    var i;

    for (i = 0; i < checkedInputs.length; i++) {
      if (checkedInputs[i].dataset.greeting === 'customized') {
        // customized
        localStorage.setItem(checkedInputs[i].name, checkedInputs[i].nextElementSibling.value);
        localStorage.setItem('customized', 'true');
      } else {
        localStorage.setItem(checkedInputs[i].name, checkedInputs[i].value);
        localStorage.setItem('customized', 'false');
      }
    }
  }
  
  function updateUI() {
    var allPs = document.querySelectorAll('.main p');
    var i, j;
    var keyName;
    var targetInputs;

    // update UI based on localStorage
    document.querySelector('.greeting').innerHTML = localStorage.getItem('greeting');
    document.querySelector('.main').style.backgroundColor = localStorage.getItem('bgColor');
    for (i = 0; i < allPs.length; i++) {
      allPs[i].style.fontSize = localStorage.getItem('fontSize');
    }

    // Has customized greeting or not
    if (localStorage.getItem('customized') === 'true')
      document.querySelector('.greeting--customized input').value = localStorage.getItem('greeting');

    // UI: keep updated radio inputs selection after reloading
    for (i = 0; i < localStorage.length; i++) {
      keyName = localStorage.key(i);
      targetInputs = document.getElementsByName(keyName);
      for (j = 0; j < targetInputs.length; j++) {
        if (targetInputs[j].value === localStorage.getItem(keyName))
          targetInputs[j].checked = true;
        else
          targetInputs[j].checked = false;
      }
    }
  }


  // Initialize localStorage
  if (localStorage.length <= 0) {
    var defaultInputs = document.querySelectorAll('input.default');
    var i;
    for (i = 0; i < defaultInputs.length; i++) {
      defaultInputs[i].checked = true;
    }
    updateStorage();
  }
  // update UI onload
  updateUI();


  updateBtn.addEventListener('click', function () {
    updateStorage();
    updateUI();
  });
})();
