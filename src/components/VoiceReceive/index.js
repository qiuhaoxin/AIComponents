/*
*  description:用户声音收集
*  author:haoxin_qiu
*  createTime:2018-09-15
*/

import React,{Component} from 'react';
import './index.less';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import {fromJS,is} from 'immutable';

const prefixCls="ai-vr";
class VoiceReceive extends Component{
	constructor(props){
		super(props);
	}
	renderFooter=()=>{

	}
	shouldComponentUpdate(nextProps,nextState){
       return !is(fromJS(nextProps),fromJS(this.props)) || !is(fromJS(nextState),fromJS(this.state));
	}
	hanldeBtnClick=(e,key)=>{
		console.log("key is "+key);
		const {onCancelClick,onOkClick}=this.props;
		switch(key){
			case 'noHelp':
                onCancelClick && onCancelClick();
			break;
			case 'help':
                onOkClick && onOkClick();
			break;
			default:

			break;
		}
	}
	renderContent=()=>{
		const {data}=this.props;
        
		return (
           <div className={`${prefixCls}-content`}>
                <div className={`${prefixCls}-title`}>
                   {data.title}
                </div>
                <div className={`${prefixCls}-footer`}>
                    {
                    	data.btns && data.btns.length>0 ? 
                    	this.renderFooter() : 
                    	<div>
                            <span onClick={(e)=>this.hanldeBtnClick(e,'noHelp')} className={`${prefixCls}-btn-left ${prefixCls}-btn`}>
                                没帮到我
                            </span>
                            <span onClick={(e)=>this.hanldeBtnClick(e,'help')} className={`${prefixCls}-btn-right ${prefixCls}-btn`}>
                                 很好
                            </span>
                    	</div>
                    }
                </div>
           </div>
		)
	}
	render(){
		console.log("render in VoiceReceive");
		const {className,style}=this.props;
		const classNames=ClassNames({
			[`${className}`]:!!className,
		},`${prefixCls}-wrapper`);
		const {data}=this.props;
		return (
          <div className={classNames}>
              {
              	 data && data.desc ? 
              	 <div className={`${prefixCls}-desc`}>{data.desc}</div> : null
              }
              {
              	this.renderContent()
              }
          </div>
		)
	}
}
VoiceReceive.defaultProps={
    onCancelClick:null,
    onOkClick:null,
}
VoiceReceive.propTypes={
	onCancelClick:PropTypes.func,
	onOkClick:PropTypes.func,
}
export default VoiceReceive;