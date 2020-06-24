const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const IS_DEVELOP = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: IS_DEVELOP ? 'development' : 'production',
  entry: `${__dirname}/src/js/index.js`,
  output: {
    path: `${__dirname}/dist/assets/js/`,
    filename: 'bundle.js'
  },
  devtool: IS_DEVELOP ? 'eval' : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: IS_DEVELOP,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: IS_DEVELOP,
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEVELOP,
            }
          },
        ]
      }
    ]
  },
  resolve: {
    extensions: [' ', '.js', '.scss'],
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] },
      files: [
        'dist/**/*.html',
        'dist/assets/**/*.js',
        'dist/assets/**/*.css'
      ]
    }),
    new MiniCSSExtractPlugin({
      filename: '../css/style.css'
    })
  ]
}
