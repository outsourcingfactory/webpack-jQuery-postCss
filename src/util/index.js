/*eslint-disable */
import $ from 'jquery';

export function dateFormat (date, format) {
  if (!format || typeof format !== 'string') {
    console.error('format is undefiend or type is Error');
    return '';
  }

  date = date instanceof Date ? date : (typeof date === 'number' || typeof date === 'string') ? new Date(date) : new Date();

  // 解析
  var formatReg = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (var reg in formatReg) {
    if (new RegExp(reg).test(format)) {
      var match = RegExp.lastMatch;
      format = format.replace(match, formatReg[reg] < 10 ? '0' + formatReg[reg] : formatReg[reg].toString());
    }
  }
  return format;
}
// 判断是否是微信浏览器的函数
export const isWeiXin = () => {
  // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  const ua = window.navigator.userAgent.toLowerCase();
  // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
  return (/MicroMessenger/i).test(ua);
};

export const showMsg = (msg) => $('.app-msg').html(msg).show() && setTimeout(() => {
  $('.app-msg').hide();
}, 1500);

// export const audioAutoPlay = (id) => {
//   var audio = document.getElementById(id);
//   if (audio) {
//     try {
//       window.wx.ready(function () {
//         document.getElementById(id).play();
//       });
//       audio.play();
//       document.addEventListener('WeixinJSBridgeReady', function () {
//         audio.play();
//       }, false);
//     } catch (error) {

//     }
//   }
// };

// export const audioAutoPlay = (id) => {
//   const audio = document.getElementById(id);
//   const play = function () {
//     audio.play();
//     document.removeEventListener('touchstart', play, false);
//   };
//   audio.play();
//   document.addEventListener('WeixinJSBridgeReady', function () { // 微信
//     play();
//   }, false);
//   document.addEventListener('YixinJSBridgeReady', function () { // 易信
//     play();
//   }, false);
//   document.addEventListener('touchstart', play, false);
//   $(document).trigger('touchstart');
// };

export const audioAutoPlay = (id) => {
  // 自动播放音乐效果，解决浏览器或者APP自动播放问题
  function musicInBrowserHandler () {
    musicPlay(true, id);
    document.body.removeEventListener('touchstart', musicInBrowserHandler);
  }
  document.body.addEventListener('touchstart', musicInBrowserHandler);

  // 自动播放音乐效果，解决微信自动播放问题
  function musicInWeixinHandler () {
    musicPlay(true, id);
    document.addEventListener('WeixinJSBridgeReady', function () {
      musicPlay(true, id);
    }, false);
    document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
  }
  document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
  if(isWeiXin()){
    wx.ready(function () {
      musicPlay(true, id);
      wx.getNetworkType({
        complete: function (res) {
          document.getElementById(id).load();
          document.getElementById(id).play();
        }
      });
    });
  }
};
function musicPlay (isPlay, id) {
  var audio = document.getElementById(id);
  if (isPlay && audio.paused) {
    audio.play();
  }
  if (!isPlay && !audio.paused) {
    audio.pause();
  }
};
