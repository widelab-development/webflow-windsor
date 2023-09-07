/**
 * Props
 */
const mocks = [
  'CKVqq1oKk00GmGoPOgS3fnd5tSE02fiRg2R74mKjA602Aw',
  '01Dupb9v00NfoXEpuk7ES3yE02G5yuk00k4DAAexVTxIe9Y',
  'QVwJgx6kgMA9HZH00YU1e3yFa2YkbahTQmAkop01c6xNU',
  'aA1N01eFJnpetibU47005af3YL66amQ00ZoR4eN70202Z21I',
  'NrLtqHw22o6E8UQWf802A8B88F007018Cg02rUz8Oe01EGiE',
  'gcI1EWcsCrganVNgMlvZlVzV9a5ZBI4LB8SzQkqq2ME',
  '302bBB1WMAKO02OnL8OBm7a435G4bvSh1kfdnxpsv2eSQ',
  'LwTht5lNktGVDf33Ao338Nq3fHvwUZ1wFtJqlLz8p1w',
  '02l3kXu005jHke2jQXcO9ebmOgFVSa8gw116LNqivIzfQ',
  'jD4VentD36zUYZmpPHu2ZkM02wBhdFF9i625cAyIzllc',
  'L1uvtLtF401BoLoGYYIHyI7pUhdwyk9fd75nj4cksq7Y',
  '8Z1iXAOecOKnlj3udy4Skcxzla01iJwN832KQQWJf0018',
  'LWXmlg4CssebLUtcTAdHbd00Gi2uMPJpIFn02x1Kil8Eo',
  'QRMGKqMD01jwoqa5FybcjaLmM7Esx01H99KLza4XuIpDg',
  'J4H00uEiMTe1MQjlDo4ujH7iH9fuJbazjWAropYgP6Mk',
  '51DGGQXJgRg39rka6reNkkUNrPNJP00d5Nka9YUYeVh4',
  'ShPazurN55hr4kc8yFT49iqEl8e9JsFAx5pZ74eM3CQ',
  'SzycT2PGbFsWd00WbZTiXKK02Od01vDwCFkh02vl1GQigzc',
  '34HZyTkYnRKRPSJJjsy46CH1O7kXFVG6VSrxzYpA6o8',
  //'CpehKnU027ir7Jmz9nrThtrqAx8Z2W2B02gHgexODXR9M',
  'udNN8O3IeCGZYMNEiX40185Bp02XeNrF02oLo7EExVuTzE',
];

const mainVid = document.getElementById('main-video');
const urlParams = new URLSearchParams(window.location.search);
const apiUrl = 'https://landing-page-api.windsor.io/synth-video?firstName=';
const apiCallSettings = {
  async: true,
  crossDomain: true,
  url: '',
  method: 'GET',
  headers: {},
};

let seeked = false;
let firstSwipe = false;
let videoExist = false;
let swipeEnabled = false;
// let t = 5;
let d = 50;
let larrow = $('#vg-slider .w-slider-arrow-left');
let rarrow = $('#vg-slider .w-slider-arrow-right');
let startX, diffX;

/**
 * Get rid of empty slides
 */
for (let x = $('#vg-slider').find('.w-slide').length; x > mocks.length + 1; x--) {
  $('#vg-slider').find('.w-slide')[x - 1].remove();
}

/**
 *  Functions
 */
const Shuffle = (a) => {
  let l = a.length,
    t,
    i;
  while (l) {
    i = Math.floor(Math.random() * (l - 1));
    t = a[l];
    a[l] = a[i];
    a[i] = t;
  }
  return a;
};

const CreateMockVids = (m, el) => {
  let v = mainVid;
  for (let i = 0; i < el; i++) {
    if (el !== 1) {
      v = document.getElementById(`swipe-video-${i + 2}`);
    }
    if (Hls.isSupported()) {
      let hlsvid = new Hls();
      hlsvid.loadSource('https://stream.mux.com/' + m[i] + '.m3u8');
      hlsvid.attachMedia(v);
    } else if (v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = 'https://stream.mux.com/' + m[i] + '.m3u8';
    } else {
      $(`#swipe-video-${i}`).attr('src', 'https://stream.mux.com/' + m[i] + '/medium.mp4');
    }
  }
};

