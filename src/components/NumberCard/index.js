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
import {fromJS,is} from 'immutable';
import './index.less';

const prefixCls="ai-nc1";
class NumberCard extends Component{
	constructor(props){
		super(props);
	}
  shouldComponentUpdate(nextProps,nextState){
      return !is(fromJS(nextProps),fromJS(this.props)) || !is(fromJS(nextState),fromJS(this.state));
  }
    renderNumberDetail=()=>{
        const {data:{numeralDetail}}=this.props;
        let str="";
        if(numeralDetail && numeralDetail.length>1){
            return (
               <ul className={`${prefixCls}-numberalDetail-column`}>
                   {
                       numeralDetail.map((item,index)=><li key={item.id ? item.id : index}>
                          <div className={`${prefixCls}-numberalDetail-column-item`}>
                            {item.item}
                          </div>
                          <div className={`${prefixCls}-numberalDetail-column-value`}>
                            {item.value}
                          </div>
                       </li>)
                   }
               </ul>
            )
        }else if(numeralDetail.length==1){
            str=numeralDetail.map((item,index)=><li key={item.id ? item.id : index}>
                <div className={`${prefixCls}-numberalDetail-row-value`}>
                  {item.value}
                </div>
                <div className={`${prefixCls}-numberalDetail-row-item`}>
                  {item.item}
                </div>
            </li>)
            return (
              <ul className={`${prefixCls}-numberalDetail-row`}>
                  { 
                    str  
                  }
              </ul>
            )
        }
    }  
    renderRatioDetial=()=>{
        const {data:{ratioDetail}}=this.props;
        const str=ratioDetail.map((item,index)=><li key={'id' in item ? item['id'] : index}>
            <div className={`${prefixCls}-detail-value`}>
               {item.value}
            </div>
            <div className={`${prefixCls}-detail-item`}>{item.item}</div>
        </li>)
        return (
           <ul className={`${prefixCls}-ratioDetail`}>
              {str}
           </ul>
        )
    }
    renderOneRow=()=>{

    }
    renderTwoRow=()=>{
        const {data:{numeralDetail,ratioDetail,title}}=this.props;//
        return (
            <div className={`${prefixCls}-content ai-nc1-column`}>
                <div className={`${prefixCls}-content-title`}>
                    {title}
                </div>
                {
                  numeralDetail && numeralDetail.length > 0 ? this.renderNumberDetail() : null
                }

                {
                  ratioDetail && ratioDetail.length>0 ? this.renderRatioDetial() : null
                }
            </div>
        )
    }
	render(){
		const {className,style,selfStr,data}=this.props;
		const classNames=ClassNames({
            [`${className}`]:className,
		}
		,`${prefixCls}-wrapper`)
    const numeralDetail=data.numberalDetail;
    const ratioDetail=data.ratioDetail;
		return (
           <div className={classNames} style={style}>
               <div>
                   {selfStr}
               </div>
               <div className={`${prefixCls}-desc`}>
                  {data.desc}
               </div>
               {
                  numeralDetail && numeralDetail.length==1 && ratioDetail && ratioDetail.length==1 ? this.renderOneRow() : this.renderTwoRow()
               }
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

