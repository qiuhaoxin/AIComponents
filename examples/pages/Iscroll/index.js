import React,{Component} from 'react';
import './index.less';
// import iScroll from 'iscroll/build/iscroll-lite';
//import Iscroll from '../../../src/components/Iscroll';
import {Iscroll} from 'aicomponents';
class IscrollTest extends Component{
	constructor(props){
		super(props);
		this.listHeight=0;
		this.preListHeight=0;
		this.scrollByHeight=0;
	}
	state={
       url:'',
       dialogList:[],
	}
	translate=()=>{
		if(this.listHeight!=0 && this.wrapper){
           this.wrapper.scrollTo(0,-this.listHeight,200,{});
		}
	}
    handleKeyUp=(e)=>{
       const keyCode=e.keyCode;
       const _this=this;
       const {dialogList}=this.state;
       if(keyCode==13){
       	  const value=e.target.value;
       	  this.listHeight=this.list.clientHeight;
          //this.preListHeight=this.listHeight;
       	 // this.listHeight=currentLength - this.listHeight;
       	  console.log("listHeight is "+this.listHeight);
       	  this.translate();
       	  let tempArr=dialogList;
       	  tempArr.push({className:'user',text:value});
       	  this.setState({
       	  	 dialogList:tempArr,
       	  })
       }
    }
    handleClick=()=>{
    	if(this.wrapper){
    		this.wrapper.scrollBy(0,-200,200);
    	}
    }
    renderList=()=>{
        const {dialogList}=this.state;
        const dialogStr=dialogList.map((item,index)=><li key={index}>{item.text}</li>)
        return (
            <ul ref={el=>this.list=el}>
                {dialogStr}
            </ul>
        )
    }
	render(){
		return (
            <div className={'wrapper'}>
	            <Iscroll ref={el=>this.wrapper=el} className="example" options={{ mouseWheel: false }}>
                    {this.renderList()}
		        </Iscroll>
		        <div style={{position:'absolute',bottom:0}}>
                     <input onKeyUp={this.handleKeyUp}/>
		        </div>
            </div>
		)
	}
}

export default IscrollTest;


/*
* <input onKeyUp={this.handleKeyUp}/>

      {this.renderList()}


      					<li>Pretty row 5</li>
						<li>Pretty row 6</li>
						<li>Pretty row 7</li>
						<li>Pretty row 8</li>
						<li>Pretty row 9</li>
						<li>Pretty row 10</li>
						<li>Pretty row 11</li>
						<li>Pretty row 12</li>
						<li>Pretty row 13</li>
						<li>Pretty row 14</li>
						<li>Pretty row 15</li>
						<li>Pretty row 16</li>
						<li>Pretty row 17</li>
						<li>Pretty row 18</li>
						<li>Pretty row 19</li>
*/