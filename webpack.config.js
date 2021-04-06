
module.exports = {
  module: {
    rules: [
      {
        test: /\.less|\.css/,
        use: [
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          },
        ],
      },
    ],
  },
};
