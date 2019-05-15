/**
 * 表单填写类型卡片
 * 展示逻辑都放这这做
 */

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import './index.less';

const prefixCls="ai-binfocard";
class BillInfoCard extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){

	}
	componentWillReceiveProps(nextProps){

	}
	renderHeader=()=>{

	}
	renderBody=()=>{
        const {body}=this.props;
        return <ul className={}>

        </ul>
	}
	renderFooter=()=>{

	}
	render(){
		const {className,style}=this.props;

        return <div className={`${prefixCls}-wrapper`} style={style}>

            <div className={}>

            </div>
            <div className={'title'}>

            </div>
            <div className={'body'}>

            </div>
            <div className={'footer'}>

            </div>
        </div>
	}
}

BillInfoCard.propTypes={

}
BillInfoCard.defaultProps={

}


export default BillInfoCard;