
import Swiper from 'swiper';

export default (runFun) => {
  let oldIndex = 1;
  const mySwiper = new Swiper('.swiper-container', {
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
  return mySwiper;
}
;
