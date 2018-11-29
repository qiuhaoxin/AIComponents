import React,{Component} from 'react';
import './index.less';
import Frame from '../../../src/components/Frame';
import SlideList from '../../../src/components/SlideList';

class FramePage extends Component{
	constructor(props){
		super(props);
	}
	state={
       url:'',
	}
    handleClick=()=>{
    	console.log("sdfsdfsfsdd");
    }
	render(){
		//const {url}=this.props;
		const url=`https://ierp.kingdee.com:2024/devbos/qinganalysis/qing-lightapp.html?analysisId=1864&path=https%3A%2F%2Fierp.kingdee.com%3A2024%2Fdevbos&tag=a5ad1725-8a52-45ee-8137-bd1d535f40f2&language=zh_CN&bizTag=Lapp-08d3473b-58fa-4594-9595-e3f7e006455f&skin=ierp&view=10`
		return (
            <div>
               <SlideList style={{marginLeft:30,marginRight:30,marginTop:30}}></SlideList>
	 
            </div>
		)
	}
}

export default FramePage;

/**
 *           <Frame className={`ai-frame-demo`} src={url}></Frame>
 */