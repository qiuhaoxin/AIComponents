/*
*  URL
*  props:{
	 onIconClick:function
   }
*/
import React from 'react';
import './index.less';
import SuperComponent from '../SuperComponent';
import PropTypes from 'prop-types';
const prefixCls='ai-url';
class URL extends SuperComponent{
    handleUrlClick=()=>{
    	const {onClick}=this.props;
    	onClick && onClick();
    }
	render(){
		const {urlStr,style}=this.props;
		return (
           <div className={`${prefixCls}-wrapper`}>
               <span style={style} onTouchStart={this.handleTouchStart}
               onTouchMove={this.handleTouchMove} onTouchEnd={(e)=>this.handleTouchEnd(e,this.handleUrlClick.bind(this))}>
                  {urlStr}
               </span>
           </div>
		)
	}
}
URL.defaultProps={
   style:{},
   onClick:null,
   urlStr:'',
}
URL.propTypes={
   style:PropTypes.object,
   onClick:PropTypes.func.isRequired,
   urlStr:PropTypes.string.isRequired,
}
export default URL;
