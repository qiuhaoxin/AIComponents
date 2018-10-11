/*
*  description:推荐性卡片
*  author:haoxin_qiu
*  createtime:2018-9-14
*/
import React,{Component} from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import './index.less';
import {fromJS,is} from 'immutable';

const prefixCls="ai-rc";
class RecommendCard extends Component{
	constructor(props){
		super(props);
	}
  shouldComponentUpdate(nextProps,nextState){
      return !is(fromJS(nextProps),fromJS(this.props)) || !is(fromJS(nextState),fromJS(this.state));
  }
	handleClickBtn=(e)=>{
       const {onBtnClick}=this.props;

       onBtnClick && onBtnClick();
	}
	handleItemClick=(e,item)=>{
		const {onItemClick}=this.props;
		delete item.ficonpath;
        onItemClick && onItemClick(item);
	}
    renderAPPList=()=>{
    	const {data}=this.props;
    	const appListClass=ClassNames(`${prefixCls}-list`);
    	const appListStr=data.map((item,index)=>{
    		return <li key={item.id || item.fid || index} onClick={(e)=>this.handleItemClick(e,item)}>
                <div className={`${prefixCls}-list-left`}>
                    <img src={item.ficonpath}/>
                </div>
                <div className={`${prefixCls}-list-right`}>
                    <div className={`${prefixCls}-name`}>
                        {item.ftitle}
                    </div>
                    <div className={`${prefixCls}-desc`}>
                        {item.ftips}
                    </div>
                </div>
    		</li>
    	})
    	return (
           <ul className={appListClass}>
                {appListStr}
           </ul>
    	)
    }

    renderFooter=()=>{
    	const {btnName}=this.props;
        return (
           <div className={`${prefixCls}-footer`}>
               <span className={`${prefixCls}-btn`} onClick={(e)=>this.handleClickBtn(e)}>
                    {btnName}
               </span>
           </div>
        )
    }
	render(){
    console.log("RecommendCard render!");
		const {className,style,desc}=this.props;
		const classNames=ClassNames({
			[`${className}`]:className,
		},`${prefixCls}-wrapper`)
		return (
           <div style={style} className={classNames}>
               {
                  desc ? <div className={`${prefixCls}-description`}>{desc}</div> : null
               }
               <div className={`${prefixCls}-box`}>
                 {this.renderAPPList()}
                 {this.renderFooter()}
               </div>
           </div>
		)
	}
}
RecommendCard.propTypes={
	className:PropTypes.string,
	style:PropTypes.object,
    data:PropTypes.array.isRequired,
    onBtnClick:PropTypes.func,
    onItemClick:PropTypes.func,
    btnName:PropTypes.string,
}
RecommendCard.defaultProps={
    btnName:'换一换',
    onBtnClick:null,
    onItemClick:null,
}
export default RecommendCard;