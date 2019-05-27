const inquirer = require('inquirer');
const fs = require('fs');
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
const prompt = inquirer.createPromptModule();

const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
// const config = require('./config');
const getConfig = require('./webpack.config.js');

const getDir = (path) => {
  return fs.readdirSync(path).filter(file => fs.statSync(`${path}/${file}`).isDirectory());
};

const source = getDir(path.resolve(__dirname, '../src'));
const questions = [
  {
    type: 'autocomplete',
    name: 'from_dir',
    message: '输入要打包的文件夹',
    source,
    default: 'src',
    validate (input) {
      if (input && source.includes(input)) {
        return true;
      } else {
        console.log(' (没有这个文件夹哦，请重新输入)');
        return false;
      }
    }
  }
];

const getQueryConfig = () => {
  return new Promise((resolve, reject) => {
    prompt(questions).then(answer => {
      resolve(answer.from_dir);
    });
  });
};

const runWebpack = (dirPath) => {
  console.log(dirPath);
  const webpackConfig = getConfig('prod');
  const outPath = path.join(webpackConfig.output.path, 'dirPath');
  rm(outPath, err => {
    if (err) throw err;
    webpackConfig.entry = `./src/${dirPath}/main.js`;
    webpackConfig.output.path += outPath;
    webpack(webpackConfig, function (err, stats) {
      if (err) throw err;
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');

      console.log(chalk.cyan(' Build complete.\n'));
      console.log(chalk.yellow(
        ' Tip: built files are meant to be served over an HTTP server.\n' +
        ' Opening index.html over file:// won\'t work.\n'
      ));
    });
  });
};

getQueryConfig().then(runWebpack);
// runWebpack();
