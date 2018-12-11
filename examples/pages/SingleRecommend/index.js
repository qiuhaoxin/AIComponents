import React,{Component} from 'react';
import './index.less';
import SingleRecommend from '../../../src/components/SingleRecommend';

import chailv from '../../images/image_chailv.png'
import caiwu from '../../images/image_caiwu.png'
import WaitingLoading3 from "../../../src/components/WaitingLoading3";
import StarRate from "../../../src/components/StarRate";

class NumberCardPage extends Component{
	constructor(props){
		 super()
	}
	render(){

		let appTitle = '财务指标查查查'
		let appMessage=[
			"查一下白金公司这个月的现金","青岛分公司10月现金是多少","我要看去年1月的销售额"
		]

        let appMessage2=null

		return (
            <div className={'content'}>
				hello world
				<SingleRecommend bgImg={chailv}  appTitle={appTitle} appMessage={appMessage}/>


				<SingleRecommend   appTitle={appTitle} appMessage={appMessage2}/>

				<WaitingLoading3/>

				<StarRate/>

			</div>
		)
	}
}

export default NumberCardPage;


