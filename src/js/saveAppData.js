
import $ from 'jquery';

export const setSwiperIndex = (index) => $('#app').data('swiper-active-index', index)
;
export const getSwiperIndex = () => $('#app').data('swiper-active-index');
