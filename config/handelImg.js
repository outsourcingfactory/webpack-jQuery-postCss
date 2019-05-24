const fs = require('fs');
const path = require('path');
const reg = /.(png|jpe?g|gif)$/;
const prentPath = process.env.DEPLOY_ENV === 'prod' ? '../dist/static' : '../static';

const readImg = (rootPath) => {
  const imgArr = [];
  const readImg = (path) => {
    var files = fs.readdirSync(path);
    files.forEach((file) => {
      if (fs.statSync(path + '/' + file).isFile() && reg.test(file)) {
        imgArr.push(file);
      } else if (fs.statSync(path + '/' + file).isDirectory()) {
        readImg(path + '/' + file);
      }
    });
  };
  readImg(rootPath);
  return imgArr;
};

const runGo = () => {
  try {
    const imgArr = readImg(path.resolve(__dirname, prentPath));

    var buf = `window._$_imgArr_ = ${JSON.stringify(imgArr)};`;

    const fd = path.resolve(__dirname, `${prentPath}/imgArr.js`);
    fs.writeFile(fd, buf, (err) => {
      if (err) {
        throw err;
      }
    });
  } catch (error) {
    setTimeout(() => {
      runGo();
    }, 1000);
  }
};

runGo();