const URLUpdate = (n) => {
  window.history.pushState(null, null, window.location.href.split('?')[0] + '?firstname=' + n);
};

const ShareIcons = (n) => {
  $('a.facebook').attr(
    'href',
    'https://www.facebook.com/sharer/sharer.php?u=https://windsor.io/demo?firstname=' + n
  );
  $('a.linkedin').attr(
    'href',
    'https://www.linkedin.com/sharing/share-offsite/?url=https://windsor.io/demo?firstname=' + n
  );
  $('a.twitter').attr(
    'href',
    'https://twitter.com/intent/tweet?url=https://windsor.io/demo?firstname=' +
      n +
      '&text=This%20is%20crazy.%20I%20just%20created%20a%20custom%20AI%20generated%20video%20with%20my%20name%20in%20seconds!%20This%20is%20next%20level%20personalization.%20Check%20out%20https://windsor.io.io&via=windsorio'
  );
  $('a.email').attr(
    'href',
    'mailto:?subject=Try%20Windsor`s%20AI%20yourself&body=This%20is%20crazy.%20I%20just%20created%20a%20custom%20AI%20generated%20video%20with%20my%20name%20in%20seconds!%20This%20is%20next%20level%20personalization.%20Check%20out%20https%3A//windsor.io/demo?firstname=' +
      n
  );
};

const CapitalizeFirstLetter = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const SetName = (n) => {
  $('#vg-uv-namespan').text(n);
  $('#vg-notify-name').val(n);
};

const ShowEmailError = (s) => {
  $('.vg-notify-form').fadeOut(300);
  if (s) {
    $('.vg-uv-after-submit-error').delay(300).fadeIn(300);
  } else {
    $('.vg-uv-after-submit-success').delay(300).fadeIn(300);
  }
};

const ErrorState = (v, s) => {
  videoExist = false;
  firstSwipe = false;

  CreateMockVids(v, 1);

  $('.vg-rs-share-box-mobile-wrapper').hide(0);
  $('.vg-svc-generate').fadeOut(300);
  if (s) {
    $('.vg-svc-limit').delay(300).fadeIn(300);
    $('.vg-uv-limit, .vg-under-video-mobile').slideDown(300);
  } else {
    $('.vg-svc-error').delay(300).fadeIn(300);
    $('.vg-uv-error, .vg-under-video-mobile').slideDown(300);
  }

  setTimeout(() => {
    swipeEnabled = true;
    $('.vg-play-btn').hide(0);
    $('.vg-mask').css('z-index', '6');
    $('.vg-swipe-info-popup').fadeIn(300);
    $('.vg-custom-arrow,.vg-swipe-info-mobile-wrapper').delay(300).fadeIn(300);
  }, 300);
};

const Processing = async (n, v, m) => {
  let b;
  let h = {
    'x-api-key': 'UcylrP3lBj73wn8n66L8eaA71HUIbLSR3qupLwGc',
    'Content-Type': 'application/json',
  };
  if (m) {
    b = JSON.stringify({
      firstName: n,
      email: m,
    });
  } else {
    b = JSON.stringify({ firstName: n });
  }

  await fetch('https://landing-page-videos.windsor.io', {
    method: 'POST',
    body: b,
    headers: h,
  }).then((response) => {
    setTimeout(() => {
      if (response.status === 204) {
        if (v) {
          ErrorState(v, false);
        } else if (m) {
          ShowEmailError(false);
        }
      } else {
        if (v) {
          ErrorState(v, true);
        } else if (m) {
          ShowEmailError(true);
        }
      }
    }, 1500);
  });
};

