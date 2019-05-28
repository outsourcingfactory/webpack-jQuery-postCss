/* eslint-disable */
import {isWeiXin} from '../util/index';
import {wx_share} from './wxShare';
/**
* 定义分享文案
 * @param {Object} title  //设置分享至朋友或群组的主标题
 * @param {Object} friend_des //设置分享至朋友或群组的副标题
* @param {Object} group_des //设置分享至朋友圈的文案
 * @param {Object} linkUrl //设置分享后朋友打开的链接地址(默认为当前URL路径)
 * @param {Object} imgShare //设置分享小图（默认为当前url路径下的imgShare.jpg图片)
*/
wx.ready(function () {
  wx.showMenuItems({
    menuList: ['menuItem:share:timeline', 'menuItem:share:appMessage', 'menuItem:favorite', 'menuItem:share:qq',
      'menuItem:share:weiboApp', 'menuItem:share:QZone']
  });
  if (isWeiXin()) {
    // 此处来修改分享文案、分享链接和分享图标（链接默认取本文件，图标默认取同级目录下的imgShare.jpg）
    wx_share('五智赋能  智领非凡', '北汽新能源EU5-人工智能轿车新典范，补贴后12.99万起', '五智赋能  智领非凡', '', '');
  }
});
