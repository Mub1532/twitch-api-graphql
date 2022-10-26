const path = require('path');

module.exports = {
    extends: ['@angablue'],
    parserOptions: {
        project: path.join(__dirname, './tsconfig.json')
    }
};
