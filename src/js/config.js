console.log(process.env.NODE_ENV);
export const BasePath = process.env.NODE_ENV === 'prod' ? './static/' : './static/';
export const imgPath = process.env.NODE_ENV === 'prod' ? location.href.split('index.html')[0] + 'static/img/' : `${BasePath}img/`;
