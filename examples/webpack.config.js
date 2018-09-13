
const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const OpenBrowser=require('open-browser-webpack-plugin');
module.exports={
	mode:'development',
	entry:{
		main:'./index.js',
	},
	output:{
       path:path.resolve(__dirname,'dist'),
       filename:'[name].js',
	},
	module:{
		rules:[
          {
          	 test:/\.(js|jsx)$/,
          	 use:'babel-loader',
          	 exclude:path.resolve(__dirname,'node_modules'),
          },{
          	test:/\.css$/,
          	use:'style-loader!css-loader',
          },{
          	test:/\.less$/,
          	use:'style-loader!css-loader!less-loader',
          }
		]
	},
	resolve:{
		extensions:['.js','.css','.less'],
	},
	plugins:[
        new HtmlWebpackPlugin({
          template:path.resolve(__dirname,'public/index.html'),
          inject:true,
          title:'devServer',
       }),
       new OpenBrowser({url:'http://localhost:8099'}),
	]
}