/*
* Answer
* haoxin_qiu
*/
import React from 'react';
import './index.less';
const prefixCls="ai-answer";
export const Answer=(props)=>{
    const {style,str,className}=props;
	return (
       <div className={`${prefixCls}-wrapper ${className}`} style={style}>
          {str}
       </div>
	)
}