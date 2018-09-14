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
	}
	renderList=()=>{
        const {data}=this.props;
        const listStr=data.map((item,index)=>{
        	return <li key={`${item.id ? item.id : index}`}>
               {item.name}
        	</li>
        })
        return (
            <ul>
               {listStr}
            </ul>
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
              {
              	this.renderList()
              }
          </div>
       )
	}

}
ExpandList.propTypes={
   data:PropTypes.array.isRequired,
   style:PropTypes.object,
   className:PropTypes.string,
}
ExpandList.defaultTyeps={
   data:null
}
export default ExpandList;
