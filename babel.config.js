module.exports = {
    presets: [['@babel/preset-env', { targets: {node: 'current'} }]],
};

// 這隻檔案至高關鍵，他在jest 2x版以後啟了作用，經測試用.babelrc沒用，
// 要透過這支babel.config.js，這樣jest才知道你node_modules或非你自己的source code, test files 以外的檔案要怎麼處理