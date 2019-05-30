import $ from 'jquery';

const touchEvent = (query, direction) => {
  let startX, startY;

  return () => {
    $(query).on('touchstart', function (e) {
      // 判断默认行为是否可以被禁用
      if (e.cancelable) {
        // 判断默认行为是否已经被禁用
        if (!e.defaultPrevented) {
          e.preventDefault();
        }
      }
      startX = e.originalEvent.changedTouches[0].pageX;
      startY = e.originalEvent.changedTouches[0].pageY;
    });
    return new Promise((resolve, reject) => {
      $(query).on('touchend', function (e) {
        // 判断默认行为是否可以被禁用
        if (e.cancelable) {
        // 判断默认行为是否已经被禁用
          if (!e.defaultPrevented) {
            e.preventDefault();
          }
        }
        let dire;
        let moveEndX = e.originalEvent.changedTouches[0].pageX;
        let moveEndY = e.originalEvent.changedTouches[0].pageY;
        let X = moveEndX - startX;
        let Y = moveEndY - startY;

        if (X < 0) { // 左滑
          dire = 'left';
        } else if (X > 0) { // 右滑
          dire = 'right';
        } else if (Y > 0) { // 下滑
          dire = 'down';
        } else if (Y < 0) { // 上滑
          dire = 'up';
        } else { // 单击
          dire = 'click';
        }

        if (dire === direction) {
          resolve();
        }
      });
    });
  };
};

export default touchEvent
;
