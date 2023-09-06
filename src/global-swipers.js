const swiperBlogPosts = new Swiper('.swiper-blog-posts', {
  spaceBetween: 27,
  freeMode: false,
  loop: true,
  centeredSlides: false,
  lazy: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
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

const swiperBrands = new Swiper('.swiper-brands', {
  loop: true,
  autoplay: {
    delay: 100,
    disableOnInteraction: false,
    waitForTransition: false,
  },
  speed: 4500,
  slidesPerView: 2,
  centeredSlides: true,
  loopedSlides: 8,
  spaceBetween: 56,
  breakpoints: {
    767: {
      slidesPerView: 4,
    },
    988: {
      slidesPerView: 6,
      noSwipingSelector: 'div',
    },
    1200: {
      slidesPerView: 'auto',
      spaceBetween: 72,
      noSwipingSelector: 'div',
    },
  },
});

const swiperTestomonials = new Swiper('.swiper-testimonial', {
  speed: 4000,
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,
  loopedSlides: 5,
  spaceBetween: 24,
  autoplay: {
    delay: 4000,
  },
  breakpoints: {
    1200: {
      spaceBetween: 32,
    },
  },
});

const swiperBigTestomonials = new Swiper('.swiper-big-testimonials', {
  freeMode: false,
  loop: true,
  loopedSlides: 9,
  centeredSlides: false,
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-big-testimonials-next',
    prevEl: '.swiper-big-testimonials-prev',
  },
});

// Nav
$(window).scroll(function () {
  if ($(window).scrollTop() > 0) {
    $('.navbar-container').addClass('navbar-bg');
  } else {
    $('.navbar-container').removeClass('navbar-bg');
  }
});

$(document).ready(function () {
  // Mobile menu
  $('.mobile-menu-toggle').click(function () {
    if (!$('.navbar-container').hasClass('navbar-bg')) {
      $('.navbar-container').addClass('navbar-bg');
    }
    if ($('body').hasClass('fixed-body')) {
      $('body').removeClass('fixed-body');
    } else {
      $('body').addClass('fixed-body');
    }
  });

  // Modal
  $('[data-modal="close"]').click(function () {
    $('.modal').fadeOut(300);
  });
  $('[data-modal="open"]').click(function () {
    $('.modal').fadeIn(300);
  });

  // Vimeo on testimonials thumbnails
  $('.video-url').each(function () {
    let url = $(this);
    if (url.text()) {
      $.ajax({
        async: true,
        crossDomain: true,
        url: 'https://vimeo.com/api/oembed.json?url=' + url.text(),
        method: 'GET',
      }).done(function (response) {
        if (response.thumbnail_url) {
          url.next('.video-testimonials-thumbnail').attr('src', response.thumbnail_url);
        }
      });
    }
  });

  // Vimeo on testimonials play behavior
  $('.video-in-testimonials').one('click', function () {
    const url = $(this).children('.video-url').text().split('/');
    $(this)
      .children('.video-url')
      .replaceWith(
        '<iframe src="https://player.vimeo.com/video/' +
          url.at(-1) +
          '?muted=1&autoplay=1&autopause=1" frameborder="0" class="vimeo-video" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
      );
    let thisframe = $(this).children('.vimeo-video');
    let player = new Vimeo.Player(thisframe);

    $(this).children('.video-testimonials-thumbnail, .video-testimonials-play-button').fadeOut(300);

    player.play();
    player.setMuted(false);

    player.on('play', function () {
      $('.vimeo-video')
        .not(thisframe)
        .each(function () {
          new Vimeo.Player($(this)).pause();
        });
      swiperTestomonials.autoplay.stop();
    });
    player.on('pause', function () {
      swiperTestomonials.autoplay.start();
    });
    player.on('ended', function () {
      swiperTestomonials.autoplay.start();
    });
  });
});

// Accordion case studies mobile:
const acc = document.querySelector('.case-study-dropdown');
if (acc) {
  acc.addEventListener('click', function () {
    this.classList.toggle('active-cs');
    const panel = this.querySelector('.case-drop-down');
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
}
