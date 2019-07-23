/**
 *   左右滑动列表
 *   haoxin_qiu 
 */

import React from 'react';
import PropTypes from 'prop-types';
import SuperComponent from '../SuperComponent';
import './index.less';
import SlideListT from './SlideList.js';
import Answer from '../Answer';

const prefixCls="ai-sl";

class SlideList extends SuperComponent{
	constructor(props){
       super(props);
       this.sourceTargetX=0;
       this.distTargetX=0;
       this.direction=0;
       this.curPageIdx=0;
       this.isMove=true;
	}
	componentDidMount(){
       const {data,canItemClick}=this.props;
       if(!this.slideList){
         this.slideList=new SlideListT(this.wrappr,{
            data,
         })
         if(canItemClick){
            this.slideList.on('click',this.handleClickItem);
         }
         this.slideList.on('pageChange',this.handlePageChange);
       }
	}
	  handleClickItem=(text,itemId)=>{
	     const {onItemClick}=this.props;
	     onItemClick && onItemClick(text,itemId);
	  }
	  handlePageChange=(curPage)=>{
	    const {onPageChange}=this.props;
	    onPageChange && onPageChange(curPage);
	  }
	render(){
		const {style,text}=this.props;
		return (
          <div style={style}>
             <Answer str={text} style={{lineHeight:'23px',padding:'8px 8px 12px 16px',marginTop:10}}></Answer>
             <div className={`${prefixCls}-wrapper`} ref={el=>this.wrappr=el}>
              
             </div>
          </div>

		)
	}
}
SlideList.defaultProps={
    canItemClick:true,
}
SlideList.propTypes={
    canItemClick:PropTypes.bool,//item是否可点击
    onItemClick:PropTypes.func.isRequired,
    onPageChange:PropTypes.func.isRequired,
}
export default SlideList;
