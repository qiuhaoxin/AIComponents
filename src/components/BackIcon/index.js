/*
*  返回主页的图标组件
*  props:{
	 onIconClick:function
   }
*/
// import React from 'react';
import BackImg from '../../images/backhome_icon_new.png';
// import './index.less';
 const prefixCls=`ai-bi`;
// export const BackIcon=(props)=>{
//     const {visible,onIconClick,str}=props;
//     const visibleClass=visible ? `${prefixCls}-show` : `${prefixCls}-hide`;
// 	return (
//        <div className={`${prefixCls}-wrapper ${visibleClass}`} onClick={onIconClick}>  
//            <img src={BackImg} style={{width:24,height:24}}/>
//        </div>
// 	)
// }
// 
import  React from 'react';
import SuperComponent from '../SuperComponent';
import './index.less';

class BackIcon extends SuperComponent{
	constructor(props){
		super(props);
	}
	handleClick=()=>{
	   const {onIconClick}=this.props;
       console.log("you click me");
       onIconClick && onIconClick();
	}
	render(){
		const {visible,onIconClick,str}=this.props;
		const visibleClass=visible ? `${prefixCls}-show` : `${prefixCls}-hide`;
		return (
	       <div className={`${prefixCls}-wrapper ${visibleClass}`} onTouchStart={this.handleTouchStart}
	           onTouchMove={this.handleTouchMove} onTouchEnd={(e)=>this.handleClick(e,this.handleClick.bind(this))}>  
	           <img src={BackImg} style={{width:24,height:24}}/>
	       </div>
		)
	}
}

export default BackIcon;
