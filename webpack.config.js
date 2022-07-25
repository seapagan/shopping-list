const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";

  const config = {
    mode: "development",
    entry: "./src/index.js",
    output: {
      path: __dirname + "/dist",
      filename: "site.[contenthash].js",
      clean: {
        keep: /favicon/,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html",
      }),
    ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };

  return config;
};
