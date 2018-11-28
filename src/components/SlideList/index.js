/**
 *   左右滑动列表
 *   haoxin_qiu 
 */

import React from 'react';
import SuperComponent from '../SuperComponent';
import './index.less';

const prefixCls="ai-sl";
const arr=[1,2,3,4,5,6];
class SlideList extends SuperComponent{
	constructor(props){
       super(props);
	}
	handleTouchMove=(e)=>{
       const point=e.touches ? e.touches[0] : e;
       const pageX=point.pageX,pageY=point.pageY;
       console.log("pagex is "+pageX+" and pageY is "+pageY);
	}
	handleTouchEnd=()=>{

	}
	renderPages=()=>{
		const pageStr=arr.map((item,index)=>{
			const style={transform:`translate3d(${index!=0 ? -315 : 0}px,0,0)`};
			return <li key={item} style={style}>{item}</li>
		});
	    return (
            <ul className={`${prefixCls}-inner`} onTouchStart={this.handleTouchStart}
               onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
               {pageStr}
            </ul>
	    )
	}
	render(){
		const {style}=this.props;

		return (
           <div className={`${prefixCls}-wrapper`} style={style}>
               {this.renderPages()}
           </div>
		)
	}
}
SlideList.defaultProps={

}
SlideList.propTypes={

}
export default SlideList;