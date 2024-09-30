const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
        // Định nghĩa các cờ tính năng khác nếu cần
      }),
    ],
  },
};
