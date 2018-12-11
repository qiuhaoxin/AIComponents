import React,{Component} from 'react';
import VoiceLoading from '../../../src/components/VoiceLoading';


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
       console.log("circleClick!");
               const _this=this;
        setInterval(function(){
          _this.wrapper.setVoice(Math.random());
        },120)
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
               <VoiceLoading onWaveClick={this.handleWaveClick} height={117} ref={el=>this.wrapper=el} changeL={1.4} onCircleClick={this.handleCircleClick}>

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
