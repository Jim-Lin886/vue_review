module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      console.log(args);
      args[0].title = "Vue Integateted - demo";
      return args;
    });
  },
  publicPath: process.env.NODE_ENV === "production" ? "/vue-review/" : "/",
};
