const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",
	devServer: {
		contentBase: "./dist",
		proxy: {
			"/api": {
				target: "http://localhost:5000",
				changeOrigin: true
			}
		}
	},
});
