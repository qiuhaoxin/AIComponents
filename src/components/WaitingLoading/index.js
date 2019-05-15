/**
 * waitingLoading
 * qiuhaoxin
 */
import React from 'react';
import './index.less';
const prefixCls='ai-wl';
export const WaitingLoading=(props)=>{
	const tip=props.tip || '正在加载...';
	return (
       <div className={`${prefixCls}-wrapper`}>
           <div className={`${prefixCls}-loading`}>
                
           </div>
           <div className={`${prefixCls}-tip`}>
               {tip}
           </div>
       </div>
	)
}



