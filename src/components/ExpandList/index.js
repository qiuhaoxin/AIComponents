/*
* description:选择性列表 可展开
* author:haoxin_qiu
* creattime:2018-09-14
*/
import React,{Component} from 'react';
import ClassNames from 'classnames';
import './index.less';
import PropTypes from 'prop-types';
import {fromJS,is} from 'immutable';
import SuperComponent from '../SuperComponent';
const prefixCls="ai-el";
class ExpandList extends SuperComponent{
	constructor(props){
		super(props);
    this.state={
      list:props.data && props.data.list.filter((item,index)=>index<6),
      showExpandBtn:(props.data && props.data.list && props.data.list.length>6),
    }
	}
  shouldComponentUpdate(nextProps,nextState){
      return !is(fromJS(nextProps),fromJS(this.props)) || !is(fromJS(nextState),fromJS(this.state));
  }
  hanldeClick=(e,item)=>{
     const {onItemClick}=this.props;
     onItemClick && onItemClick(item);
  }
  handleExpand=()=>{
    const {data}=this.props;
    this.setState({
      list:data && data.list,
      showExpandBtn:false
    })
  }
  handleItemClick=(item)=>{
    const {onItemClick}=this.props;
    onItemClick && onItemClick(item);
  }
	renderList=()=>{
        const {data}=this.props;
        const {list,showExpandBtn}=this.state;
        const listStr=list.map((item,index)=>{
          item.id=(1 + index);
        	return <li key={`${item.value ? item.value : index}`}
            onTouchStart={this.handleTouchStart} onTouchEnd={(e)=>this.handleTouchEnd(e,()=>this.handleItemClick.call(this,item))} onTouchMove={this.handleTouchMove}>
               {item.desc}
        	</li>
        })
        return (
          <div className={`${prefixCls}-content`}>
            <ul className={`${prefixCls}-list`} ref={(el)=>this.listEl=el}>
               {listStr}
            </ul>
            {
              showExpandBtn ? <div className={`${prefixCls}-expand`} onTouchStart={this.handleTouchStart} 
              onTouchEnd={(e)=>this.handleTouchEnd(e,this.handleExpand)}>展开全部</div> : null 
            }
          </div>  
        )
	}
	render(){
       const {className,style,data}=this.props;
       const ClassName=ClassNames({
           [`${className}`]:className,
       }
       ,`${prefixCls}-wrapper`);
       return (
          <div className={ClassName}>
              {data.desc ? <div className={`${prefixCls}-desc`}>{data.desc}</div> : null}
              {
              	this.renderList()
              }
          </div>
       )
	}

}
ExpandList.propTypes={
   data:PropTypes.object.isRequired,
   style:PropTypes.object,
   className:PropTypes.string,
}
ExpandList.defaultTyeps={
   data:null
}
export default ExpandList;
