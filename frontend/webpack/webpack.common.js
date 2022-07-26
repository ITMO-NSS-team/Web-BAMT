const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: path.resolve(__dirname, "..", "./src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "..", "./build"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].chunk.js",
    publicPath: "/",
    assetModuleFilename: "images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          "@teamsupercell/typings-for-css-modules-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eof|ttf|otf|svg)$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "..", "./public/index.html"),
      favicon: path.resolve(__dirname, "..", "./public/favicon.ico"),
    }),
    new BundleAnalyzerPlugin(),
  ],
};
