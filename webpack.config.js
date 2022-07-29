const path = require("path");
const fs=require("fs");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");


const chooseEntry = () => {
  // this will use an index.ts file if exists, otherwise uses index.js
  // if both, the .ts is preferred
  const indexTs = path.join(__dirname, "src/index.ts");
  const indexJs = path.join(__dirname, "src/index.js");
  return fs.existsSync(indexTs) ? indexTs : indexJs;
};

const haveFavicon = () => {
  // if there is a favicon.ico file, use it
  const favicon = path.join(__dirname, "src/favicon.ico");
  return fs.existsSync(favicon);
};

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";

  const config = {
    mode: argv.mode ? argv.mode : "development",
    entry: {
      bundle: chooseEntry("src")
    },
    devtool: devMode ? "eval" : "source-map",
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      path: __dirname + "/dist",
      filename: "[contenthash].js",
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html",
        favicon: haveFavicon() ? "src/favicon.ico" : "",
      }),
      new ESLintPlugin(),
      new StylelintPlugin({
        configFile: ".stylelintrc.json"
      })
    ].concat(
      devMode
        ? []
        : [
          new MiniCssExtractPlugin({
            filename: "[contenthash].css",
          }),
        ]
    ),
    devServer: {
      client: {
        logging: "warn",
      },
      static: {
        directory: path.join(__dirname, "dist"),
      },
      watchFiles: ["./src/*"],
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ],
        },
        {
          test: /\.js$/,
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
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
          },
        }
      ],
    },
    optimization: {
      minimizer: ["...", new CssMinimizerPlugin()],
    },
  };

  console.log("Mode : ", config.mode);

  return config;
};
