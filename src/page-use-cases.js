// Show loading animation.
function playPromiseHandler(v) {
  let video = v.play();
  if (video !== undefined) {
    video
      .then(() => {
        console.log('Automatic playback started!');
      })
      .catch((error) => {
        console.log('Auto-play was prevented - ' + error);
      });
  }
}
//play on mask click:
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
  get: function () {
    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
  },
});
function maskClick(modalVideos) {
  modalVideos.querySelectorAll('.vg-mask').forEach((mask) => {
    mask.addEventListener('click', () => {
      let v = mask.parentElement.querySelector('video');
      if (v.playing) {
        v.pause();
      } else {
        playPromiseHandler(v);
      }
    });
  });
}
//video stream inside modal:
function videoCall(v) {
  if (Hls.isSupported()) {
    let hlsvid = new Hls();
    hlsvid.loadSource('https://stream.mux.com/' + [v.id] + '.m3u8');
    hlsvid.attachMedia(v);
  } else if (v.canPlayType('application/vnd.apple.mpegurl')) {
    v.src = 'https://stream.mux.com/' + [v.id] + '.m3u8';
  } else {
    v.src = 'https://stream.mux.com/' + [v.id] + '/medium.mp4';
  }
}
// Swipers
function videoInitSwiper(i) {
  let id = i.id.replace('-', '');
  if (!i.querySelector('.video-swiper').classList.contains('swiper-container-initialized')) {
    window['swiper' + id] = new Swiper(i.querySelector('.video-swiper'), {
      slidesPerView: 'auto',
      runCallbacksOnInit: false,
      watchOverflow: true,
      spaceBetween: 0,
      loop: i.querySelectorAll('.swiper-slide').length > 1 ? true : false,
      preventInteractionOnTransition: true,
      navigation: {
        nextEl: i.querySelector('.video-button-next'),
        prevEl: i.querySelector('.video-button-prev'),
      },
      on: {
        init: function () {
          maskClick(i.querySelector('.video-swiper'));
        },
        transitionStart: function () {
          let videos = document.querySelectorAll('video');
          videos.forEach(function (video) {
            video.setAttribute('src', '');
          });
        },
        transitionEnd: function () {
          let { activeIndex } = this;
          let activeSlide = i.getElementsByClassName('video-slide')[activeIndex];
          let activeSlideVideo = activeSlide.getElementsByTagName('video')[0];
          videoCall(activeSlideVideo);
          if (!activeSlideVideo.playing) {
            playPromiseHandler(activeSlideVideo);
          }
        },
      },
    });
  }
  window['swiper' + id].update();
}
var swiperSeeMore = {};
//swiper inside a modal see more section:
function initializeSwiperSeeMore() {
  swiperSeeMore = new Swiper('.swiper-see-more', {
    spaceBetween: 27,
    watchOverflow: true,
    slidesPerView: 3,
    pagination: {
      el: '.see-more-pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      988: {
        slidesPerView: 3,
        spaceBetween: 27,
      },
    },
    pagination: {
      el: '.see-more-pagination',
      clickable: true,
    },
  });
  return swiperSeeMore;
}
// swiper filters on mobile
new Swiper('.filters-swiper', {
  spaceBetween: 8,
  slidesPerView: 'auto',
});
//swiper inside sections most popular etc:
function sectionSwipers(id) {
  window['swiper' + id] = new Swiper(`.swiper-${id}`, {
    watchOverflow: true,
    spaceBetween: 27,
    freeMode: false,
    centeredSlides: false,
    lazy: true,
    navigation: {
      nextEl: `.${id}-button-next`,
      prevEl: `.${id}-button-prev`,
    },
    pagination: {
      el: `.${id}-swiper-pagination`,
      clickable: true,
    },
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      988: {
        slidesPerView: 3,
        spaceBetween: 27,
      },
    },
  });
}
sectionSwipers('boosting');
sectionSwipers('drive');
sectionSwipers('customer');
sectionSwipers('most');
sectionSwipers('product');
sectionSwipers('sales');
sectionSwipers('community');
//Pop up with href logic; on load check if modal has to be open
window.addEventListener('load', () => {
  let id = window.location.hash.substring(1);
  let elementToShow = document.getElementById(id + 'modal');
  if (elementToShow) {
    modalUc.forEach((id) => {
      id.parentElement.style.display = 'none';
    });
    openModal(elementToShow);
  }
});
const modalUc = document.querySelectorAll('.id-name');
const modalLink = document.querySelectorAll('.modal-link');
const ids = [...document.querySelectorAll('.id-name-button')];
const idSwiper = [...document.querySelectorAll('.id-swiper-button')];
const exit = document.querySelectorAll('.exit-button');
const modalWrapper = document.querySelector('.modal-cms');
initializeSwiperSeeMore();

