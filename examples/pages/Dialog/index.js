import React,{Component} from 'react';
 import {Dialog,RecommendCard} from '../../../src/index.js';
//import  {Dialog,RecommendCard} from 'aicomponents';
import './index.less';

import chailubiaozhun from '../../images/chailubiaozhun.png';
import chuchashenqing from '../../images/chuchashenqing.png';
import xiechengshanglu from '../../images/xiechengshanglu.png';

class DialogPage extends Component{
	constructor(props){
		super(props);
		this.data=[
           {id:1,name:'人人差旅',desc:'我明天要去北京出差',imagePath:chailubiaozhun},
           {id:2,name:'智能核算',desc:'我要核算',imagePath:chuchashenqing},
           {id:3,name:'日志管理',desc:'我要日志管理',imagePath:chuchashenqing},
           {id:4,name:'业务流服务',desc:'我要查看业务流程',imagePath:xiechengshanglu},
		]
	}
	render(){
		return (
            <div>
                <Dialog></Dialog>
                <RecommendCard data={this.data} className={'ai-rc-card'}></RecommendCard>
            </div>
		)
	}
}
export default DialogPage;