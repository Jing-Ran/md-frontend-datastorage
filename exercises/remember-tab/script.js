(function () {
  'use strict';

  var homeInput = document.getElementById('homeDecor');
  var furnitureInput = document.getElementById('furniture');
  var kitchenInput = document.getElementById('kitchen');
  var clearanceInput = document.getElementById('clearance');
  var allInputs = document.querySelectorAll('input');

  function updateStorage(input) {
    localStorage.setItem('checkedInput', input.id);
  }

  if (localStorage.length <= 0) {
    localStorage.setItem('checkedInput', allInputs[0].id);
  } else {
    document.getElementById(localStorage.getItem('checkedInput')).checked =
      true;
  }

  homeInput.addEventListener('click', function () {
    updateStorage(this);
  });

  furnitureInput.addEventListener('click', function () {
    updateStorage(this);
  });

  kitchenInput.addEventListener('click', function () {
    updateStorage(this);
  });

  clearanceInput.addEventListener('click', function () {
    updateStorage(this);
  });
})();
