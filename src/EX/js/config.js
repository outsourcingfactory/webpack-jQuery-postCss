export const BasePath = process.env.DEPLOY_ENV === 'prod' ? './static/' : './static/';
export const imgPath = `${BasePath}img/`;
