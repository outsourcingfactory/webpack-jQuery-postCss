import './css/index.scss';
import Swiper from 'swiper';
import $ from 'jquery';
const BasePath = './';
let mySwiper;
const initSwiper = () => {
  mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical', // 垂直切换选项
    loop: false, // 循环模式选项
    height: window.innerHeight,
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next'
    },

    on: {
      slideChangeTransitionEnd (index) {
        console.log(mySwiper && mySwiper.activeIndex);
        pageAnimate[`page${index}`] && pageAnimate[`page${index}`]();
      }
    }
  });
};

const loadAllImage = (onProgress, onCallBack) => {
  const createScript = (url, cb) => {
    var head = document.getElementsByTagName('head').item(0);
    var el = document.createElement('script');
    el.src = url;
    el.type = 'text/javascript';
    el.onload = cb;
    head.appendChild(el);
  };
  const loadImage = (url, callback) => {
    const Img = new Image();
    Img.src = url;
    if (Img.complete) {
      callback();
      return;
    }
    Img.onload = () => callback();
  };
  createScript(`${BasePath}imgArr.js`, () => {
    window._$_imgArr_.forEach(element => {
      loadImage(`${BasePath}${element}`, onProgress);
    });
  });
};

const pageAnimate = {
  init () {
    $('.loading-page').hide();
    this.page0();
  },
  page0 () {

  }
};

$(() => {
  initSwiper();
  loadAllImage((val) => {
    $('.loading-page .jindu').html(`${val}%`);
  }, pageAnimate.init);
});
