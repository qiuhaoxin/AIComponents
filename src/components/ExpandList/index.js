/*
* description:选择性列表 可展开
* author:haoxin_qiu
* creattime:2018-09-14
*/
import React,{Component} from 'react';
import ClassNames from 'classnames';
import './index.less';
import PropTypes from 'prop-types';

const prefixCls="ai-el";
class ExpandList extends Component{
	constructor(props){
		super(props);
    this.state={
      list:props.data && props.data.list.filter((item,index)=>index<6),
      showExpandBtn:(props.data && props.data.list && props.data.list.length>6),
    }
	}
  hanldeClick=(e,item)=>{
     const {onItemClick}=this.props;
     onItemClick && onItemClick(item);
  }
  handleExpand=()=>{
    const {data}=this.props;
    this.setState({
      list:data && data.list,
      showExpandBtn:false
    })
  }
	renderList=()=>{
        const {data}=this.props;
        const {list,showExpandBtn}=this.state;
        const listStr=list.map((item,index)=>{
        	return <li key={`${item.value ? item.value : index}`} onClick={e=>this.hanldeClick(e,item)}>
               {item.desc}
        	</li>
        })
        return (
          <div className={`${prefixCls}-content`}>
            <ul className={`${prefixCls}-list`} ref={(el)=>this.listEl=el}>
               {listStr}
            </ul>
            {
              showExpandBtn ? <div className={`${prefixCls}-expand`} onClick={this.handleExpand}>展开全部</div> : null 
            }
          </div>  
        )
	}
	render(){
       const {className,style,data}=this.props;
       const ClassName=ClassNames({
           [`${className}`]:className,
       }
       ,`${prefixCls}-wrapper`);
       return (
          <div className={ClassName}>
              {data.desc ? <div className={`${prefixCls}-desc`}></div> : null}
              {
              	this.renderList()
              }
          </div>
       )
	}

}
ExpandList.propTypes={
   data:PropTypes.object.isRequired,
   style:PropTypes.object,
   className:PropTypes.string,
}
ExpandList.defaultTyeps={
   data:null
}
export default ExpandList;
