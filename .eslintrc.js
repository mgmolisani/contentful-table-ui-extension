module.exports = {
  extends: [`@mgmolisani-private/eslint-config`],
  plugins: [`react-hooks`],
  rules: {
    'react-hooks/rules-of-hooks': `error`,
    'react-hooks/exhaustive-deps': `error`,
  },
};
