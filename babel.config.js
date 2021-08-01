module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
  ],
};
