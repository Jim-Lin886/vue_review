module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      console.log(args);
      args[0].title = "Vue Review 1 2 3";
      return args;
    });
  },
};
