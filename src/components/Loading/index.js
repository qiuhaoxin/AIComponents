/*
*  haoxin_qiu
*  加载效果
*/
import React,{Component} from 'react';
import './index.less';
import PropTypes from 'prop-types';
import SuperComponent from '../SuperComponent';
const prefixCls='ai-loading';
class Loading extends SuperComponent{
  handleTouchMove=(e)=>{
  }
  handleTouchEnd=()=>{
     return false;
  }
  componentDidMount(){
    // document.addEventListener('touchmove',function(e){
    //   e.preventDefault();
    // },{ passive: false });
  }
  stopPreventDefault=(e)=>{
    e.preventDefault();
  }
  handleClick=()=>{

  }
	render(){
		const {londingStr,visible,style}=this.props;
		const visibleCls=visible ? `${prefixCls}-show` : `${prefixCls}-hide`;
    if(visible){
      console.log("visible is "+true);
      document.addEventListener('touchmove',this.stopPreventDefault.bind(this),{passive:false});
    }else{
      console.log("visible is "+false);
      document.removeEventListener('touchmove',this.stopPreventDefault.bind(this),{passive:false});
    }
		return (
           <div className={`${prefixCls}-wrapper ${visibleCls}`} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove}
               onTouchEnd={this.handleTouchEnd}>
             <div className={`${prefixCls}-inner`} style={style}>
               <div className={`${prefixCls}-content`}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
               </div>

               <div className={`${prefixCls}-tips`}>
                   {londingStr}
               </div>
             </div>
           </div>
		)
	}
}
Loading.defaultProps={
    loadingStr:'正在跳转',
    visible:false,
}
Loading.propTypes={
    loadingStr:PropTypes.string.isRequired,
    visible:PropTypes.bool,
}
export default Loading;