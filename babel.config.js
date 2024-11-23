module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [".ios.ts", ".android.ts", ".ts", ".ios.tsx", ".android.tsx", ".tsx", ".jsx", ".js", ".json"],
          alias: {
            "@utils": "./utils",
            "@components": "./components",
            "@assets": "./assets",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
        },
      ],
    ],
  };
};
