module.exports = {
	devServer: {
    proxy: {
      "^/api/flights": {
        target: process.env.VUE_APP_API_BASEURI,
        changeOrigin: true,
        pathRewrite: {'^/api/flights': '/flights'},
      },
      "^/api/total": {
        target: process.env.VUE_APP_API_BASEURI,
        changeOrigin: true,
        pathRewrite: {'^/api/total': '/total'},
      },
      "^/api/booking": {
        target: process.env.VUE_APP_API_BASEURI,
        changeOrigin: true,
        pathRewrite: {'^/api/booking': '/booking'},
      }
    }
  },
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
}
