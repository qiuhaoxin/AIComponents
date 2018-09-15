/*
*  description:用户声音收集
*  author:haoxin_qiu
*  createTime:2018-09-15
*/

import React,{Component} from 'react';
import './index.less';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

const prefixCls="ai-vr";
class VoiceReceive extends Component{
	constructor(props){
		super(props);
	}
	renderFooter=()=>{

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
                            <span className={`${prefixCls}-btn-left ${prefixCls}-btn`}>
                                没帮到我
                            </span>
                            <span className={`${prefixCls}-btn-right ${prefixCls}-btn`}>
                                 很好
                            </span>
                    	</div>
                    }
                </div>
           </div>
		)
	}
	render(){
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
export default VoiceReceive;