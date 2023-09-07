/**
 * Functions
 */
const buttonUpdate = () => {
  const btn = $('[data-pricing="button"]');
  const slider = parseInt($('[data-pricing="slider-value"]').val()) || 0;
  const cavatar = parseInt($('[data-pricing="custom-avatar"]').val()) || 0;
  const cscript = parseInt($('[data-pricing="custom-script"]').val()) || 0;

  btn.text('Get Started');
  btn.attr('href', 'https://app.windsor.io/sign-up');

  cavatar === 0 &&
    cscript === 0 &&
    slider === 0 &&
    btn.text('Get Started for Free') &&
    btn.attr('href', 'https://app.windsor.io/sign-up');
  (slider === 110 || cavatar >= 5) &&
    btn.text('Talk to Sales') &&
    btn.attr(
      'href',
      'https://calendly.com/windsor_sales/windsor-demo?utm_source=windsor&utm_medium=landing-page&utm_campaign=contact-us'
    );
};

const priceUpdate = () => {
  const priceonetime = $('[data-pricing="one-time"]');
  const pricepermonth = $('[data-pricing="per-month"]');
  const pricestroke = $('[data-pricing="one-time-stroke"]');
  const discountinfo = $('[data-pricing="one-time-discount"]');
  const avatarval = parseInt($('[data-pricing="custom-avatar"]').val()) || 0;
  const scriptval = parseInt($('[data-pricing="custom-script"]').val()) || 0;
  const slidervalue = parseInt($('[data-pricing="slider-value"]').val()) || 0;
  let slidervaluetext = '';

  if (slidervalue === 0) slidervaluetext = '$0';
  if (slidervalue === 10) slidervaluetext = '$49';
  if (slidervalue === 20) slidervaluetext = '$89';
  if (slidervalue === 30) slidervaluetext = '$119';
  if (slidervalue === 40) slidervaluetext = '$169';
  if (slidervalue === 50) slidervaluetext = '$229';
  if (slidervalue === 60) slidervaluetext = '$279';
  if (slidervalue === 70) slidervaluetext = '$469';
  if (slidervalue === 80) slidervaluetext = '$599';
  if (slidervalue === 90) slidervaluetext = '$699';
  if (slidervalue === 100) slidervaluetext = '$799';

  avatarval >= 5 || slidervalue === 110
    ? priceonetime.text('Custom Pricing') &&
      pricestroke.text('') &&
      discountinfo.hide() &&
      pricepermonth.parent().hide() &&
      $('.pricing-label').hide()
    : discountinfo.show() &&
      pricepermonth.parent().show() &&
      $('.pricing-label').show() &&
      pricepermonth.text(slidervaluetext) &&
      avatarval === 0 &&
      scriptval === 0
    ? priceonetime.text('$0') && pricestroke.text('') && discountinfo.hide()
    : priceonetime.text(
        '$' +
          ($('[data-pricing="custom-avatar"]').val() * 149 +
            $('[data-pricing="custom-script"]').val() * 29)
      ) &&
      pricestroke.text(
        '$' +
          ($('[data-pricing="custom-avatar"]').val() * 419 +
            $('[data-pricing="custom-script"]').val() * 39)
      ) &&
      discountinfo.show();
};

const valueChange = (data) => {
  const inputType = data.slice(0, 2); // 'ca' or 'cs'
  const change = data.slice(3); // 'minus' or 'plus'

  const currentInput =
    inputType === 'ca' ? $('[data-pricing="custom-avatar"]') : $('[data-pricing="custom-script"]');
  const val = parseInt(currentInput.val()) || 0;

  change === 'minus' &&
    (val > 0
      ? val <= 10
        ? currentInput.val(val - 1)
        : currentInput.val(10)
      : currentInput.val(0));

  change === 'plus' &&
    (val >= 0
      ? val < 10
        ? currentInput.val(val + 1)
        : currentInput.val(10)
      : currentInput.val(0));

  priceUpdate();
  buttonUpdate();
};

