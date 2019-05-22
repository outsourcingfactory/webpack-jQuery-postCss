const fs = require('fs');
const path = require('path');
const reg = /.(png|jpe?g|gif)$/;
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

const imgArr = readImg(path.resolve(__dirname, '../src'));
var buf = `const _$_imgArr_ = ${JSON.stringify(imgArr)};`;
const fd = path.resolve(__dirname, '../dist/imgArr.js');
fs.writeFile(fd, buf, (err) => {
  if (err) {
    throw err;
  }
});

// fs.open('./env.js', 'w', (err, fd) => {
//   if (!err) {
//     var buf = `export default ${JSON.stringify(imgArr)};`;
//     fs.writeFile(fd, buf, () => {
//       fs.fsync(fd);
//       fs.close(fd);
//     });
//   } else {
//     console.log(err, 123);
//   }
// });
