/*
* qiuhaoxin
* Button 
*/

import React,{Component} from 'react';
import SuperComponent from '../SuperComponent';
import './index.less';
import PropTypes  from 'prop-types';

const prefixCls='ai-btn';
class Button extends SuperComponent{
    handleBtnClick=(e)=>{
       const _this=this;
       const {style,onClick}=this.props;
       const text=this.btn && this.btn.innerText;
       let addClassStr=`${prefixCls}-ani`;
       if('backgroundColor' in style || 'background-color' in style){
       	  const backgroundColorVal=style['backgroundColor'] || style['background-color'];
       	  if(backgroundColorVal=='#fff' || backgroundColorVal=='#ffffff'){
             addClassStr=`${prefixCls}-change`;
       	  }
       }
       this.btn && this.btn.classList.add(addClassStr);
       onClick && onClick(e,text);
       setTimeout(function(){
       	  //console.log("ani");
          _this.btn && _this.btn.classList.remove(addClassStr);
       },300);
    }
	render(){
		const {btnStr,style}=this.props;
		return (
           <div className={`${prefixCls}-wrapper`}>
               <span ref={el=>this.btn=el} style={style} className={`${prefixCls}-btn`} onTouchStart={this.handleTouchStart}
               onTouchMove={this.handleTouchMove} onTouchEnd={(e)=>this.handleTouchEnd(e,this.handleBtnClick.bind(this))}>{btnStr}</span>
           </div>
		)
	}
}
Button.defaultProps={

}
Button.propTypes={
    btnStr:PropTypes.string.isRequired,
}

export default Button;
