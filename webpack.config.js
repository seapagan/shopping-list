/* -------------------------------------------------------------------------- */
/* ----------------------- SPBuild Sytem Verison 1.3.1 ---------------------- */
/* --------------- (C) Grant Ramsay 2023 under the MIT Licence -------------- */
/* ------------------ https://github.com/seapagan/sp-build ------------------ */
/* -------------------------------------------------------------------------- */

const path = require("path");
const fs = require("fs");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlValidatePlugin = require("html-validate-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const WarningsToErrorsPlugin = require("warnings-to-errors-webpack-plugin");

const chooseEntry = () => {
  // this will use an index.ts file if exists, otherwise uses index.js
  // if both exist, the .ts is preferred
  const indexTs = path.join(__dirname, "src/index.ts");
  const indexJs = path.join(__dirname, "src/index.js");
  return fs.existsSync(indexTs) ? indexTs : indexJs;
};

const haveFavicon = () => {
  // if there is a favicon.ico file, use it
  const favicon = path.join(__dirname, "src/favicon.ico");
  return fs.existsSync(favicon);
};

module.exports = (_env, argv) => {
  const devMode = argv.mode !== "production";

  const config = {
    mode: argv.mode ? argv.mode : "development",
    entry: {
      bundle: chooseEntry(),
    },
    devtool: devMode ? "eval" : "source-map",
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    output: {
      path: __dirname + "/dist",
      filename: "[contenthash].js",
      clean: true,
    },
    plugins: [
      new Dotenv({ systemvars: true, expand: true }),
      new HtmlWebpackPlugin({
        template: "src/index.html",
        favicon: haveFavicon() ? "src/favicon.ico" : "",
      }),
      new ESLintPlugin(),
      new StylelintPlugin({
        configFile: ".stylelintrc.json",
      }),
      new HtmlValidatePlugin(),
    ].concat(
      devMode
        ? []
        : [
            // we only want these ones for a production build
            new WarningsToErrorsPlugin(),
            new MiniCssExtractPlugin({
              filename: "[contenthash].css",
            }),
          ]
    ),
    devServer: {
      client: {
        logging: "warn",
        overlay: {
          warnings: false,
          errors: true,
        },
      },
      static: {
        directory: path.join(__dirname, "dist"),
      },
      watchFiles: ["./src/*"],
      hot: true,
    },
    stats: "minimal",

    module: {
      rules: [
        {
          // for CSS Modules
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  auto: true,
                  localIdentName: devMode
                    ? "[path][name]__[local]"
                    : "[hash:base64]",
                },
              },
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                postcssOptions: {
                  config: "postcss.config.js",
                },
              },
            },
            "sass-loader",
          ],
          include: /\.module\.(sa|sc|c)ss$/,
        },
        {
          // for Standard CSS (non-module) files.
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                postcssOptions: {
                  config: "postcss.config.js",
                },
              },
            },
            "sass-loader",
          ],
          exclude: /\.module\.(sa|sc|c)ss$/,
        },
        {
          // JS and JSX
          test: /\.js?$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, "src"),
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          // TS and TSX
          test: /\.ts?$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
          },
        },
        {
          // inline small svg files
          test: /\.svg$/,
          type: "asset",
        },
      ],
    },
    optimization: {
      minimizer: ["...", new CssMinimizerPlugin()],
    },
  };

  console.log("Mode : ", config.mode);

  return config;
};
