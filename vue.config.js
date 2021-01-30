const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 8888;
const name = process.env.VUE_APP_TITLE;

module.exports = {
  publicPath: './',
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

  devServer: {
    open: false,
    port: port
    // proxy: {
    //   '/api': {
    //     target: 'http://dev.heidutech.com:17988',
    //     changeOrigin: true,
    //     crossDomain: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  }
};
