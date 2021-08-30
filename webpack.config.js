'use strict';

const path = require(`path`);
const PUBLIC_PATH = path.resolve(__dirname, `public`);

module.exports = {
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: PUBLIC_PATH,
  },
  devtool: `source-map`,
  devServer: {
    contentBase: PUBLIC_PATH,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
