const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          math: "always",
        },
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        bypass: function (req, res) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }else if(process.env.MOCK !== "none") {
            // 将请求url转为文件名
            const name = req.path.split("/api/")[1].split("/").join("_");
            const mock = require(`./src/mock/${name}`);
            const result = mock(req.method);
            // 需要清除缓存，不然变更数据时，不生效
            delete require.cache[require.resolve(`./src/mock/${name}`)];
            return res.send(result);
        }
        },
      },
    },
  },
});
