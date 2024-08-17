const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  transpileDependencies: true, // You can keep your existing configuration

  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [
        // Enable minification using TerserWebpackPlugin
        new TerserWebpackPlugin({
          // Terser options
          terserOptions: {
            compress: {
              drop_console: true, // Drop console statements
            },
            output: {
              comments: false, // Remove comments
            },
          },
        }),
      ],
    },
  },
};
