var path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
    publicPath:process.NODE_ENV ==='production'
    ?'./'
    :'/', //替换后的访问根路劲
    // baseUrl: '/wsscwjh', vue cli3 后面的baseURL被废除了，改为了publicPath
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        // open: true, //是否自动弹出浏览器页面
        host: "localhost", 
        port: '8080', 
        https: false,   //是否使用https协议
        proxy: {
          '/*': {  // api为转发路径
            target: 'http://localhost:8081/wccs/',  // 目标地址
            changeOrigin: true,
            //ws: true, // 是否代理websockets
            pathRewrite: {
              '^/wccs': '/' //通过pathRewrite重写地址，将前缀/wccs转为/
            }
          }
        }
    },
    chainWebpack: (config)=>{
      config.resolve.alias
          .set('@', resolve('src'))
          .set('assets',resolve('src/assets'))
          .set('components',resolve('src/components'))
          .set('layout',resolve('src/layout'))
          .set('static',resolve('src/static'))
          .set('views',resolve('src/views'))
  }
    // pages: {
    //     login: {
    //          entry: './src/views/login/login.js',
    //          template: './src/views/login/login.html',
    //          filename: 'login.html',
    //     },
       
    // }
}