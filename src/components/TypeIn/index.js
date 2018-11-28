/*
*  descrition:常规录入卡片
*  author:haoxin_qiu
*  createtime:2018-09-15
*/
import React,{Component} from 'react';
import './index.less?v=1.0';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import {fromJS,is} from 'immutable';
import Circle from './circle';

import successImg from '../../images/Success_icon@2x.png';//提交成功
import sealImg from '../../images/seal_icon@2x.png';//已提交的戳
import errorImg from '../../images/error_icon@2x.png';//有误
import SuperComponent from '../SuperComponent';
import Button from '../Button';
const DIALOG_TITLE="出差事由";
const prefixCls='ai-ti';
class TypeIn extends SuperComponent{
	constructor(props){
		super(props);
	}
  shouldComponentUpdate(nextProps,nextState){
    return !is(fromJS(nextProps),fromJS(this.props));
  }
  state={
    showBody:true,
    showMasker:false,
  }
  componentWillReceiveProps(nextProps){
     const _this=this;
     if(nextProps.loaded){
        if(!this.Circle){
          this.createCircle();
        }
     }
     if(nextProps.stopAnimation){
        this.Circle.stopAnimate();
     }
     if(nextProps.showBody){
        this.setState({
          showBody:nextProps.showBody,
        })
     }
  }
  createCircle=()=>{
    const _this=this;
    if(!this.Circle){
        setTimeout(function(){
          _this.Circle=new Circle(_this.circleWrapper,{
              radius:44,
              style:{
                background:'#203D5C',
              },
              startAngle:- Math.PI * 2 / 8,
              endAngle:Math.PI * 2 / 4 * 3,
              beginAngle:Math.PI,
              beginFrequency:Math.PI * 2 / 100,
              endFrequency:Math.PI * 2 / 50,
          });
        },150)
    }
  }
  componentDidMount(){
     
  }
  getCardHeight=()=>{
      if(this.wrapper){
        return this.wrapper.clientHeight;
      }
      return 0;
  }
  renderFooter=()=>{
    	const {footer,onEdit,onSubmit,onEditStr,onSubmitStr}=this.props;
    	if(!footer){
    		if(onEdit && !onSubmit){
            return (<div className={Styles.footer}><div>{onEditStr}</div></div>)
    		}else if(onEdit && onSubmit){
    		   const style={width:'50%',boxSizing:'border-box'};
               return (<div className={`${prefixCls}-footer`}>
                <Button btnStr={onEditStr} style={{backgroundColor:'#fff',border:'1px solid #E5E5E5',color:'#333'}} onClick={(e,text)=>onEdit(e,text)}></Button>
                <Button btnStr={onSubmitStr} style={{backgroundColor:'#4598F0',marginLeft:12}} onClick={(e,text)=>onSubmit(e,text)}></Button>
               	</div>)
    		}else if(!onEdit && onSubmit){
    			return <div className={`${prefixCls}-footer`}><Button btnStr={onSubmitStr} style={{backgroundColor:'#4598F0'}} onClick={(e,text)=>onSubmit(e,text)}></Button></div>
    		}
    	}else if(footer){
            return <div className={`${prefixCls}-footer`}>{footer}</div>
    	}else{
    		return null;
    	}
  }
	render(){
		const {style,className,title,visible,content,children,say,kdIntention,imgPath,finishImg,isFinished,showBody,showMasker,status}=this.props;
    if(showMasker)this.createCircle();
		const wrapperCls=`${prefixCls}-dialog`;
		const ClassName=ClassNames({
            [`${className}`]:!!className,
		},`${prefixCls}-wrapper`);
		const wrapperStyle= style ? Object.assign(style,{
			display:visible ? 'flex' : 'none',
		}) : {
			display:visible ? 'flex' : 'none',
		}
		return (
          <div className={`${ClassName}`}>
            {
                say ? <div className={`${prefixCls}-say`}><img style={{display:status ? 'inline-flex' : 'none'}} src={status=='success' ? successImg : errorImg}/><span>{say}</span></div> : null
            }
            {
               showBody==false ? null 
               :<div className={`${wrapperCls}`} style={wrapperStyle} ref={el=>this.wrapper=el}>
                  <img className={`${prefixCls}-submit`} style={{display:status=='success' ? 'inline-flex' : 'none'}} src={sealImg}/>
	                <div className={`${prefixCls}-inner`}>
	                   <div className={`${prefixCls}-header ${title!=DIALOG_TITLE ? 'title_fill' : ''}`}>
	                        <img src={imgPath}/><span style={{marginLeft:8}}>{title}</span>
	                   </div>
	                   <div className={`${prefixCls}-content`}>
	                        {typeof content=='function' ? content() : content}
	                   </div>
	                   {this.renderFooter()}
	                </div>
                  <div className={`${prefixCls}-masker`} style={{visibility:showMasker ? 'visible' : 'hidden'}}>
                      <div className={`${prefixCls}-circle`}>
                         <div ref={el=>this.circleWrapper=el}>

                         </div>
                      </div>
                      <div className={`${prefixCls}-tip`}>
                           提交中...
                      </div>
                  </div>
                </div> 
            }

          </div>
		)
	}
}
TypeIn.propTypes={
   title:PropTypes.string,
   visible:PropTypes.bool,
   content:PropTypes.oneOfType([PropTypes.element,PropTypes.string,PropTypes.func]),
   onEditStr:PropTypes.string,
   onSubmitStr:PropTypes.string,
   showMasker:PropTypes.bool,//是否显示卡片上的遮罩层
   imgPath:PropTypes.string,//标题上的图标
   status:PropTypes.string,//desc 的图标  'success':提交成功，'error':'词槽填充失败','':正常
}
TypeIn.defaultProps={
   title:'DialogHeader',
   footer:null,
   visible:true,
   onEditStr:'修改',
   onSubmitStr:'提交',
   status:'',
}
export default TypeIn;

/*

*<span className={`${prefixCls}-right`} 
          onTouchStart={this.handleTouchStart} onTouchEnd={(e)=>this.handleTouchEnd(e,onSubmit.call(this))}>{onSubmitStr}</span>
*/


