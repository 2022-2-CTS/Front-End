module.exports = {
    devServer: { // api 요청이 있을때 어디에서 처리할지를 설정
        proxy: {
            '/api': {
                target: 'http://localhost:3000/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    outputDir: '../Back-End/public',  // 배포 파일의 위치를 지정
    /* 이미지 파일 (svg 제외) */
    //.test(/\.(png|jpe?g|gif)(\?.*)?$/)
    chainWebpack: (config) => {
        /* 이미지 파일 (svg 제외) */
    config.module.rule('images')
    //.test(/\.(png|jpe?g|gif)(\?.*)?$/)
    .use('url-loader').loader('url-loader')
    .tap(options => Object.assign(options, { esModule: false }));
    
  /* svg 파일 */
  config.module.rule('svg')
    .use('file-loader')
    .loader('file-loader')
    .tap(options => Object.assign(options, { esModule: false }));
    }
}