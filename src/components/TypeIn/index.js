/*
*  descrition:常规录入卡片
*  author:haoxin_qiu
*  createtime:2018-09-15
*/
import React,{Component} from 'react';
import Styles from './index.less';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import {fromJS,is} from 'immutable';
import Circle from './circle';

const DIALOG_TITLE="出差事由";
const prefixCls='ai-ti';
class TypeIn extends Component{
	constructor(props){
		super(props);
	}
  shouldComponentUpdate(nextProps,nextState){
    return !is(fromJS(nextProps),fromJS(this.props));
  }
  componentWillReceiveProps(nextProps){

     if(nextProps.loaded){
        if(this.Circle){
          this.Circle.reDraw();
        }
     }
  }
  componentDidMount(){

      // this.Circle=new Circle(this.circleWrapper,{
      //     radius:44,
      //     style:{
      //       background:'#203D5C',
      //     },
      //     startAngle:- Math.PI * 2 / 8,
      //     endAngle:Math.PI * 2 / 4 * 3,
      //     beginAngle:Math.PI,
      //     beginFrequency:Math.PI * 2 / 100,
      //     endFrequency:Math.PI * 2 / 50,
      // });
  }
  renderFooter=()=>{
    	const {footer,onEdit,onSubmit,onEditStr,onSubmitStr}=this.props;
    	if(!footer){
    		if(onEdit && !onSubmit){
            return (<div className={Styles.footer}><div>{onEditStr}</div></div>)
    		}else if(onEdit && onSubmit){
    		   const style={width:'50%',boxSizing:'border-box'};
               return (<div className={`${prefixCls}-footer`}><span className={`${prefixCls}-left`} onClick={onEdit}>{onEditStr}</span>
               	<span className={`${prefixCls}-right`} onClick={onSubmit}>{onSubmitStr}</span></div>)
    		}else if(!onEdit && onSubmit){
    			return <div className={`${prefixCls}-footer`}> <span className={`${prefixCls}-right`} onClick={onSubmit}>{onSubmitStr}</span></div>
    		}
    	}else if(footer){
            return <div className={`${prefixCls}-footer`}>{footer}</div>
    	}else{
    		return null;
    	}
  }
	render(){
		const {style,className,title,visible,content,children,say,kdIntention,imgPath,showMasker,finishImg,isFinished}=this.props;
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
                say ? <div className={`${prefixCls}-say`}>{say}</div> : null
            }
            {
               kdIntention==null ? null 
               :<div className={`${wrapperCls}`} style={wrapperStyle}>
                  <img src={finishImg}/>
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
}
TypeIn.defaultProps={
   title:'DialogHeader',
   footer:null,
   visible:true,
   onEditStr:'修改',
   onSubmitStr:'提交',
}
export default TypeIn;


