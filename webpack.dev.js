const path = require("path");
const common = require("./webpack.common");
const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: "0.0.0.0",
    port: 3000,
    openPage: "http://localhost:3000",
    proxy: {
      "/api": "http://localhost:8888",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv(),
    new webpack.EnvironmentPlugin({
      APP_ENV: "local-server",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
