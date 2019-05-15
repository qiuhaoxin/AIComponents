/*
* Answer
* haoxin_qiu
*/
import React from 'react';
import './index.less';
import SuperComponent from '../SuperComponent';
import PropTypes from 'prop-types';
const prefixCls="ai-answer";

// export const Answer=(props)=>{
//     const {style,str,className,canClick}=props;
// 	return (
//        <div className={`${prefixCls}-wrapper ${className}`} on style={style}>
//           {str}
//        </div>
// 	)
// }

class Answer extends SuperComponent{
	constructor(props){
		super(props);
	}
	handleClick=()=>{
        const {canClick,onClick}=this.props;

        if(!canClick)return;
        onClick && onClick();
        
	}
	render(){
		const {style,str,className,canClick}=this.props;
		return (
	       <div className={`${prefixCls}-wrapper ${className}`}  style={style} onTouchStart={this.handleTouchStart}
               onTouchMove={this.handleTouchMove} onTouchEnd={(e)=>this.handleTouchEnd(e,this.handleClick.bind(this))}>
	          {str}
	       </div>
	   )
	}
}
Answer.propTypes={
	canClick:PropTypes.bool,
	onClick:PropTypes.func,
	str:PropTypes.string.isRequired,
}
Answer.defaultProps={
	canClick:false,
}
export default Answer;



