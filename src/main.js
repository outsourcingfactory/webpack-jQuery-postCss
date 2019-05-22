import './css/index.scss';
import Swiper from 'swiper';
import $ from 'jquery'
  ;

const pageAnimate = {
  page0 () {

  }
};

$(() => {
  const mySwiper = new Swiper('.swiper-container', {
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
});