function openModal(modal) {
  document.body.style.overflow = 'hidden';
  modalWrapper.style.display = 'block';
  modal.style.display = 'block';
  videoInitSwiper(modal);
  let modalVideoSlide = modal.querySelector('.swiper-slide-active video');
  videoCall(modalVideoSlide);
  if (modal.querySelectorAll('video').length > 1) {
    modal.querySelector('.swipe-box').style.display = 'flex';
  }
  modal.querySelector('.tags-field-check input').click();
  let linkId = modal.id.replace('modal', '');
  modal.querySelector('.tag-industry-modal').scrollIntoView(true);
  setTimeout(() => {
    const seeMoreWrapper = document.querySelector('.swiper-see-more');
    const seeMoreLink = seeMoreWrapper.querySelector('#' + linkId);
    seeMoreLink.closest('.see-more-item').style.display = 'none';
    swiperSeeMore.update();
    swiperSeeMore.slideTo(0, 0, false);
  }, 1000);
}

//exit modal on x and background:
exit.forEach((i) => {
  i.addEventListener('click', () => {
    const href = window.location.href.split('#')[0];
    modalUc.forEach((id) => {
      let modalId = id.parentElement.id.replace('-', '');
      if (window['swiper' + modalId]) {
        window['swiper' + modalId].update();
        window['swiper' + modalId].slideTo(0, 0, false);
      }
      id.parentElement.style.display = 'none';
      document.querySelectorAll('.see-more-item').forEach((i) => {
        i.style.display = 'block';
      });
      document.querySelectorAll('video').forEach((video) => {
        video.setAttribute('src', '');
      });
    });
    const nextTitle = 'Use Case';
    const nextState = { additionalInformation: 'Updated the URL with JS' };
    modalWrapper.style.display = 'none';
    document.body.style.overflow = 'auto';
    window.history.pushState(nextState, nextTitle, href);
    swiperSeeMore.update();
  });
});
//set ids to proper value
modalUc.forEach((id) => {
  id.parentElement.setAttribute('id', id.innerText + 'modal');
});

ids.forEach((id) => {
  id.nextElementSibling.setAttribute('id', id.innerText);
});
idSwiper.forEach((id) => {
  id.nextElementSibling.setAttribute('id', id.innerText);
});
// open modal on see more section
function seeMore() {
  const seeItemAll = document.querySelectorAll('.see-more-item .modal-link-see');
  seeItemAll.forEach((i) => {
    i.addEventListener('click', (e) => {
      i.href = '#';
      i.href += i.id;
      const modal = document.querySelector('#' + i.id + 'modal');
      document.querySelectorAll('.see-more-item').forEach((i) => {
        i.style.display = 'block';
      });
      modalUc.forEach((id) => {
        let modalId = id.parentElement.id.replace('-', '');
        if (window['swiper' + modalId]) {
          window['swiper' + modalId].update();
          window['swiper' + modalId].slideTo(0, 0, false);
        }

        id.parentElement.style.display = 'none';
        id.parentElement.querySelectorAll('video').forEach((video) => {
          video.setAttribute('src', '');
        });
      });
      openModal(modal);
      let modalVideoSlide = modal.querySelector('.swiper-slide-active video');
      if (e.target.nodeName === 'IMG') {
        playPromiseHandler(modalVideoSlide);
      }
    });
  });
}
seeMore();
//open modal:
modalLink.forEach(function (i) {
  i.addEventListener('click', function (e) {
    i.href = '#';
    i.href += i.id;
    const modal = document.querySelector('#' + i.id + 'modal');
    modalUc.forEach((id) => {
      let modalId = id.parentElement.id.replace('-', '');
      if (window['swiper' + modalId]) {
        window['swiper' + modalId].update();
        window['swiper' + modalId].slideTo(0, 0, false);
      }
    });
    openModal(modal);
    let modalVideoSlide = modal.querySelector('.swiper-slide-active video');
    if (e.target.nodeName === 'IMG') {
      if (!modalVideoSlide.playing) {
        playPromiseHandler(modalVideoSlide);
      }
    }
  });
});
//change hash check if modal has to be open
window.addEventListener('hashchange', () => {
  let id = window.location.hash.substring(1);
  let elementToShow = document.getElementById(id + 'modal');
  if (elementToShow) {
    modalUc.forEach((id) => {
      id.parentElement.style.display = 'none';
    });
    openModal(elementToShow);
  }
});
