module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'import/no-cycle': 'error',
        'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
        'import/order': [
          'error',
          {
            groups: [['external', 'builtin'], 'internal', ['sibling', 'parent'], 'index'],
            pathGroups: [
              {
                pattern: '@(react|react-native)',
                group: 'external',
                position: 'before',
              },
              {
                pattern: '@src/**',
                group: 'internal',
              },
            ],
            pathGroupsExcludedImportTypes: ['internal', 'react'],
            'newlines-between': 'never',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
    },
  ],
};
