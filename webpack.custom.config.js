const path = require("path");
const {
  loadWebpackConfig
} = require("@grafana/toolkit/src/config/webpack.plugin.config");

module.exports = async (envs) => {
  const isProduction = !envs.development;
  const watch = !!envs.watch;

  const config = await loadWebpackConfig({
    production: isProduction,
    watch
  });

  // define "grafana/**" as non external dep
  config.externals = config.externals.slice(0, config.externals.length - 1);

  // resolve aliases
  config.resolve = {
    ...config.resolve,
    alias: {
      ...(config.resolve ? config.resolve.alias : undefined),
      ["@grafana/ui"]: path.resolve(__dirname, "node_modules/grafana", "packages/grafana-ui")
    }
  };

  return config;
};
