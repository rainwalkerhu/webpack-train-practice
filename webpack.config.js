const path = require('path');
module.exports = {
    entry:'./src/index.js',
    mode:'development',
    output:{
        filename:'bundle.js', // 打包出的结果文件
        path:path.resolve(__dirname,'dist') // 打包到dist目录下
    }
}