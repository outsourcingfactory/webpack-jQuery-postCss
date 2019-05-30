export const BasePath = process.env.NODE_ENV === 'prod' ? './static/' : './static/';
// js 加载图片的路径
export const imgPath = process.env.NODE_ENV === 'prod' ? location.href.split('index.html')[0] + 'static/img/' : `${BasePath}img/`;

// 使用js去设置背景图时需要用到的路径
export const loadImgPath = process.env.NODE_ENV === 'prod' ? location.href.split('index.html')[0] + 'static/img/' : `../../static/img/`;

// 设置导航 图片
export const navTarget = [null, null, 1, 1, 1, 1, 1,
  2, 2, 2, 2, 2,
  3, 3, 3, 3, 3
];
