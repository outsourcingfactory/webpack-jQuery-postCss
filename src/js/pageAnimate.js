import $ from 'jquery';
import { loadImgPath, navTarget } from './config';
import { getSwiperIndex } from './saveAppData';
import { dateFormat, showMsg } from '../util/index.js';
import { swiperGo } from './swiper';
import { cityData } from './cityData';
import shopData from './shopData';
import AnimationLib from './AnimationLib';
import touchEvent from './touchEvent';
export const pageAnimate = {
  init () {
    for (let a = 1, len = $('.swiper-slide').length; a <= len; a++) {
      $(`.page${a}`).css({
        'background-image': `url("${loadImgPath}/p${a}-bg.png")`
      });
    }
    $('.loading-page').animate({
      opacity: 0
    }, 100, 'swing', () => {
      $('.loading-page').hide();
      pageAnimate.page1.init();
    });
  },
  pageInit (promise) {
    const index = Number(getSwiperIndex()) + 1;
    $('.swiper-button-next').show();

    let $nav = $(`.page${index} .nav`);
    if (!$nav.length) {
      const navIndex = navTarget[index];
      if (navIndex) {
        $nav = $('<div class = "nav goto"></div>');
        $(`.page${index}`).append($nav);
      }

      $nav.css({
        'background-image': `url("${loadImgPath}/nav${navIndex}.png")`,
        opacity: 0
      }).animate({ opacity: 1 }, 500);
    }

    const clickBtn = $(`.page${index} .click-btn`);
    if (promise) {
      return promise;
    } else if (clickBtn.length) {
      return new Promise((resolve, reject) => {
        $(`.page${index} .run-anima`).show();
        clickBtn.show().on('click', (e) => {
          $(`.page${index} .run-anima`).hide();
          resolve();
        });
      });
    } else {
      return Promise.resolve();
    }
  },
  pageDestroyed () {
    $('.pa-text').removeClass('fei');
    $('.swiper-button-next').hide();
    $(`.run-anima`).off('click').hide();
  },
  page1: {
    init () {
      pageAnimate.pageInit().then(() => {
        $('.swiper-button-next').addClass('center');
        $('.p1-text').animate({
          opacity: 1
        }, 800, AnimationLib.textFei);
      });
    },
    destroyed () {
      pageAnimate.pageDestroyed();
      $('.swiper-button-next').removeClass('center');
      $('.p1-text').css({
        opacity: 0
      });
    }
  },
  page2: new AnimationLib.PageCover(2),
  page3: new AnimationLib.PageCover(3, touchEvent('.page3', 'left')),
  page4: {
    init () {
      pageAnimate.pageInit().then(() => {
        $('.page4 .btn').removeClass('dot');
        $('.page4 .btn .sub-btn').addClass('gif');
        $('.page4-bg2').animate({
          opacity: 1
        }, 800, () => {
          $('.page4 .show').animate({
            opacity: 1
          }, 800, AnimationLib.textFei);
        });
      });
    },
    destroyed () {
      pageAnimate.pageDestroyed();
      $('.page4 .btn').off('click');
      $('.page4 .btn').addClass('dot');
      $('.page4 .btn .sub-btn').removeClass('gif');
      $('.page4-bg2').css({
        opacity: 0
      });
      $('.page4 .show').css({
        opacity: 0
      });
    }
  },
  page5: new AnimationLib.PageCover(5),
  page6: {
    init () {
      pageAnimate.pageInit().then(() => {
        $('.page6 .gif').delay(100).animate({
          opacity: 1
        }, 800, AnimationLib.textFei);
      });
    },
    destroyed () {
      pageAnimate.pageDestroyed();
      $('.page6 .gif').css({
        opacity: 0
      });
    }
  },
  page7: new AnimationLib.PageCover(7),
  page8: {
    init () {
      pageAnimate.pageInit().then(() => {
        const speedEnd = 630;
        let i = 0;
        const timer = setInterval(() => {
          $('.page8 .number').html(`${parseInt(i * speedEnd / 40) * 100 / 100}km`);
          if (i === 40) {
            clearInterval(timer);
            AnimationLib.textFei();
          } else {
            i++;
          }
        }, 80);
      });
    }
  },
  page9: {
    init () {
      pageAnimate.pageInit().then(() => {
        const timeEnd = 7.9;
        const speedEnd = 100;
        let i = 0;
        const timer = setInterval(() => {
          $('.page9 .box').html(`${(i * timeEnd / 40).toFixed(2) * 100 / 100}s    ${parseInt(i * speedEnd / 40) * 100 / 100}km/h`);
          if (i === 40) {
            clearInterval(timer);
            AnimationLib.textFei();
          } else {
            i++;
          }
        }, 80);
      });
    }
  },
  page10: {
    init () {
      pageAnimate.pageInit().then(() => {
        ;
        $('.page10 .line').delay(100).animate({
          width: '100%'
        }, 500, () => {
          $('.page10 .number').css({
            opacity: 1
          });
          AnimationLib.textFei();
        });
      });
    },
    destroyed () {
      pageAnimate.pageDestroyed();
      $('.page10 .line').css({
        width: 0
      });
      $('.page10 .number').css({
        opacity: 0
      });
    }
  },
  page11: new AnimationLib.PageCover(11),
  page12: {
    init () {
      $('.page12 .phone').delay(100).animate({
        left: 0
      }, 500);
      pageAnimate.pageInit().then(() => {
        $('.page12 .page-car').delay(100).animate({
          right: 0
        }, 1000, AnimationLib.textFei);
      });
    },
    destroyed () {
      pageAnimate.pageDestroyed();
      $('.page12 .phone').css({
        left: '-100%'
      });

      $('.page12 .page-car').css({
        right: '-100%'
      });
    }
  },
  page13: new AnimationLib.PageCover(13, undefined, 'p13-cover.gif'),
  page14: {
    timer: undefined,
    init () {
      pageAnimate.pageInit().then(() => {
        let i = 0;
        AnimationLib.textFei();
        pageAnimate.page14.timer = setInterval(() => {
          $('.page14 .dot').removeClass('dot');
          $('.page14 .li').eq(i++ % 7).addClass('dot');
        }, 1000);
      });
    }
  },
  page15: new AnimationLib.PageCover(15),
  page16: new AnimationLib.PageCover(16),
  page17: {
    destroyed () {
      pageAnimate.pageDestroyed();
      $('.page17 .form').css({
        opacity: 1
      });
      $('.page17 .ok').css({
        opacity: 0
      }).hide();
    },
    init () {
      // const json = {
      //   name: '张三', // 姓名
      //   phone: '13688886666', // 手机
      //   car: '路虎', // 车型
      //   city: '西安', // 城市
      //   shop: '西安利之星', // 经销商
      //   date: '2019-06-02'
      // };
      $('.goback').on('click', () => {
        swiperGo(0);
      });
      $('.page17 .submit').on('click', () => {
        const name = $('#name').val();
        const phone = $('#phone').val();
        const car = $('#car').val() || '路虎';
        const city = document.getElementById('city').value.split('-')[1];
        const date = dateFormat(new Date(), 'yyyy-MM-dd');
        const shop = $('#shop').val() || document.getElementById('shop').value;
        if (!name) {
          showMsg('请输入姓名');
        } else if (!phone) {
          showMsg('请输入手机');
        } else if (!car) {
          showMsg('请选择车型');
        } else if (!city) {
          showMsg('请选择所在城市');
        } else if (!shop) {
          showMsg('请选择所预约经销商');
        } else {
          $.ajax({
            url: './saveInfo.php',
            type: 'POST',
            // contentType: 'application/json;charset=UTF-8',
            data: {
              name, phone, car, city, date, shop
            },
            error (xhr, status, error) {
              showMsg('提交错误');
            },
            success (reg) {
              if (reg.errorcode.toString() === '0') {
                showMsg('提交成功');
                // swiperGo(0);
                $('.page17 .form').delay(100).animate({
                  opacity: 0
                }, 500, () => {
                  $('.page17 .ok').show().animate(
                    {
                      opacity: 1
                    }, 500
                  );
                });
              } else {
                showMsg(reg.msg);
              }
            }
          });
        }
      });
      const initShop = (data) => {
        $('.page17 .select-shop').mPicker({
          level: 1,
          dataJson: data,
          Linkage: false,
          rows: 6,
          idDefault: false,
          header: '<div class="mPicker-header">选择经销商</div>',
          confirm: function (json) {
          },
          cancel: function (json) {
          }
        });
      };

      $('.page17 .select-city').mPicker({
        level: 2,
        dataJson: cityData,
        Linkage: true,
        rows: 6,
        idDefault: true,
        splitStr: '-',
        header: '<div class="mPicker-header">选择城市</div>',
        confirm: function (json) {
          const adds = [...json.name.split('-')];
          const p = adds[0].replace(/自治区|省|市|壮族自治区|回族自治区|/g, '');
          const c = adds[1];
          const shopArr = shopData.filter(ele => ele.province.includes(p) && (c.includes(ele.city) || ele.city.includes(c))).map(ele => ({ name: ele.shop, value: ele.shop }));
          document.getElementById('shop').value = '';
          initShop(shopArr);
        },
        cancel: function (json) {
        }
      });
    }
  }
};

export const runFun = (index, funName) => pageAnimate[`page${index}`] && pageAnimate[`page${index}`][funName]
  ? pageAnimate[`page${index}`][funName]()
  : pageAnimate[funName === 'init' ? 'pageInit' : 'pageDestroyed']();
