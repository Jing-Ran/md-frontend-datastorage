(function () {
  'use strict';

  var colorBlock1 = document.querySelector('.color-block--1');
  var defaultColor = window.getComputedStyle(colorBlock1).getPropertyValue('background-color');
  var blueBtn = document.querySelector('.btn--blue');
  var pinkBtn = document.querySelector('.btn--pink');
  var resetBtn = document.querySelector('.btn--reset');

  function changeBgColor(color) {
    colorBlock1.style.backgroundColor = color;
  }
  
  function updateStorage(color) {
    localStorage.setItem('bgColor', color);
  }
  
  function updateAll(btn) {
    var newBgColor = window.getComputedStyle(btn).getPropertyValue('background-color');
    changeBgColor(newBgColor);
    updateStorage(newBgColor);
  }

  // page 1 loaded
  if (localStorage.length <= 0) {
    localStorage.setItem('bgColor', defaultColor);
  } else {
    changeBgColor(localStorage.getItem('bgColor'));
  }

  blueBtn.addEventListener('click', function () {
    updateAll(this);
  });
  pinkBtn.addEventListener('click', function () {
    updateAll(this);
  });
  resetBtn.addEventListener('click', function () {
    updateAll(this);
  });

})();
