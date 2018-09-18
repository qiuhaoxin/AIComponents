/*
*  description:iframe组件装载第三方url
*  author:haoxin_qiu
*  createtime:2018-09-14
*/

import React,{Component} from 'react';
import './index.less';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

const prefixCls='ai-frame';
class Frame extends Component{
	constructor(props){
		super(props);
	}
	render(){
	   const {className,style}=this.props;
	   const ClassName=ClassNames({
          [`${className}`]:!!className,
	   },`${prefixCls}-body`);
	   const {src}=this.props;
       return (
          <div className={`${prefixCls}-wrapper`}>
              <div className={`${prefixCls}-desc`}>

              </div>
              {
              	src ? <iframe frameBorder={0} className={ClassName} src={src}></iframe> : null
              }
          </div>
       )
	}
}
Frame.defaultProps={
    
}
Frame.propTypes={
   className:PropTypes.string,
   style:PropTypes.object,
}
export default Frame;