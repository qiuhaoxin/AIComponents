import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import IScroll from './iscroll';

const iScrollEvents=[
   'beforeScrollStart','scrollCancel','scrollStart',
   'scroll','scrollEnd','flick'
];

class Iscroll extends Component{
	constructor(props){
		super(props);
		this.state={
			isScrolling:false,
		}

	}
	componentDidMount(){
       this.initIscroll();
	}
	componentWillUnmount(){
		this.destoryIscroll();
	}
	//初始化
	initIscroll=()=>{
	   // const {iScroll,options}=this.props;
	    const options={};
	    const iScrollInstance=new IScroll(ReactDOM.findDOMNode(this),options);
	    this.iScrollInstance=iScrollInstance;
	}
	//销毁
	destoryIscroll=()=>{
		if(this.iScrollInstance){
			this.iScrollInstance.destory();
			this.iScrollInstance=null;
		}
	}
	getIscroll=()=>{
        return this.iScrollInstance;
	}
    bindIscrollEvents=()=>{
    	const _this=this;
    	const iScrollInstance=this.getIscroll();
    	const eventLen=iScrollEvents.length;

    	iScrollEvents.forEach(item=>{
    		let event=_this.props[item] || _this[item];
    		if(event){
    			event=event.bind(_this);
    			iScrollInstance.on(item,(...args)=>{
    				event(iScrollInstance,...args);
    			})
    		}
    	})

    	this.refresh(iScrollInstance);

    	const originRefresh=iScrollInstance.refresh;
    	iScrollInstance.refresh=()=>{
    		originRefresh.apply(iScrollInstance);
    		_this.refresh(iScrollInstance);
    	}
    }
    refresh=(iScroll)=>{

    }
    scrollBy=(x,y,time,easing)=>{
    	this.iScrollInstance.scrollBy(x,y,time,easing);
    }
	render(){
		return (
          <div className={'iscroll-wrapper'}>
             {this.props.children}
          </div>
		)
	}
}
Iscroll.propTypes={

}
Iscroll.defaultProps={

}
export default Iscroll;