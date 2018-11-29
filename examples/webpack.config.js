
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
  devtool:'clean-module-eval-sourcemap',
	module:{
		rules:[
          {
          	 test:/\.(js|jsx)$/,
          	 use:'babel-loader',
          	 exclude:path.resolve(__dirname,'node_modules'),
          },{
          	test:/\.css$/,
          	use:[
               {
                 loader:'style-loader',
               },{
                 loader:'css-loader',
               }
            ],
          },{
          	test:/\.less$/,
          	use:[
               {
                 loader:'style-loader',
               },{
                 loader:'css-loader',
               },{
                 loader:'less-loader',
               }
            ],
          },{
            test:/\.(jpe?g|png|svg)$/,
            loader:'url-loader',
          },{
            test:/\.(woff|woff2|eot|svg)/,
            loader:'file-loader',
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