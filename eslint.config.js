const { Linter } = require('@typescript-eslint/eslint-plugin');

module.exports = [
    {
        files: ['*.ts'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
            project: 'tsconfig.json',
            sourceType: 'module',
        },
        plugins: ['@angular-eslint', '@typescript-eslint'],
        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:@typescript-eslint/recommended-requiring-type-checking',
            'plugin:@angular-eslint/recommended',
        ],
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@angular-eslint/component-class-suffix': [
                'error',
                {
                    suffixes: ['Component'],
                },
            ],
            '@angular-eslint/directive-class-suffix': [
                'error',
                {
                    suffixes: ['Directive'],
                },
            ],
            '@angular-eslint/no-output-on-prefix': 'off',
            '@angular-eslint/no-empty-lifecycle-method': 'off',
            'no-console': 'warn',
            'no-debugger': 'warn',
        },
    },
    {
        files: ['*.html'],
        plugins: ['@angular-eslint/template'],
        extends: ['plugin:@angular-eslint/template/recommended'],
        rules: {
            '@angular-eslint/template/no-negated-async': 'error',
        },
    },
    {
        files: ['*.spec.ts'],
        rules: {
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        files: ['*.component.html'],
        rules: {
            '@angular-eslint/template/i18n': [
                'warn',
                {
                    checkId: true,
                    checkText: true,
                    ignoreTags: ['mat-icon'],
                },
            ],
        },
    },
];
