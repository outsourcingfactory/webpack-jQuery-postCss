module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  rules: {
    'generator-star-spacing': 'off',
    'semi': [2, "always"], //语句强制分号结尾
    'no-debugger': process.env.NODE_ENV === 'prod' ? 'error' : 'off'
  }
}
