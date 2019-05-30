
/* eslint-disable */
import {isWeiXin} from '../util/index';
import $ from 'jquery';
import {loadImgPath} from './config'
var shareUrl = './getSignPackage.php';


var locationUrl = window.location.href;
// var urlDir = "http://m.yz-link.com/static/img/";
// var urlSplit = '';
// if (locationUrl.indexOf('?') != -1) {
//   urlSplit = locationUrl.substring(0, locationUrl.indexOf('?'));
// } else {
//   urlSplit = locationUrl;
// }
// if (checkEndName(urlSplit)) {
//   var indexNumber = urlSplit.lastIndexOf('/');
//   urlDir = urlSplit.substring(0, indexNumber);
// } else {
//   urlDir = urlSplit;
// }
// /**
//  * 检测url地址后缀名是否存在
//  * @param {Object} url
//  */
// function checkEndName (url) {
//   if (url.indexOf('.htm') != -1) {
//     return true;
//   }
//   if (url.indexOf('.html') != -1) {
//     return true;
//   }
//   if (url.indexOf('.php') != -1) {
//     return true;
//   }
//   return false;
// }

var jsConfig = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone',
  'showMenuItems', 'hideMenuItems', 'closeWindow'];

(function () {
  if (isWeiXin()) {
    $.ajax({
      type: 'post',
      url: shareUrl,
      data: {
        url: locationUrl
      },
      contentType:'application/json;charset=UTF-8',
      async: true,
      success: function (re) {
        var json = JSON.parse(re);
        wxConfig(json['appId'], json['nonceStr'], json['timestamp'], json['signature'],
          jsConfig);
      }
    });
  }
})();
/**
 * 注册微信
 * @param {Object} appid
 * @param {Object} nonctStr
 * @param {Object} timestamp
 * @param {Object} sign
 * @param {Object} jsApi
 */
function wxConfig (appId, nonceStr, timestamp, signature, jsApi) {
  const data = {
    appId: appId,
    nonceStr: nonceStr,
    timestamp: parseInt(timestamp),
    signature: signature,
    jsApiList: jsApi,
    debug: false
  }
  console.log(data)
  wx.config(data);
}
/**
 * 定义分享文案
 * @param {Object} title  //设置分享至朋友或群组的主标题
 * @param {Object} friend_des //设置分享至朋友或群组的副标题
 * @param {Object} group_des //设置分享至朋友圈的文案
 * @param {Object} linkUrl //设置分享后朋友打开的链接地址(默认为当前URL路径)
 * @param {Object} imgShare //设置分享小图（默认为当前url路径下的imgShare.jpg图片)
 */
export const wx_share = (title, friend_des, group_des, linkUrl, imgShare) => {
  if (!linkUrl) {
    linkUrl = locationUrl;
  }
  if (!imgShare) {
    imgShare = loadImgPath + '/imgShare.png';
  } else {
    imgShare = urlDir + '/' + imgShare;
  }
  console.log({
    title: title,
    desc: friend_des,
    link: linkUrl,
    imgUrl: imgShare,
    group_des,
  })

  wx.onMenuShareAppMessage({
    title: title,
    desc: friend_des,
    link: linkUrl,
    imgUrl: imgShare,
    success: function () {

    },
    cancel: function () {}
  });
  wx.onMenuShareTimeline({
    title: group_des,
    link: linkUrl,
    imgUrl: imgShare,
    success: function () {

    },
    cancel: function () {}
  });
};
