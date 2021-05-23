const path = require('path');
module.exports = require('./webpack.config')({
    context: __dirname,
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
});
