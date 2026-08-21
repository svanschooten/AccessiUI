import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import typescript from '@vue/eslint-config-typescript';

export default [
  { ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**'] },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  ...typescript(),
  {
    rules: {
      // Accessibility-relevant behaviour should be explicit, not inferred.
      '@typescript-eslint/no-explicit-any': 'error',
      'vue/multi-word-component-names': 'off',

      // Prettier owns formatting. These rules only produce conflicting noise.
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      'vue/html-indent': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/attributes-order': 'off',
    },
  },
];
