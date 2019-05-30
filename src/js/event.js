import $ from 'jquery';
import {swiperGo} from './swiper';

export const addEvent = () => {
  $('#app').on('click', '.goto', (e) => {
    const {left, width} = e.currentTarget.getBoundingClientRect();
    const {pageX} = e;
    const clickIndex = ~~(3 * (pageX - left) / width);
    const goIndex = clickIndex * 5 + 1;
    swiperGo(goIndex);
  });
}
;
