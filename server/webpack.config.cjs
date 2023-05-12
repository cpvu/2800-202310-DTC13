module.exports = {
  // ... other configuration options
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
    ],
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
      constants: false,
      crypto: false,
      stream: false,
      buffer: false,
      util: false,
      assert: false,
      os: false,
      zlib: false,
      http: false,
      https: false,
      net: false,
      tls: false,
      dns: false,
      child_process: false,
      process: false,
      timers: false,
      console: false,
      querystring: false,
      url: false,
      
    },
  },
};
