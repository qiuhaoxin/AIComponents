/**
 *  Voice Loading 
 */
 

import React,{Component} from 'react';
import VoiceLoadingComponent from './voiceLoading.js';
import {circleArr,lineArr} from './data.js';
import './index.less';
const prefixCls="ai-vl";
class VoiceLoading extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		const {onWaveClick,onCircleClick,changeL,height,width}=this.props;
        const _this=this;
        setTimeout(function(){
            _this.voiceLoading=new VoiceLoadingComponent(_this.wrapper,{
                circleArr,lineArr,changeL,height,width
            });
            //绑定正在监听的回调
            _this.voiceLoading.on('waveClick',function(){
                 console.log("zhixing!"+onWaveClick);
                 onWaveClick && onWaveClick();
            })
            _this.voiceLoading.on('circleClick',function(){
                 onCircleClick && onCircleClick();
            })
        },200)

	}
    showLoading=()=>{
    	if(this.voiceLoading){
    		this.voiceLoading.showLoading();
    	}
    }
    showWaiting=()=>{
        if(this.voiceLoading){
            this.voiceLoading.showWaiting();
        }
    }
    setVoice=(voice)=>{
        if(this.voiceLoading){
            this.voiceLoading.setWeight(voice);
        }
    }
	render(){
		return (
           <div ref={el=>this.wrapper=el} className={`${prefixCls}-wrapper`}>

           </div>
		)
	}
}

export default VoiceLoading;