const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isProduction = env.production === true;
  return {
    mode: isProduction ? "production": "development",
    entry: "./src/app.js",
    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: "bundle.js"
    },
    plugins: [new MiniCssExtractPlugin({
      filename: "styles.css"
    })],
    module: {
      rules: [{
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }]
    },
    devtool: isProduction ? "source-map": "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      publicPath: "/dist/"
    }
  }
}
