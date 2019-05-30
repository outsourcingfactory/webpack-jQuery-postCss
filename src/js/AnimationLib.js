import $ from 'jquery';
import {pageAnimate} from './pageAnimate';
import {loadImgPath} from './config';
import { getSwiperIndex } from './saveAppData';

const AnimationLib = {
  textFei () {
    const index = Number(getSwiperIndex()) + 1;
    let $text = $(`.page${index} .pa-text`);
    if (!$text.length) {
      $text = $('<div class = "pa-text"></div>');
      $text.css({
        'background-image': `url("${loadImgPath}/pg${index}-text.png")`
      });
      // const prent = $('<div class = "text-prent"></div>');
      // prent.append($text);
      $(`.page${index}`).append($text);
    }
    setImmediate(() => {
      $text.addClass('fei');
    });
  },
  // 用p{index}-cover 图片去覆盖原有的背景
  PageCover: (() => {
    class PageCover {
      constructor (key, triggerPromise, imgName) {
        this.key = key;
        this.triggerPromise = triggerPromise;
        this.imgName = imgName;
      }

      init () {
        pageAnimate.pageInit(this.triggerPromise && this.triggerPromise()).then(() => {
          const index = this.key;
          let $cover = $(`.page${index} .page-cover`);
          if (!$cover.length) {
            $cover = $('<div class = "page-cover"></div>');
            $(`.page${index}`).append($cover);
          }
          const name = this.imgName || `p${index}-cover.png`;
          $cover.css({
            'background-image': `url("${loadImgPath}/${name}")`,
            opacity: 0
          }).delay(1000).animate({
            opacity: 1
          }, 800, AnimationLib.textFei);
        });
      }

      destroyed () {
        pageAnimate.pageDestroyed();
        $(`.page${this.key} .page-cover`).css({
          opacity: 0
        });
      }
    }

    return PageCover;
  })()
};

export default AnimationLib
;
