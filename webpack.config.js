const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWepackPlugin = require('clean-webpack-plugin');

// 导出配置模块
module.exports = {
	//入口文件
	entry:{
		main:'./src/app.js',
	},

	// 编译地址
	output:{
		path:path.resolve(__dirname,'./dist'),
		filename:'js/[name]-bundle.js'
	},
	mode:'development',
	devServer: {
      contentBase: path.join(__dirname, "./dist"), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
      port: 9001, //端口改为9000
      open:true, // 自动打开浏览器，适合懒
    },
	module:{
		rules:[
			{ 
				test: /\.css$/, 
				loader: ['style-loader','css-loader'] 
			},
			{
				test:/\.js$/,
				exclude:path.resolve(__dirname,'./node_modules'),
				
				use:[
					{
						loader:'babel-loader',
						options:{
							presets:['env','react','stage-0']
						}
					}
				]
			},
			{
				test:/\.less$/,
				loader:['style-loader','css-loader','less-loader']
			},
			{
				test:/\.(jpg|png|gif)$/,
				use:['url-loader']
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:'./src/index.html',
			hash:true,
			title:'首页',
			chunks: ['main']
		}),
		new CleanWepackPlugin(['dist']),

	]
}