/*
* 构建
*/
const path=require('path');
const cfg=require('../package.json');

module.exports={
	mode:'production',
	entry:{
       main:path.resolve(__dirname,'../src/index.js'),
	},
	output:{
       path:path.resolve(__dirname,'../dist'),
       filename:'[name].min.js',
       library:cfg.name,
       libraryTarget:'umd',
	},

	module:{
       rules:[
          {
          	test:/\.(js|jsx)$/,
          	exclude:path.resolve(__dirname,'node_modules'),
          	use:'babel-loader',
          },{
          	test:/\.css$/,
          	exclude:path.resolve(__dirname,'node_modules'),
          	use:'style-loader!css-loader',
          },{
          	test:/\.less$/,
          	exclude:path.resolve(__dirname,'node_modules'),
          	use:'style-loader!css-loader!less-loader',
          }
       ]
	},
	resolve:{
        extensions:['.js','.jsx','.less','.css','.json'],
	},
	externals:{
		react:{
		   commonjs:'react',
		   commonjs2:'react',
		   amd:'react',
		   root:'React',
		},
		'react-dom':{
			commonjs:'react-dom',
			commonjs2:'react-dom',
			amd:'react-dom',
			root:'ReactDOM',
		}
	}
}