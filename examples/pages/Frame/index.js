import React,{Component} from 'react';
import './index.less';
import Frame from '../../../src/components/Frame';
import SlideList from '../../../src/components/SlideList';
import {WaitingLoading2} from '../../../src/components/WaitingLoading2';
import WaitingLoading3 from "../../../src/components/WaitingLoading3";
import VoiceLoading from  '../../../src/components/VoiceLoading';

class FramePage extends Component{
	constructor(props){
		super(props);
		this.data=[
			   {id:1,value:[{id:1,value:'财务收款'},{id:2,value:'应收账款'},{id:3,value:'营业收入'},{id:4,value:'现金'},{id:5,value:'利润总额'}]},
			   {id:2,value:[{id:1,value:'财务收款2'},{id:2,value:'应收账款2'},{id:3,value:'营业收入2'},{id:4,value:'现金2'},{id:5,value:'利润总额2'}]},
			   {id:3,value:[{id:1,value:'财务收款3'},{id:2,value:'应收账款3'},{id:3,value:'营业收入3'},{id:4,value:'现金3'},{id:5,value:'利润总额3'}]},
			   {id:4,value:[{id:1,value:'财务收款4'},{id:2,value:'应收账款4'},{id:3,value:'营业收入4'},{id:4,value:'现金4'},{id:5,value:'利润总额4'}]},
			   {id:5,value:[{id:1,value:'财务收款5'},{id:2,value:'应收账款5'},{id:3,value:'营业收入5'},{id:4,value:'现金5'},{id:5,value:'利润总额5'}]},
			];
	}
	state={
       url:'',
	}
    handleClick=(text,itemId)=>{
    	console.log("text is "+text+" and id is "+itemId);
    }
    handlePageChange=(curPage)=>{
    	console.log("pageChange is "+curPage);
    }
	render(){
		//const {url}=this.props;
		const url=`https://ierp.kingdee.com:2024/devbos/qinganalysis/qing-lightapp.html?analysisId=1864&path=https%3A%2F%2Fierp.kingdee.com%3A2024%2Fdevbos&tag=a5ad1725-8a52-45ee-8137-bd1d535f40f2&language=zh_CN&bizTag=Lapp-08d3473b-58fa-4594-9595-e3f7e006455f&skin=ierp&view=10`
		return (
            <div>
               <SlideList style={{marginLeft:30,marginRight:30,marginTop:30}} data={this.data} text={'您要查询哪个组织的财务指标呢？'}
               onItemClick={this.handleClick} onPageChange={this.handlePageChange}></SlideList>
	           <WaitingLoading2></WaitingLoading2>
			   <WaitingLoading3/>
			   <VoiceLoading></VoiceLoading>
            </div>
		)
	}
}

export default FramePage;

/**
 *           <Frame className={`ai-frame-demo`} src={url}></Frame>
 */