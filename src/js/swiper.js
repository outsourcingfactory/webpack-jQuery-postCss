
import Swiper from 'swiper';
import {setSwiperIndex} from './saveAppData';
let mySwiper = null;

export default (runFun) => {
  let oldIndex = 1;
  mySwiper = {
    Swiper: new Swiper('.swiper-container', {
      direction: 'vertical', // 垂直切换选项
      loop: false, // 循环模式选项
      height: window.innerHeight,
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next'
      },

      on: {
        slideChangeTransitionEnd () {
          const index = Number(mySwiper.Swiper.activeIndex);
          mySwiper.runDone(index);
        }
      }
    }),
    runDone (index) {
      setSwiperIndex(index);
      runFun(oldIndex, 'destroyed');
      oldIndex = index + 1;
      runFun(oldIndex, 'init');
    }

  };
};

export const swiperGo = (index) => {
  mySwiper.Swiper.slideTo(index, 0, false);
  mySwiper.runDone(index);
};
