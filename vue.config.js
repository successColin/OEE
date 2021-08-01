const path = require('path');
const ThemeColorReplacer = require('webpack-theme-color-replacer');
const forElementUI = require('webpack-theme-color-replacer/forElementUI');
const appConfig = require('./src/config/index.js');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 部署应用包时的基本URL，如果是生产环境，部署到 /cli-study/dist 路径；如果是开发环境，部署到根路径
  publicPath:
    process.env.NODE_ENV === 'production' ? `${appConfig.baseUrl}/` : '/',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],
  // 生产环境不需要sourceMap
  productionSourceMap: process.env.NODE_ENV === 'development',
  devServer: {
    host: '0.0.0.0',
    port: 8088,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    }, // 错误在页面弹出、警告不在页面弹出
    proxy: {
      '/api': {
        target: 'http://47.118.76.70:8080/', // 代理地址，这里设置的地址会代替axios中设置的baseURL
        // target: 'http://192.168.0.153:8080', // cl
        // target: 'http://192.168.0.138:8080', // lf
        // target: 'http://192.168.0.160:8080/', // zs
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/css/cssVariable.scss";',
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        '@s': resolve('static'),
        _c: resolve('src/components'),
        _u: resolve('src/utils'),
        _v: resolve('src/views'),
      },
    },
    plugins: [
      // 生成仅包含颜色的替换样式（主题色等）
      new ThemeColorReplacer({
        fileName: 'static/css/theme-colors.[contenthash:8].css',
        matchColors: [...forElementUI.getElementUISeries(appConfig.themeColor)],
        changeSelector: forElementUI.changeSelector,
        isJsUgly: process.env.NODE_ENV !== 'development',
      }),
    ],
  },

  chainWebpack(config) {
    config.optimization.runtimeChunk('single');
    config
      .plugin('ScriptExtHtmlWebpackPlugin')
      .after('html')
      .use('script-ext-html-webpack-plugin', [
        {
          // `runtime` must same as runtimeChunk name. default is `runtime`
          inline: /runtime\..*\.js$/,
        },
      ])
      .end();

    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // 预加载去除 runtime.js
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial',
      },
    ]);

    // 当有很多页面的时候，会引发很多无意义的请求
    config.plugins.delete('prefetch');

    // 第三方库的分离打包
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial',
        },
        vue: {
          name: 'chunk-Vue',
          priority: 20,
          test: /[\\/]node_modules[\\/]_?vue(.*)/,
        },
        elementUi: {
          name: 'chunk-elementUi',
          priority: 25,
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
        },
        commons: {
          name: 'chunk-commons',
          test: resolve('src'),
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    });

    config.when(process.env.NODE_ENV !== 'development', (curConfig) => {
      curConfig.optimization.minimizer('terser').tap((options) => {
        // 去除注释
        options[0].extractComments = false;
        options[0].terserOptions.format = {
          comments: false,
        };
        // 去除console
        options[0].terserOptions.compress.drop_console = true;
        return options;
      });
    });
    // 处理woff
    config.module
      .rule('woff')
      .test(/\.woff$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'static/fonts/[name].[hash:8].[ext]',
      })
      .end();
    //

    if (process.env.use_analyzer) {
      // 分析
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
  },
};
