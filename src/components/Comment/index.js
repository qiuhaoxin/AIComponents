/*
*  评论组件
* author:haoxin_qiu
*/
import React,{Component} from 'react';
import SuperComponent from '../SuperComponent';
import './index.less';
import icon_bad_normal from '../../images/icon_bad_normal.png';
import icon_bad_selected from '../../images/icon_bad_selected.png';
import icon_good_normal from '../../images/icon_good_normal.png';
import icon_good_selected from '../../images/icon_good_selected.png';
import Button from '../Button';

const prefixCls="ai-comment";
class Comment extends SuperComponent{
	constructor(props){
		super(props);
	}
	state={
		showRow:0, //0：both 1：icon_good_selected 2：icon_bad_selected
	}
    handleGoodClick=()=>{
        const {onGoodClick}=this.props;
        this.setState({
        	showRow:1,
        },()=>{
           onGoodClick && onGoodClick();
        })
    }
    handleBadClick=()=>{
        const {onBadClick}=this.props;
        this.setState({
        	showRow:2,
        },()=>{
           onBadClick && onBadClick();
        })
    }
	render(){
		const {showRow}=this.state;
		const {onPositiveClick,onNegativeClick,goodStr,badStr}=this.props;
		return (
           <div className={`${prefixCls}-wrapper`}>
               <div className={`${prefixCls}-row`} style={{display:showRow==0 ? 'block' : 'none'}}>
                  <div onTouchStart={this.handleTouchStart}
                   onTouchMove={this.handleTouchMove} onTouchEnd={(e)=>this.handleTouchEnd(e,this.handleGoodClick.bind(this))}>
                     <img src={icon_good_normal}/><span>赞</span>
                  </div>
                  <div className={`${prefixCls}-row-right`} onTouchStart={this.handleTouchStart}
                   onTouchMove={this.handleTouchMove} onTouchEnd={(e)=>this.handleTouchEnd(e,this.handleBadClick.bind(this))}>
                     <img src={icon_bad_normal}/><span>踩</span>
                  </div>
               </div>
               <div className={`${prefixCls}-row-good`} style={{display:showRow==1 ? 'block' : 'none'}}>
                  <div className={`${prefixCls}-img`}>
                     <img src={icon_good_selected}/>
                  </div>
                  <div className={`${prefixCls}-text`}>
                    {goodStr}
                  </div>
               </div>
               <div className={`${prefixCls}-row-bad`} style={{display:showRow==2 ? 'block' : 'none'}}>
                  <div className={`${prefixCls}-img`}>
                     <img src={icon_bad_selected}/>
                  </div>
                  <div className={`${prefixCls}-text`}>
                     {badStr}
                  </div>
               </div>
           </div>
		)
	}
}
Comment.defaultProps={
    goodStr:'谢谢鼓励，还需要我做什么？',
    badStr:'感谢批评，还需要我做什么？'
}
Comment.propTypes={

}
export default Comment;

/*
                  <div style={{marginTop:8,display:'inline-flex'}}>
                     <div>
                        <Button onClick={onNegativeClick} btnStr={'不说了'} style={{borderRadius:18,fontSize:14,color:'#666',lineHeight:'14px',boxShadow: '0 2px 8px 0 #C3D3E4'}}></Button>
                     </div>
                     <div style={{marginLeft:20}}>
                        <Button onClick={onPositiveClick} btnStr={'提建议'} style={{borderRadius:18,fontSize:14,color:'#666',lineHeight:'14px',boxShadow: '0 2px 8px 0 #C3D3E4'}}></Button>
                     </div>

                  </div>
 */