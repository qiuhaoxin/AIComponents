import React,{Component} from 'react';
import VoiceLoading from '../../../src/components/VoiceLoading';
import {startSpeech,stopSpeech} from '../../utils/yzj.js'

class VoiceLoadingPage extends Component{
	constructor(props){
		super(props);
		this.data={
			desc:'要是没有问题了，小K就退下啦',
			title:'小K帮到您了吗',
			btns:[

			],

		}
	}
	handleCancelClick=()=>{
        console.log("onCancelClick");
	}
	handleOkClick=()=>{
        console.log("onOkClick");
	}
    handleWaveClick=()=>{
       console.log("waveClick!");
    }
    handleCircleClick=()=>{
       // console.log("circleClick!");
       // const _this=this;
       //  setInterval(function(){
       //    _this.wrapper.setVoice(Math.random());
       //  },100)
       this.speek(this.dealSpeakCB);
    }
    speek=()=>{
       startSpeech(this.dealSpeakCB);
    }
    dealSpeakCB=(result)=>{  
       const _this=this;
       const {dispatch}=this.props;
       const data=result.data;
       //console.log("datqa is "+JSON.stringify(data));
                //隐藏图片按钮，显示声波图
               //isSupportYZJApi && this.changeSpeakStyle('none','block');
               try{
                   const status=data.status;
                   switch(status){
                        case 1://录音开始

                        break;
                        case 2://录音结束
                           _this.stopSpeaking();
                           _this.wrapper.setVoice(0);
                           break;
                        case 3://音量变化 
                          const percent=data.percent;
                          if(_this.wrapper){
                              _this.timeoutId=setTimeout(function(){
                                  let t=percent + Math.random() * 0.3;
                                  //console.log("t is "+t);
                                  //if(t < 0.1){
                                    //t*=10;
                                  //}
                                  //console.log("after t is "+t);
                                  //let random=Math.random();
                                  console.log("random is "+t);
                                  _this.wrapper.setVoice(t);//setVoice
                              },100)
                          }
                        break;
                        case 4://识别出错
                            const errorCode=data.errorCode; //只能是1
                            const errorMessage=data.errorMessage;
                            _this.stopSpeaking();
                        break;
                        case 5://识别结果
                            const result=data.result;

                            const isLast=data.isLast;//语音识别是否结束
                              _this.stopSpeaking(function(){
                                 const tempResult={success:'true',data:{text:result}};
                                 alert("result is "+JSON.stringify(tempResult));
                                 //_this.handleSpeak(tempResult);
                              });
                        break;
                    }
                        
                }catch(e){
                  alert("exception is "+e);
                }
    }
    stopSpeaking=()=>{
       stopSpeech();
    }
    handleLoading=()=>{

        this.wrapper.showLoading();
    }
    handleShowWaiting=()=>{
    	console.log("showWaiting");
    	this.wrapper.showWaiting();
    }
    handleSetWeight=()=>{
       this.wrapper.setVoice();
    }
	render(){
        return (
           <div>
               <VoiceLoading onWaveClick={this.handleWaveClick} height={117} ref={el=>this.wrapper=el} changeL={1} onCircleClick={this.handleCircleClick}>

               </VoiceLoading>
               <div onClick={this.handleLoading}>
                   showLoading
               </div>
               <div onClick={this.handleShowWaiting}>
                  showWaiting
               </div>
               <div onClick={this.handleSetWeight}>
                  setWeight
               </div>
           </div>
        )
	}
}
export default VoiceLoadingPage;
