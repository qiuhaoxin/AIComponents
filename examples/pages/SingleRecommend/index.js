import React,{Component} from 'react';
import './index.less';
import SingleRecommend from '../../../src/components/SingleRecommend';

class NumberCardPage extends Component{
	constructor(props){
		 super()
	}
	render(){

		let appTitle = '财务指标查查查'
		let appMessage=[
			"查一下白金公司这个月的现金","青岛分公司10月现金是多少","我要看去年1月的销售额"
		]

		return (
            <div className={'content'}>
				hello world
				<SingleRecommend appTitle={appTitle} appMessage={appMessage}/>
			</div>
		)
	}
}

export default NumberCardPage;


