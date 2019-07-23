/**
 * adaptive cards 客户端
 */

import React,{Component} from 'react';
import './index.less';
import PropTypes from 'prop-types';
import * as AdaptiveCards from "adaptivecards";
import "adaptivecards/lib/adaptivecards-default.css";

class AdaptiveCard extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
	   this.createAdaptiveCard();
       this.renderAdaptiveCards();
	}
	componentWillReceiveProps(){
		this.renderAdaptiveCards();
	}
	createAdaptiveCard=()=>{
		const {onExecuteAction,hostConfig}=this.props;
		if(!this.adaptiveCard){
			this.adaptiveCard=new AdaptiveCards.AdaptiveCard();
			if(hostConfig){
				this.adaptiveCard.hostConfig=new AdaptiveCards.HostConfig(hostConfig)
			}
			if(onExecuteAction){
				this.adaptiveCard.onExecuteAction=function(action){
					onExecuteAction(action);
				}
			}

		}
	}
	renderAdaptiveCards=()=>{
		const {cardData,onExecuteAction,hostConfig}=this.props;
		// Create an AdaptiveCard instance
		// 
		//this.adaptiveCard = new AdaptiveCards.AdaptiveCard();

		// Set its hostConfig property unless you want to use the default Host Config
		// Host Config defines the style and behavior of a card
		// adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
		//     fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
		//     // More host config options
		// });
		// if(hostConfig){
		// 	adaptiveCard.hostConfig=new AdaptiveCards.HostConfig(hostConfig)
		// }

		// Set the adaptive card's event handlers. onExecuteAction is invoked
		// whenever an action is clicked in the card
		// if(onExecuteAction){
		// 	adaptiveCard.onExecuteAction=function(action){
		// 		onExecuteAction(action);
		// 	}
		// }
		//adaptiveCard.onExecuteAction = function(action) { alert("Ow!"); }

		// Parse the card payload
		this.adaptiveCard.parse(cardData);

		// Render the card to an HTML element:
		this.adaptiveCard.render(this.wrapper);
	}
	render(){
       return <div ref={el=>this.wrapper=el} className={'wrapper'}>

       </div>
	}
}
AdaptiveCard.defaultProps={
    hostConfig:{
    	fontFamily: "Segoe UI, Helvetica Neue, sans-serif",
    },
    onExecuteAction:null,
    cardData:null,
}
AdaptiveCard.propTypes={
   hostConfig:PropTypes.obj,
   onExecuteAction:PropTypes.func,
   cardData:PropTypes.obj.isRequired,
}
export default AdaptiveCard;