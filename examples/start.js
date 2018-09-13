const webpack=require('webpack');
const webpackDevServer=require('webpack-dev-server');
const webpackConfig=require('./webpack.config.js');
const path=require('path');
process.env.NODE_ENV="development";

const devServerConfig={
	contentBase:path.resolve(__dirname,'dist'),
	hot:true,
	port:8099,
}
const compiler=webpack(webpackConfig);


const DEFAULT_PORT=process.env.PORT || 8099;

const devServerOptions=Object.assign({},devServerConfig,{

})

webpackDevServer.addDevServerEntrypoints(webpackConfig,devServerOptions);

const server=new webpackDevServer(compiler,devServerOptions);

server.listen(DEFAULT_PORT,'127.0.0.1',()=>{
	console.log(`server is starting at port ${DEFAULT_PORT}`);
})