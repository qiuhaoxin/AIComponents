import React,{Component} from 'react';
import './index.less';
import ExpandList from '../../../src/components/ExpandList';
import Tip from '../../../src/components/Tip';



class ExpandListPage extends Component{
    constructor(props){

    	super(props);
        this.tipContent="出差申请";
    	this.data={
           desc:'请选择出差类型',
           list:[
                {index:1,name:'一般出差一般出差一般出差'},
                {index:2,name:'项目出差'},
                // {index:3,name:'商务出差'},
                // {index:4,name:'测试出差'},
                // {index:5,name:'项目出差1'},
                // {index:6,name:'商务出差1'},
                // {index:7,name:'测试出差1'},
           ]
        }
    }
    handleTipClick=()=>{
        console.log("tip click");
    }
    render(){

    	return (
            <div>
                <Tip visible={true} content={this.tipContent} icon={require('../../images/text.png')} onClick={this.handleTipClick}></Tip>
                <ExpandList data={this.data} className={`ai-el-demo`}></ExpandList>
            </div>
    	)
    }
} 
export default ExpandListPage;