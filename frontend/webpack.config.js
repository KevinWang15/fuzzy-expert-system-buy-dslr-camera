let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }],
      },
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["es2015", "react"],
            plugins: ["transform-object-rest-spread", ["import", {
              "libraryName": "antd",
              "style": true,   // or 'css'
            }]],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  entry: './src/index.js',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
  },
  plugins: [new HtmlWebpackPlugin()],
};