import {BasePath, imgPath} from './config';
export default (onProgress, onCallBack) => {
  const createScript = (url, cb) => {
    var head = document.getElementsByTagName('head').item(0);
    var el = document.createElement('script');
    el.src = url;
    el.type = 'text/javascript';
    el.onload = cb;
    head.appendChild(el);
  };
  const loadImage = (url, callback) => {
    const Img = new Image();
    Img.src = url;
    if (Img.complete) {
      callback();
      return;
    }
    Img.onload = () => callback();
  };
  createScript(`${BasePath}imgArr.js`, () => {
    const imgArr = window._$_imgArr_;
    let load = 0;
    imgArr.forEach(element => {
      loadImage(`${imgPath}${element}`, () => {
        load++;
        onProgress((load / imgArr.length) * 100);
        load === imgArr.length && onCallBack();
      });
    });
  });
}
;