const CallAPI = (s, n) => {
  let m = [...mocks];
  Shuffle(m);

  $.ajax(s)
    .done((response) => {
      if (response.statusCode === 200 && response.data.status === 'PUBLISHED') {
        videoExist = true;
        firstSwipe = true;

        let hlsurl = 'https://stream.mux.com/' + response.data.muxPlaybackId + '.m3u8';
        let mp4url = response.data.videoURL;

        if (Hls.isSupported()) {
          let hls = new Hls();
          hls.loadSource(hlsurl);
          hls.attachMedia(mainVid);
        } else if (mainVid.canPlayType('application/vnd.apple.mpegurl')) {
          mainVid.src = hlsurl;
        } else {
          mainVid.src = mp4url;
        }

        setTimeout(() => {
          ShareIcons(n);
          if (swipeEnabled) {
            $('.vg-custom-arrow').fadeIn(300);
            $('.vg-swipe-info-mobile-wrapper,.vg-swipe-info-popup').show(0);
            $('.vg-on-video').css('display', 'flex');
          }
          $('.vg-rs-share-box-mobile-wrapper').show(0);
          $('.vg-svc-bg, .vg-svc-wrapper').fadeOut(300);
          $('.vg-under-video-mobile').slideDown(300);
          $('.vg-uv-generated').slideDown(300);
        }, 500);
      }
      if (response.statusCode === 200 && response.data.status === 'REJECTED') {
        Processing(n, m.pop().split(' '), false);
      }
    })
    .fail(() => {
      Processing(n, m.pop().split(' '), false);
    });
  // Create mock videos
  CreateMockVids(m, 19);
};

const Reaction = async (b) => {
  await fetch('https://hooks.zapier.com/hooks/catch/10432080/bnq8zuz/', {
    method: 'POST',
    body: b,
  });
};

const VideoPopups = (v) => {
  if (videoExist) {
    if (swipeEnabled) {
      $('.vg-on-video').css('display', 'flex');
      $('.vg-custom-arrow,.vg-swipe-info-mobile-wrapper').fadeIn(300);
    }

    if (v.paused && !v.seeking && !seeked && v.currentTime !== 0) {
      $('.vg-blur,.vg-ended-block-wrapper').fadeIn(300);
    }
    if (v.paused && v.seeking && seeked) {
      $('.vg-blur,.vg-ended-block-wrapper').fadeOut(300);
    }

    if (v.ended) {
      $('.vg-blur,.vg-ended-block-wrapper').fadeIn(300);
    }

    if (!v.paused && !v.ended) {
      $('.vg-blur,.vg-ended-block-wrapper').fadeOut(300);
      if (swipeEnabled) {
        $('.vg-swipe-info-popup').fadeIn(300);
      } else {
        $('.vg-swipe-info-popup').fadeOut(300);
      }
    }
  }
};

const ResetGenerator = () => {
  $('#vg-name').val('');
  $('.vg-video-section').slideUp(300);
  $('.vg-form-section').delay(300).slideDown(300);
  $(
    '.vg-svc-limit,.vg-svc-error,.vg-uv-generated,.vg-uv-limit,.vg-uv-error,.vg-uv-after-submit-success,.vg-uv-after-submit-error,.vg-blur,.vg-ended-block-wrapper,.vg-on-video,.vg-under-video-mobile,.vg-rs-share-box-mobile-wrapper,.vg-custom-arrow,.vg-swipe-info-mobile-wrapper'
  )
    .delay(300)
    .hide(0);
  $('.vg-mask').css('z-index', '2');
  $('.vg-rate-icon').delay(300).removeClass('isDisabled isChecked');
  $('.vg-play-btn,.vg-svc-bg,.vg-svc-generate,.vg-notify-form').delay(300).show(0);
  setTimeout(() => {
    $('.vg-video-section video').each(function () {
      $(this).get(0).pause();
      $(this).get(0).currentTime = 0;
    });
    $('#main-video').attr('src', '');
    $('.vg-slider-wrapper .w-slider-dot:first-child').trigger('click');

    videoExist = false;
  }, 300);
};

/**
 * Events
 */
