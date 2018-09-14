import React,{Component} from 'react';
import './index.less';
import ExpandList from '../../../src/components/ExpandList';

class ExpandListPage extends Component{
    constructor(props){

    	super(props);
    	this.data=[
            {index:1,name:'一般出差'},
            {index:2,name:'项目出差'},
            {index:3,name:'商务出差'},
            {index:4,name:'测试出差'},
    	]
    }
    render(){

    	return (
            <div>
                <ExpandList data={this.data}></ExpandList>
            </div>
    	)
    }
} 
export default ExpandListPage;