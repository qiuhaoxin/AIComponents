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
import Button from '../Button';
// import {Answer} from '../Answer';
const prefixCls="ai-rc";
class RecommendCard extends Component{
	constructor(props){
		super(props);
	}
  shouldComponentUpdate(nextProps,nextState){
      return !is(fromJS(nextProps),fromJS(this.props)) || !is(fromJS(nextState),fromJS(this.state));
  }
	handleClickBtn=(e,text)=>{
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
                        {item.ftips && item.ftips[0]}
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
                <Button btnStr={btnName} style={{backgroundColor:'#4598F0',marginRight:16}} onClick={(e,text)=>this.handleClickBtn(e,text)}>

                </Button>
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
                  // desc ? <Answer style={{marginBottom:8,lineHeight:'23px',marginTop:30,padding:'8px 12px 8px 16px'}} str={desc}></Answer> : null
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
    desc:'Hi~我是小K,下面是我学会的技能,快让我表演给你看吧',
}
export default RecommendCard;

/*
*               <span className={`${prefixCls}-btn`} onClick={(e)=>this.handleClickBtn(e)}>
                    {btnName}
               </span>

               <div className={`${prefixCls}-description`}>{desc}</div>
*/