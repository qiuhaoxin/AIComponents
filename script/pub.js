const webpack=require('webpack');
const chalk=require('chalk');
const webpackConfig=require('../webpackConfig/webpack.build.config.js');

webpack(webpackConfig,(err,stats)=>{
	if(err){
		console.error(chalk.red('error is ')+err.stack || err);

		if(err.details){
			console.error(chalk.red('error details is '+err.details));

		}
		return;
	}
	const info=stats.toJson();
	if(stats.hasErrors()){
		console.error(chalk.red('error in stats is ')+info.errors);
	}
	if(stats.hasWarnings()){
		console.warn(chalk.yellow('warning is stats is '+info.warnings));
	}

})