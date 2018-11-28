/*
*  haoxin_qiu
*  异常组件
*/

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import SuperComponent from '../SuperComponent';
import './index.less';

const prefixCls='ai-ex';
class Exception extends SuperComponent{
   
   handleBtnClick=(e)=>{
   	  console.log("you click me!");
   	  const {onExceptionClick}=this.props;
      onExceptionClick && onExceptionClick()   
   }
   getHeight=()=>{
      return this.wrapper ? this.wrapper.clientHeight : 0;
   }
   render(){
   	  return (
         <div className={`${prefixCls}-wrapper`} ref={el=>this.wrapper=el}>
             <div className={`${prefixCls}-content`}>
                有BUG从空中砸中了我，快帮帮我吧
             </div>
             <div className={`${prefixCls}-btn`} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove}
                onTouchEnd={(e)=>this.handleTouchEnd(e,this.handleBtnClick.bind(this,e))}>
                让小K满血复活
             </div>
         </div>
   	  )
   }
}
export default Exception;