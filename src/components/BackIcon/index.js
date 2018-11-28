/*
*  返回主页的图标组件
*  props:{
	 onIconClick:function
   }
*/
import React from 'react';
import BackImg from '../../images/backhome_icon@2x.png';
import './index.less';
const prefixCls=`ai-bi`;
export const BackIcon=(props)=>{
    const {visible,onIconClick,str}=props;
    const visibleClass=visible ? `${prefixCls}-show` : `${prefixCls}-hide`;
	return (
       <div className={`${prefixCls}-wrapper ${visibleClass}`} onClick={onIconClick}>  
           <img src={BackImg} style={{width:24,height:24}}/>
       </div>
	)
}
