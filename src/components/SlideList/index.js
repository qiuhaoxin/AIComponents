/**
 *   左右滑动列表
 *   haoxin_qiu 
 */

import React from 'react';
import PropTypes from 'prop-types';
import SuperComponent from '../SuperComponent';
import './index.less';
import SlideListT from './SlideList.js';
import {Answer} from '../Answer';

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
       const {data}=this.props;
       if(!this.slideList){
         this.slideList=new SlideListT(this.wrappr,{
            data,
         })
         this.slideList.on('click',this.handleClickItem);
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
	// handleTouchMove=(e)=>{
 //       const point=e.touches ? e.touches[0] : e;
 //       const pageX=point.pageX,pageY=point.pageY;
 //       const distanceX=pageX - this.startX;
 //       const distanceY=pageY - this.startY;
 //       if(Math.abs(distanceX) > Math.abs(distanceY) + 50){

 //          this.direction=distanceX > 0 ? 1 : -1;
 //       	  this.transform(this.getTarget(),distanceX);
 //       }
	// }
	// getTarget=()=>{
 //    		const curPageIdx=this.curPageIdx;
 //    		if(this.distTargetX==0){
 //    			this.distTargetX=-315 * this.direction;
 //    		}
 //        if(this.direction==-1){
 //        	//左滑
 //        	if(this.curPageIdx==arr.length - 1){
 //        		return {
 //        		    sourceTarget:this[`list-${curPageIdx}`],
 //        		    distTarget:null,
 //        		}
 //        	}
 //        	return {
 //        		sourceTarget:this[`list-${curPageIdx}`],
 //        		distTarget:this[`list-${curPageIdx + 1}`],
 //        	}
 //        }else{
 //        	//右滑
 //        	if(this.curPageIdx==0){
 //        		return {
 //        			sourceTarget:this[`list-${curPageIdx}`],
 //        			distTarget:null,
 //        		}
 //        	}
 //        	return {
 //        		sourceTarget:this[`list-${curPageIdx}`],
 //        		distTarget:this[`list-${curPageIdx - 1}`],
 //        	}
 //        }
	// 	return null;
	// }
	// setTransition=(target,transitionStr)=>{
 //       if(target && target.sourceTarget){
 //       	   target.sourceTarget.style['transition']=transitionStr;
 //       }
 //       if(target && target.distTarget){
 //       	   target.distTarget.style['transition']=transitionStr;
 //       }
	// }
	// handleTouchEnd=(e)=>{
 //        const point = e.changedTouches ? e.changedTouches[0] : e;
 //        const endPageX=point.pageX;
 //        const endPageY=point.pageY;
 //        const CHANGE_DISTANCE=Math.round(315 / 4);
 //        const distanceX=Math.abs(Math.round(endPageX - this.startX));
 //        if((this.curPageIdx==0 && this.direction==1) || (this.curPageIdx==arr.length - 1 && this.direction==-1)){
 //           //this.setTransition(this.getTarget(),'transform .5s');
 //           this.transform(this.getTarget(),0);
 //           this.distTargetX=0;
 //        }else if(distanceX > CHANGE_DISTANCE){
 //        	//this.setTransition(this.getTarget(),'transform .5s');
 //        	this.transform(this.getTarget(),this.direction * 315);
 //        	this.curPageIdx+=this.direction * -1;
 //        	this.distTargetX=0;
 //        	this.changeDecoration();
 //        }else{
 //        	this.transform(this.getTarget(),0);
 //        	this.distTargetX=0;
 //        }
	// }
	// getComputedPosition=(target)=>{
	// 	var matrix = window.getComputedStyle(target, null),
	// 		x, y;

	// 	if ( this.options.useTransform ) {
	// 		matrix = matrix[utils.style.transform].split(')')[0].split(', ');
	// 		x = +(matrix[12] || matrix[4]);
	// 		y = +(matrix[13] || matrix[5]);
	// 	} else {
	// 		x = +matrix.left.replace(/[^-\d.]/g, '');
	// 		y = +matrix.top.replace(/[^-\d.]/g, '');
	// 	}

	// 	return { x: x, y: y };
	// }
	// transform=(target,x)=>{
 //        if(target && target.sourceTarget){
 //        	target.sourceTarget.style['transform']=`translate3d(${x}px,0,0)`;
 //        }
 //        if(target && target.distTarget){
 //        	const shouldTranslateX=this.distTargetX +x;
 //        	target.distTarget.style['transform']=`translate3d(${shouldTranslateX}px,0,0)`;
 //        }
	// }
	// changeDecoration=()=>{
 //         this[`decoration-${this.curPageIdx}`].style.cssText="width:7px;height:7px;background:#4795f1";
 //         for(let i=0,len=arr.length;i<len;i++){
 //         	if(i!=this.curPageIdx){
 //         		this[`decoration-${i}`].style.cssText="width:5px;height:5px;background:#d8d8d8";
 //         	}
 //         }
	// }
	// getTransform=(target)=>{
 //       const reg=/translate3d\((\-*[\d]+)px,\s*(\-*[\d]+)px,\s*(\-*[\d]+)px\)/;//translate3d
 //       const str=target.style['transform'];
 //       const result=reg.exec(str);
 //       if(result && result.length >=2){  
 //       	  return result[1];
 //       }
 //       return -9999;
	// }
	// renderPages=()=>{
	// 	const pageStr=arr.map((item,index)=>{
	// 		const style={transform:`translate3d(${index!=0 ? 315 : 0}px,0,0)`};
	// 		return <li key={item.id} style={style} ref={el=>this[`list-${index}`]=el}>
 //               <ul>
 //                   {
 //                   	  item.value.map(itemData=><li key={itemData.id}>{itemData.value}</li>)
 //                   }
 //               </ul>
	// 		</li>
	// 	});
	//     return (
 //            <ul className={`${prefixCls}-inner`} onTouchStart={this.handleTouchStart}
 //               onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
 //               {pageStr}
 //            </ul>
	//     )
	// }
	// renderDecoration=()=>{
 //        const decorationStr=arr.map((item,index)=>{
 //            const classNameStr=this.curPageIdx==index ? `${prefixCls}-selected` : `${prefixCls}-dec`;
 //        	return <li key={item.id} ref={el=>this[`decoration-${index}`]=el} className={classNameStr}></li>
 //        })
 //        return (
 //           <ul className={`${prefixCls}-decorate`}>
 //              {
 //              	decorationStr
 //              }
 //           </ul>
 //        )
	// }
	render(){
		const {style,text}=this.props;
		return (
          <div style={style}>
             <Answer str={text} style={{lineHeight:'23px',padding:'8px 8px 12px 16px'}}></Answer>
             <div className={`${prefixCls}-wrapper`} ref={el=>this.wrappr=el}>
              
             </div>
          </div>

		)
	}
}
SlideList.defaultProps={

}
SlideList.propTypes={
    onItemClick:PropTypes.func.isRequired,
    onPageChange:PropTypes.func.isRequired,
}
export default SlideList;