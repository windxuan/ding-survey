// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'eqeqeq': 1,
    //
    'no-plusplus': 0,
    // 基本的优先级都懂
    'no-mixed-operators': 0,
    // 适当放长一行
    'max-len': [1, {'code': 120}],
    'no-shadow': 0,
    // 未写完的代码，不让let破坏书写体验
    'prefer-const': process.env.NODE_ENV == 'production' ? 2 : 1,
    // 函数参数允许最后一个没有逗号
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore"
    }],
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
        'Vue', // for vue axios prototype
        'config',
        'val'
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': 0,
    'import/no-unresolved': 0,
    // allow optionalDependencies
    'import/no-extraneous-dependencies': 0,
    // 开发环境允许console
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  }
}
