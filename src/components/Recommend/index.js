/*
*  description:推荐性卡片
*  author:haoxin_qiu
*  createtime:2018-9-14
*/
import React,{Component} from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import './index.less';

const prefixCls="ai-rc";
class RecommendCard extends Component{
	constructor(props){
		super(props);
	}
	handleClickBtn=(e)=>{
       const {onBtnClick}=this.props;

       onBtnClick && onBtnClick();
	}
	handleItemClick=(e,item)=>{
		const {onItemClick}=this.props;
		delete item.imagePath;
        onItemClick && onItemClick(item);
	}
    renderAPPList=()=>{
    	const {data}=this.props;
    	const appListClass=ClassNames(`${prefixCls}-list`);
    	const appListStr=data.map(item=>{
    		return <li key={item.id} onClick={(e)=>this.handleItemClick(e,item)}>
                <div className={`${prefixCls}-list-left`}>
                    <img src={item.imagePath}/>
                </div>
                <div className={`${prefixCls}-list-right`}>
                    <div>
                        {item.name}
                    </div>
                    <div>
                        {item.desc}
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
		const {className,style}=this.props;
		const classNames=ClassNames({
			[`${className}`]:className,
		},`${prefixCls}-wrapper`)
		return (
           <div style={style} className={classNames}>
               {this.renderAPPList()}
               {this.renderFooter()}
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