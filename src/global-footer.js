/* Start RudderStack Analytics */
!(function () {
  var e = (window.rudderanalytics = window.rudderanalytics || []);
  (e.methods = [
    'load',
    'page',
    'track',
    'identify',
    'alias',
    'group',
    'ready',
    'reset',
    'getAnonymousId',
    'setAnonymousId',
    'getUserId',
    'getUserTraits',
    'getGroupId',
    'getGroupTraits',
    'startSession',
    'endSession',
  ]),
    (e.factory = function (t) {
      return function () {
        e.push([t].concat(Array.prototype.slice.call(arguments)));
      };
    });
  for (var t = 0; t < e.methods.length; t++) {
    var r = e.methods[t];
    e[r] = e.factory(r);
  }
  (e.loadJS = function (e, t) {
    var r = document.createElement('script');
    (r.type = 'text/javascript'),
      (r.async = !0),
      (r.src = 'https://cdn.rudderlabs.com/v1.1/rudder-analytics.min.js');
    var a = document.getElementsByTagName('script')[0];
    a.parentNode.insertBefore(r, a);
  }),
    e.loadJS(),
    e.load('2Eht2eKKAQggUj4txydjoMkyqO2', 'https://windsorprhtv.dataplane.rudderstack.com'),
    e.page();
})();
/* End RudderStack Analytics */

/* Start iubenda Setup */
var _iub = _iub || {};
_iub.cons_instructions = _iub.cons_instructions || [];
_iub.cons_instructions.push(['init', { api_key: 'pA6e8OMSmCEOqylFE4zVQjPf43XovPIY' }]);

(function (w, d) {
  var loader = function () {
    var s = d.createElement('script'),
      tag = d.getElementsByTagName('script')[0];
    s.src = 'https://cdn.iubenda.com/iubenda.js';
    tag.parentNode.insertBefore(s, tag);
  };
  if (w.addEventListener) {
    w.addEventListener('load', loader, false);
  } else if (w.attachEvent) {
    w.attachEvent('onload', loader);
  } else {
    w.onload = loader;
  }
})(window, document);
/* End iubenda Setup */

/* Start Rewardful Affiliates */
(function (w, r) {
  w._rwq = r;
  w[r] =
    w[r] ||
    function () {
      (w[r].q = w[r].q || []).push(arguments);
    };
})(window, 'rewardful');
/* End Rewardful Affiliates */

/* Start referral cookie */
function setReferralCookie() {
  const queryParams = new URLSearchParams(window.location.search);
  if (queryParams.has('via')) {
    const referralCookieName = '__windsor_ref';
    const refferalCode = queryParams.get('via');
    const cookieExpiry = 60 * 24 * 60 * 60 * 1000; // 60 days in milliseconds
    const cookieDomain = '.windsor.io';
    const cookiePath = '/';
    const hasReferralCookie = document.cookie.match(
      `(^|;)\\s*${referralCookieName}\\s*=\\s*([^;]+)`
    );
    const existingReferralCode = hasReferralCookie ? hasReferralCookie[2] : null;
    if (existingReferralCode !== refferalCode) {
      document.cookie = `${referralCookieName}=${refferalCode};expires=${new Date(
        Date.now() + cookieExpiry
      )};domain=${cookieDomain};path=${cookiePath};secure`;
    }
  }
}
window.addEventListener('load', setReferralCookie);
/* End referral cookie */

/* Start VWO Async SmartCode */
vwo_$('body').vwoCss({ visibility: 'visible !important' });
/* End VWO Async SmartCode */
