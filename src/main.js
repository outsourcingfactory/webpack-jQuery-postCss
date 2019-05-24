import './css/index.scss';
import Swiper from 'swiper';
import $ from 'jquery';
const BasePath = process.env.DEPLOY_ENV === 'prod' ? './static/' : './static/';
const imgPath = `${BasePath}img/`;
let mySwiper;

const initSwiper = () => {
  const runFun = (index, funName) => pageAnimate[`page${index}`] && pageAnimate[`page${index}`][funName] && pageAnimate[`page${index}`][funName]();
  let oldIndex = 1;
  mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical', // 垂直切换选项
    loop: false, // 循环模式选项
    height: window.innerHeight,
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next'
    },

    on: {
      slideChangeTransitionEnd () {
        const index = Number(mySwiper.activeIndex);
        console.log(index, oldIndex);

        runFun(oldIndex, 'destroyed');
        oldIndex = index + 1;
        runFun(oldIndex, 'init');
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
    const imgArr = window._$_imgArr_;
    let load = 0;
    imgArr.forEach(element => {
      loadImage(`${imgPath}${element}`, () => {
        load++;
        onProgress((load / imgArr.length) * 100);
        load === imgArr.length && onCallBack();
      });
    });
  });
};

const pageAnimate = {
  init () {
    $('.loading-page').animate({
      opacity: 0
    }, 100, 'swing', () => {
      $('.loading-page').hide();
      pageAnimate.page1.init();
    });
  },
  pageInit () {
    $('.swiper-button-next').show();
  },
  pageDestroyed () {
    $('.swiper-button-next').hide();
  },
  page1: {
    init () {
      pageAnimate.pageInit();
      $('.swiper-button-next').addClass('center');
      $('.p1-text').animate({
        opacity: 1
      }, 800);
    },
    destroyed () {
      pageAnimate.pageDestroyed();
      $('.swiper-button-next').removeClass('center');
      $('.p1-text').css({
        opacity: 0
      });
    }
  },
  page2: {
    init () {
      pageAnimate.pageInit();
      $('.page2-show').delay(1000).animate({
        opacity: 1
      }, 800);
    },
    destroyed () {
      pageAnimate.pageDestroyed();
      $('.page2-show').css({
        opacity: 0
      });
    }
  },
  page4: {
    init () {
      pageAnimate.pageInit();
      $('.page4 .btn').on('click', () => {
        $('.page4 .btn').removeClass('dot');
        $('.page4-bg2').animate({
          opacity: 1
        }, 800, () => {
          $('.page4 .show').animate({
            opacity: 1
          }, 800);
        });
      });
    },
    destroyed () {
      pageAnimate.pageDestroyed();
      $('.page4 .btn').off('click');
      $('.page4 .btn').addClass('dot');
      $('.page4-bg2').css({
        opacity: 0
      });
      $('.page4 .show').css({
        opacity: 0
      });
    }
  }
};

$(() => {
  initSwiper();
  loadAllImage((val) => {
    $('.loading-page .jindu').html(`${val}%`);
  }, pageAnimate.init);
});