const valueChangeManual = (data) => {
  const currentInput =
    data === 'custom-avatar'
      ? $('[data-pricing="custom-avatar"]')
      : $('[data-pricing="custom-script"]');
  const val = parseInt(currentInput.val()) || 0;

  val <= 0 && currentInput.val(0);
  val > 10 && currentInput.val(10);

  priceUpdate();
  buttonUpdate();
};

const benefits = () => {
  const slider = parseInt($('.np-slider-input').val()) || 0;
  const benefits = $('.pricing-benefits-list-item');

  slider === 0 &&
    benefits.each(function (i) {
      i > 2 &&
        $(this).children('.pricing-benefits-tick').hide() &&
        $(this).children('.pricing-benefits-x').show();
    });
  slider > 0 &&
    slider < 80 &&
    benefits.each(function (i) {
      i > 2 &&
        i < 8 &&
        $(this).children('.pricing-benefits-tick').show() &&
        $(this).children('.pricing-benefits-x').hide();
      i >= 8 &&
        $(this).children('.pricing-benefits-tick').hide() &&
        $(this).children('.pricing-benefits-x').show();
    });
  slider >= 80 &&
    benefits.each(function (i) {
      i > 2 &&
        i < 10 &&
        $(this).children('.pricing-benefits-tick').show() &&
        $(this).children('.pricing-benefits-x').hide();
      i === 10 &&
        $(this).children('.pricing-benefits-tick').hide() &&
        $(this).children('.pricing-benefits-x').show();
    });
  slider === 110 &&
    benefits.each(function (i) {
      i > 2 &&
        $(this).children('.pricing-benefits-tick').show() &&
        $(this).children('.pricing-benefits-x').hide();
    });

  benefits.each(function () {
    $(this).children('.pricing-benefits-tick').is(':visible')
      ? $(this).children('div:not(.pricing-benefits-x)').removeClass('grayed-out')
      : $(this).children('div:not(.pricing-benefits-x)').addClass('grayed-out');
  });
};

function Slider(slider) {
  this.slider = slider;

  slider.addEventListener(
    'input',
    function () {
      this.updateSliderOutput();
      this.updateSliderLevel();
      buttonUpdate();
      benefits();
      priceUpdate();
    }.bind(this),
    false
  );

  this.convertedValue = function () {
    let level = this.slider.querySelector('.np-slider-input');
    if (level.value === '0') return '50';
    if (level.value === '10') return '100';
    if (level.value === '20') return '200';
    if (level.value === '30') return '300';
    if (level.value === '40') return '500';
    if (level.value === '50') return '750';
    if (level.value === '60') return '1,000';
    if (level.value === '70') return '2,500';
    if (level.value === '80') return '5,000';
    if (level.value === '90') return '7,500';
    if (level.value === '100') return '10,000';
    if (level.value === '110') return '10,000+';
  };

  this.CSSLevel = function () {
    let level = this.slider.querySelector('.np-slider-input');
    return (10 / 11) * (parseInt(level.value) || 0);
  };

  this.updateSliderOutput = function () {
    this.slider.querySelector('.np-slider-output').textContent = this.convertedValue();
    this.slider.querySelector('.np-slider-output').style.left = this.CSSLevel() + '%';
    this.slider.querySelector('.np-slider-thumb').style.left = this.CSSLevel() + '%';
  };

  this.updateSliderLevel = function () {
    let level = this.slider.querySelector('.np-slider-level');
    level.style.width = this.CSSLevel() + '%';
  };
}

/**
 * Events
 */
$(document).ready(function () {
  const today = new Date();
  const lastDayInMonth = new Date(
    today.toLocaleString('default', { year: 'numeric' }),
    today.toLocaleString('default', { month: 'numeric' }),
    0
  ).toLocaleString('default', { day: 'numeric' });
  const currentMonth = today.toLocaleString('en-US', { month: 'long' });
  $('[data-pricing="one-time-discount"]').text(
    '* exclusive deal till ' + currentMonth + ' ' + lastDayInMonth
  );

  benefits();
  priceUpdate();
  buttonUpdate();

  $('.pricing-custom-button').on('click', function () {
    valueChange($(this).data('pricing'));
  });
  $('.np-custom-input').on('keyup', function () {
    valueChangeManual($(this).data('pricing'));
  });
  new Slider(document.getElementById('range-slider'));
});
