import './css/index.scss';
import './css/bootstrap.css';
import './css/mpicker.css';
import './js/mPicker.min';
import './js/initShare';
import initSwiper from './js/swiper';
import $ from 'jquery';
import loadAllImage from './js/loadImage';
import {pageAnimate, runFun} from './js/pageAnimate';
import {audioAutoPlay} from './util/index';
import {addEvent} from './js/event';

const handerMp3 = () => {
  audioAutoPlay('audio');
  const audio = document.getElementById('audio');
  $('.music').on('click', () => {
    if ($('.music').hasClass('music-open')) {
      audio.pause();
      audio.muted = true;
      $('.music').removeClass('music-open');
    } else {
      audio.play();
      audio.muted = false;
      $('.music').addClass('music-open');
    }
  });
};

const PageInit = () => {
  pageAnimate.init();
  handerMp3();
};

$(() => {
  addEvent();
  initSwiper(runFun);
  setTimeout(() => {
    loadAllImage((val) => {
      $('.loading-page .jindu').html(`${val.toFixed(2)}%`);
    }, () => {
      setTimeout(() => {
        PageInit();
      }, 200);
    });
  }, 500);
});
