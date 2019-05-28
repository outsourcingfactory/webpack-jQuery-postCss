import './css/index.scss';
import './css/bootstrap.css';
import './css/mpicker.css';
import {dateFormat} from './util/index.js';
import initSwiper from './js/swiper';
import $ from 'jquery';
import loadAllImage from './js/loadImage';
import './js/mPicker.min';
import {cityData} from './js/cityData';
import shopData from './js/shopData';
import './js/initShare';
const imgPath = process.env.NODE_ENV === 'prod' ? location.href.split('index.html')[0] + 'static/img/' : `../../static/img/`;

let mySwiper = null;
const runFun = (index, funName) => pageAnimate[`page${index}`] && pageAnimate[`page${index}`][funName]
  ? pageAnimate[`page${index}`][funName]()
  : pageAnimate[funName === 'init' ? 'pageInit' : 'pageDestroyed']();

const showMsg = (msg) => $('.app-msg').html(msg).show() && setTimeout(() => {
  $('.app-msg').hide();
}, 1500);

const audioAutoPlay = (id) => {
  var audio = document.getElementById(id);
  audio.play();
  document.addEventListener('WeixinJSBridgeReady', function () {
    audio.play();
  }, false);
  document.addEventListener('YixinJSBridgeReady', function () {
    audio.play();
  }, false);
};

const PageInit = () => {
  pageAnimate.init();
  audioAutoPlay('audio');
};

$(() => {
  mySwiper = initSwiper(runFun);
  loadAllImage((val) => {
    $('.loading-page .jindu').html(`${val.toFixed(2)}%`);
  }, PageInit);
});

const navTarget = [null, null, 1, 1, 1, 1, 1,
  2, 2, 2, 2, 2,
  3, 3, 3, 3, 3
];

const AnimationLib = {
  // 用p{index}-cover 图片去覆盖原有的背景
  PageCover: (() => {
    class PageCover {
      constructor (key) {
        this.key = key;
      }

      init () {
        pageAnimate.pageInit();
        const index = this.key;
        let $cover = $(`.page${index} .page-cover`);
        if (!$cover.length) {
          $cover = $('<div class = "page-cover"></div>');
          $(`.page${index}`).append($cover);
        }
        $cover.css({
          'background-image': `url("${imgPath}/p${index}-cover.png")`,
          opacity: 0
        }).delay(1000).animate({
          opacity: 1
        }, 800);
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

const pageAnimate = {
  init () {
    for (let a = 1, len = $('.swiper-slide').length; a <= len; a++) {
      $(`.page${a}`).css({
        'background-image': `url("${imgPath}/p${a}-bg.png")`
      });
    }
    $('.loading-page').animate({
      opacity: 0
    }, 100, 'swing', () => {
      $('.loading-page').hide();
      pageAnimate.page1.init();
    });
  },
  pageInit () {
    const index = Number(mySwiper.activeIndex) + 1;
    $('.swiper-button-next').show();
    let $text = $(`.page${index} .pa-text`);
    if (!$text.length) {
      $text = $('<div class = "pa-text"></div>');
      $(`.page${index}`).append($text);
      $text.css({
        'background-image': `url("${imgPath}/pg${index}-text.png")`,
        opacity: 0
      }).animate({opacity: 1}, 500);
    }

    let $nav = $(`.page${index} .nav`);
    if (!$nav.length) {
      const navIndex = navTarget[index];
      if (navIndex) {
        $nav = $('<div class = "nav"></div>');
        $(`.page${index}`).append($nav);
        $nav.css({
          'background-image': `url("${imgPath}/nav${navIndex}.png")`,
          opacity: 0
        }).animate({opacity: 1}, 500);
      }
    }
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
  page2: new AnimationLib.PageCover(2),
  page3: new AnimationLib.PageCover(3),
  page4: {
    init () {
      pageAnimate.pageInit();
      $('.page4 .btn').on('click', () => {
        $('.page4 .btn').removeClass('dot');
        $('.page4 .btn .sub-btn').addClass('gif');
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
  page7: new AnimationLib.PageCover(7),
  page11: new AnimationLib.PageCover(11),
  page16: new AnimationLib.PageCover(16),
  page15: new AnimationLib.PageCover(15),

  page8: {
    init () {
      pageAnimate.pageInit();
      const speedEnd = 630;
      let i = 0;
      const timer = setInterval(() => {
        $('.page8 .number').html(`${(i * speedEnd / 20).toFixed(2) * 100 / 100}km`);
        if (i === 20) {
          clearInterval(timer);
        } else {
          i++;
        }
      }, 100);
    }
  },
  page9: {
    init () {
      pageAnimate.pageInit();
      const timeEnd = 7.9;
      const speedEnd = 100;
      let i = 0;
      const timer = setInterval(() => {
        $('.page9 .box').html(`${(i * timeEnd / 20).toFixed(2) * 100 / 100}s    ${(i * speedEnd / 20).toFixed(2) * 100 / 100}km/h`);
        if (i === 20) {
          clearInterval(timer);
        } else {
          i++;
        }
      }, 100);
    }
  },
  page10: {
    init () {
      pageAnimate.pageInit();
      $('.page10 .line').delay(300).animate({
        width: '100%'
      }, 500);
    },
    destroyed () {
      pageAnimate.pageDestroyed();
      $('.page10 .line').css({
        width: 0
      });
    }
  },
  page12: {
    init () {
      pageAnimate.pageInit();
      $('.page12 .phone').delay(300).animate({
        left: 0
      }, 500);
      $('.page12 .page-car').delay(1000).animate({
        right: 0
      }, 600);
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
  page14: {
    timer: undefined,
    init () {
      pageAnimate.pageInit();
      let i = 0;
      pageAnimate.page14.timer = setInterval(() => {
        $('.page14 .dot').removeClass('dot');
        $('.page14 .li').eq(i++ % 7).addClass('dot');
      }, 1000);
    }
  },
  page17: {
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
        mySwiper.slideTo(0, 1000, false);
      });
      $('.page17 .submit').on('click', () => {
        const name = $('#name').val();
        const phone = $('#phone').val();
        const car = $('.car').val() || '路虎';
        const city = $('#city').val() || document.getElementById('city').value;
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
            data: {
              name, phone, car, city, date, shop
            },
            error (xhr, status, error) {
              showMsg('提交错误');
            },
            success (reg) {
              if (reg.errorcode.toString() === '0') {
                showMsg('提交成功');
                setTimeout(() => {
                  mySwiper.slideTo(0, 1000, false);
                }, 2000);
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
          const shopArr = shopData.filter(ele => ele.province.includes(p) && (c.includes(ele.city) || ele.city.includes(c))).map(ele => ({name: ele.shop, value: ele.shop}));
          document.getElementById('shop').value = '';
          initShop(shopArr);
        },
        cancel: function (json) {
        }
      });
    }
  }
};
