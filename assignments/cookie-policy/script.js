(function () {
  'use strict';
  var cookieModal = document.querySelector('.c-modal');
  var disagreeBtn = document.querySelector('.c-btn--disagree');
  var agreeBtn = document.querySelector('.c-btn--agree');
  var allCookies = document.cookie;

  function checkCookieExistence() {
    var policyCookie = /(?:\bcookie_policy=yes;?\b)/;
    return policyCookie.test(allCookies);
  }

  function closeModal() {
    cookieModal.classList.remove('modal-show');
  }

  window.onload = function () {
    if (checkCookieExistence()) cookieModal.style.display = 'none';
  };

  disagreeBtn.addEventListener('click', closeModal);
  agreeBtn.addEventListener('click', function () {
    closeModal();

    // set cookie's expiry date to 20sec for testing
    document.cookie = 'cookie_policy=yes;max-age=20';
  });
})();