$('document').ready(() => {
  // Swipe behavior
  $('.vg-mask').on('mousedown touchstart', function (e) {
    e.preventDefault();
    if (e.pageX) {
      startX = e.pageX;
    } else {
      startX = e.changedTouches[0].pageX;
    }
  });

  $('.vg-mask').on('mouseup touchend', function (e) {
    e.preventDefault();
    if (e.pageX) {
      diffX = e.pageX - startX;
    } else {
      diffX = e.changedTouches[0].pageX - startX;
    }
    if (Math.abs(diffX) > d && swipeEnabled) {
      if (diffX > 0) {
        larrow.trigger('click');
      } else if (diffX < 0) {
        rarrow.trigger('click');
      }
    } else {
      if (firstSwipe) {
        let cv = $(this).parent('.vg-show-video-content').find('video');
        if (cv[0].paused) {
          cv[0].play();
          $(this).children('.vg-play-btn').fadeOut(300);
        } else {
          cv[0].pause();
        }
      }
    }
  });

  $('.vg-mask').on('click tap', function (e) {
    e.preventDefault();
  });

  // Pass by parameters
  if (urlParams.get('firstname') && urlParams.get('firstname') !== '') {
    $('.vg-form-section').hide(0);
    $('.vg-video-section').show(0);

    let name = CapitalizeFirstLetter(urlParams.get('firstname'));
    apiCallSettings.url = apiUrl + name;

    SetName(name);

    setTimeout(() => {
      CallAPI(apiCallSettings, name);
    }, 4500);
  }

  // Generate with form
  $('#vg-form-landing').on('submit', function (e) {
    e.preventDefault();

    $('.vg-form-section').slideUp(300);
    $('.vg-video-section').delay(300).slideDown(300);

    let name = CapitalizeFirstLetter($('#vg-name').val());
    apiCallSettings.url = apiUrl + name;

    SetName(name);
    URLUpdate(name);

    setTimeout(() => {
      CallAPI(apiCallSettings, name);
    }, 4500);

    return false;
  });

  // Reset
  $('.vg-reset').on('click', () => {
    ResetGenerator();
    setTimeout(() => {
      $('#vg-name').focus();
    }, 600);
  });

  $('.vg-rs-close').on('click', () => {
    $('.vg-blur,.vg-ended-block-wrapper').fadeOut(300);
    if (swipeEnabled) {
      $('.vg-swipe-info-popup').delay(300).fadeIn(300);
    }
  });

  // Show/hide swipe/share/reaction popup
  mainVid.ontimeupdate = () => {
    if (mainVid.currentTime >= 6 && !swipeEnabled) {
      swipeEnabled = true;
    }
    VideoPopups(mainVid);
  };

  mainVid.onseeking = () => {
    seeked = true;
  };

  mainVid.onplay = () => {
    seeked = true;
    setTimeout(() => {
      seeked = false;
    }, 300);
  };

  mainVid.onended = () => {
    VideoPopups(mainVid, false);
  };

  // Stop each video play when next/prev slide
  $('.w-slider-arrow-left, .w-slider-arrow-right').on('click', () => {
    $('.vg-video-section video').trigger('pause');
    $('.vg-svc-bg,.vg-svc-limit,.vg-svc-error').delay(500).hide(0);
    if (!firstSwipe) {
      firstSwipe = true;
      setTimeout(() => {
        $('.vg-play-btn').show(0);
        $('.vg-mask').css('z-index', '2');
      }, 500);
    }
  });

  // Arrow click
  $('#vg-left').on('click', function (e) {
    e.preventDefault();
    larrow.trigger('click');
  });
  $('#vg-right').on('click', function (e) {
    e.preventDefault();
    rarrow.trigger('click');
  });

  // Reactions
  $('.vg-rate-icon').on('click', function (e) {
    e.preventDefault();
    $('.vg-rate-icon').removeClass('isChecked').addClass('isDisabled');
    $(this).removeClass('isDisabled').addClass('isChecked');
    const emoji = ['', '👍', '😍', '🤯', '😠', '😟'];
    let choosed = $(this).attr('href').slice(-1);
    Reaction(JSON.stringify({ reaction: emoji[choosed] }));
  });

  // Notify form submit
  $('#vg-notify').on('submit', function (e) {
    e.preventDefault();
    Processing($('#vg-notify-name').val(), false, $('#vg-notify-email').val());
    return false;
  });

  const tl = new TimelineMax();
  const controller = new ScrollMagic.Controller();

  tl.to(['.img-1', '.text-1'], 3, {})
    .call(function () {
      $('.img-1, .text-1, .img-2, .text-2').toggleClass('hiw-toggle');
    })

    .to(['.img-2', '.text-2'], 4, {})
    .call(function () {
      $('.img-2, .text-2, .img-3, .text-3').toggleClass('hiw-toggle');
    })

    .to(['.img-3', '.text-3'], 3, {});

  new ScrollMagic.Scene({
    triggerElement: '.vg-hiw-wrapper',
    triggerHook: 'onLeave',
    duration: '100%',
  })
    .setPin('.vg-hiw-wrapper')
    .setTween(tl)
    .addTo(controller);
});
