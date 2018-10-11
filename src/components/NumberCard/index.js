/*
* description:数字卡片
* author:haoxin_qiu
* createtime:2018-09-14
*/

/*
*  {
	   title:'',
	   desc:'',
	   value:'',
	   detail:[{item:'',value:''},{item:'',value:''}]
   }
*/
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './index.less';
import {fromJS,is} from 'immutable';
const prefixCls="ai-nc";
class NumberCard extends Component{
	constructor(props){
		super(props);
	}
  shouldComponentUpdate(nextProps,nextState){
      return !is(fromJS(nextProps),fromJS(this.props)) || !is(fromJS(nextState),fromJS(this.state));
  }
	renderDetailOne=()=>{
	   const {data}=this.props;
       return (
         <div className={`${prefixCls}-content ${prefixCls}-row`}>
            <div className={`${prefixCls}-left`}>
               <div>
                  <div className={`${prefixCls}-content-title`}>
  		                {data.title}
  		            </div>
               </div>   
  		         <div className={`${prefixCls}-content-value`}>
  		            {data.value}
  		         </div>
            </div>
            {
                data.detail ? 
                <div className={`${prefixCls}-right`}>
                  <div className={`${prefixCls}-detail-value`}>
                     {data.detail[0].value}
                  </div>
                  <div className={`${prefixCls}-detail-item`}>
                     {data.detail[0].item}
                  </div>
                </div> : null
            }
         </div>
       )
    }
    renderDetailThanOne=()=>{
    	const {data}=this.props;
    	const detailList=data.detail.map((item,index)=><li key={'id' in item ? item['id'] : index}>
            <div className={`${prefixCls}-detail-value`}>
               {item.value}
            </div>
            <div className={`${prefixCls}-detail-item`}>{item.item}</div>
    	</li>)
        return (
        	<div className={`${prefixCls}-content ${prefixCls}-column`}>
	            <div className={`${prefixCls}-content-title`}>
	                {data.title}
	            </div>
	            <div className={`${prefixCls}-content-value`}>
	                {data.value}
	            </div>
	            <ul>
                    {detailList}
	            </ul>
            </div>
        )
    }
	render(){
    console.log("render is NumberCard");
		const {className,style,selfStr,data}=this.props;
		const classNames=ClassNames({
            [`${className}`]:className,
		}
		,`${prefixCls}-wrapper`)
		return (
           <div className={classNames} style={style}>
               <div>
                   {selfStr}
               </div>
               <div className={`${prefixCls}-desc`}>
                   {data.desc}
               </div>
               {data && data.detail && data.detail.length>1 ? this.renderDetailThanOne() : this.renderDetailOne()}
           </div>
		)
	}
}
NumberCard.propTypes={
    selfStr:PropTypes.string,

}
NumberCard.defaultProps={
	selfStr:'您好',//自定义行

}
export default NumberCard;

/*
		const {className,style,selfStr,data}=this.props;
		const classNames=ClassNames({
            [`${className}`]:className,
		}
		,`${prefixCls}-wrapper`)
		return (
           <div className={classNames} style={style}>
               <div>
                   {selfStr}
               </div>
               <div className={`${prefixCls}-desc`}>
                   {data.desc}
               </div>
               {data && data.detail && data.detail.lengt > 1 ? this.renderDetailThanOne() : this.renderDetailOne()}
           </div>
		)



		    renderDetailThanOne=()=>{
        return (
        	<div className={`${prefixCls}-content`}>
	            <div className={`${prefixCls}-content-title`}>
	                {data.title}
	            </div>
	            <div>
	                {data.value}
	            <div>
            </div>
        )

    }
    renderDetailOne=()=>{
       return (
         <div className={`${prefixCls}-content`}>

         </div>
       )
    }
*/

