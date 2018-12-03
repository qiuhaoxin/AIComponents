/*
*  文本编辑框
*/
import React,{Component} from 'react';
import './index.less';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SuperComponent from '../SuperComponent';
import {trimSpecial,isEmpty} from '../../utils';
import editIcon from '../../images/edit.png'

const prefixCls='ai-input';

class Input extends SuperComponent{
	constructor(props){
		super(props);
		this.oldValue='';
	}
	state={
		inputVal:'',
        readOnly:true,
	}
	componentWillReceiveProps(nextProps){

	}
	componentDidMount(){
        const {text}=this.props;
        this.setState({
        	inputVal:text,
        },()=>{

        })
	}
	componentWillUnmount(){

	}
	handleInputChange=(e)=>{
		const val=e.target.value;
		this.setState({
			inputVal:val,
		})
	}
	docEvent=(e)=>{
		const _this=this;
		let {readOnly,inputVal}=this.state;
		const {afterEnter}=this.props;
		const target=e.target;
		let parent=target.parentNode;
        parent=parent.parentNode ? parent.parentNode : parent;
        if(!readOnly && target!=this.wrapper && parent!=this.wrapper){
        	this.setState({
        		readOnly:true,
        	},()=>{
        		inputVal=trimSpecial(inputVal);
				_this.input && _this.input.blur();
				if(String(_this.oldValue).trim()!==String(inputVal).trim()){
				    afterEnter && afterEnter(inputVal,_this.oldValue);

				    if (inputVal == undefined || inputVal == ''){
				    	console.log('修改值不能为空!-滑动')
				    	this.setState({
                            inputVal:_this.oldValue
                        })
					}

				}
        		_this.unRegisterBodyListener();
        	})
        }
	}
	registerBodyListener=()=>{
		document.documentElement.addEventListener('touchstart',this.docEvent,false);
	}
	unRegisterBodyListener=()=>{
		document.documentElement.removeEventListener('touchstart',this.docEvent,false);
	}

	handleKeyUp=(e)=>{
		const _this=this;
		const {afterEnter}=this.props;
		const keyCode=e.keyCode;
		if(keyCode==13){
			let {inputVal}=this.state;
			this.setState({
				readOnly:true,
			},()=>{
				inputVal=trimSpecial(inputVal);
				_this.input && _this.input.blur();
				if(String(_this.oldValue).trim()!==String(inputVal).trim()){
				    afterEnter && afterEnter(inputVal,_this.oldValue);

                    if (inputVal == undefined || inputVal == ''){
                        console.log('修改值不能为空!-回车')
                        this.setState({
                            inputVal:_this.oldValue
                        })
                    }

				}
				_this.unRegisterBodyListener();
			})
		}
	}
	handleClick=()=>{
		const _this=this;
		const {inputVal}=this.state;
		this.divHeight=this.divEl.clientHeight;
		this.registerBodyListener();
		this.setState({
			readOnly:false,
		},()=>{
           _this.input && _this.input.focus();
           if(_this.input){
           	  _this.input.scrollTop=0;
           }
           _this.oldValue=String(inputVal);
		})
	}
	getHeight=()=>{
		if(this.wrapper){
			return this.wrapper.clientHeight;
		}
		return 0;
	}
	handleFocus=(e)=>{
        const {focusEvent}=this.props;
        this.input.select()
        focusEvent && focusEvent();
	}

	renderCanEditInput=()=>{

        const {inputVal,readOnly}=this.state;

        return <div className={`${prefixCls}-input`}
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={(e) => this.handleTouchEnd(e, this.handleClick)}
                    style={{display: readOnly ? 'block' : 'none'}}
                    ref={el => this.divEl = el}>
            {inputVal}
            <span className={`${prefixCls}-tip`} style={{visibility: readOnly ? 'visible' : 'hidden'}}>
							<span>
 								<img src={editIcon}/>
                   	 		</span>
               			</span>
        </div>
    }

    renderCantEditInput=()=>{
        const {inputVal,readOnly}=this.state;

        return <div className={`${prefixCls}-input`}
                    style={{display: readOnly ? 'block' : 'none'}}
                    ref={el => this.divEl = el}>
            {inputVal}
        </div>
    }

	render(){
		const {tip,style,className,canEdit}=this.props;
 		const {inputVal,readOnly}=this.state;
		//const inputClass=readOnly ? `${prefixCls}-read` : `${prefixCls}-write`;className={inputClass}
		const showBorderClass=readOnly ? `${prefixCls}-hide` : `${prefixCls}-show`;
		return (
            <div className={`${prefixCls}-wrapper ${className}`} ref={el => this.wrapper = el} style={style}>
                <div className={`${prefixCls}-content ${showBorderClass}`}>

                    {canEdit ? this.renderCanEditInput() : this.renderCantEditInput()}

                    <textarea className={`${prefixCls}-edit-input`} style={{display: readOnly ? 'none' : 'block'}} ref={el => this.input = el} value={inputVal}
                              onFocus={this.handleFocus}
                               onChange={this.handleInputChange} onKeyUp={this.handleKeyUp}/>
                </div>
            </div>
        )
	}
}



Input.defaultProps={
	inputVal:'',
    tip:'edit',//提示语
	canEdit:true
}
Input.propTypes={
	inputVal:PropTypes.string.isRequired,
    tip:PropTypes.string,
	canEdit: PropTypes.bool
}

export default Input;
