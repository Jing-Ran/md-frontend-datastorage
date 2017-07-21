(function () {
  'use strict';

  var colorBlock2 = document.querySelector('.color-block--2');

  window.addEventListener('load', function () {
    colorBlock2.style.backgroundColor = localStorage.getItem('bgColor');
  });

  window.addEventListener('storage', function (e) {
    colorBlock2.style.backgroundColor = e.newValue;
  });
})();
