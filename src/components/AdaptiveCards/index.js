/**
 * adaptive cards 客户端
 */

import React, { Component } from 'react';
import './index.less';
import PropTypes from 'prop-types';
import * as AdaptiveCards from "adaptivecards";
import { adaptiveCardConfig } from './hostConfig';
import Answer from '../Answer/index';
import CardFactory from './cardFactory';

class AdaptiveCard extends Component {
	constructor(props) {
		super(props);
		this.wrapper = [];
	}
	componentDidMount() {
		//this.createAdaptiveCard();
		//this.renderAdaptiveCards();
		const { cardData, onExecuteAction } = this.props;
		if (!this.cardFactory) {
			let options = {
				hostConfig: adaptiveCardConfig,
				cardData,
				onExecuteAction,
			}
			this.cardFactory = new CardFactory(this.container, AdaptiveCards, options);
		}
	}
	componentWillReceiveProps() {
		//this.renderAdaptiveCards();
	}
	createAdaptiveCard = () => {
		const { onExecuteAction } = this.props;
		if (!this.adaptiveCard) {
			this.adaptiveCard = new AdaptiveCards.AdaptiveCard();
			if (hostConfig) {
				this.adaptiveCard.hostConfig = new AdaptiveCards.HostConfig(adaptiveCardConfig)
			}
			if (onExecuteAction) {
				this.adaptiveCard.onExecuteAction = function (action) {
					onExecuteAction(action);
				}
			}

		}
	}
	renderAdaptiveCards = () => {
		const { cardData } = this.props;
		const _this = this;

		//const list = JSON.parse(cardData[0]);
		//console.log('cardData is ', JSON.stringify(list))
		if (this.wrapper && cardData) {
			// Parse the card payload
			//this.adaptiveCard.parse(list);
			// Render the card to an HTML element:
			//this.adaptiveCard.render(this.wrapper);
			cardData.forEach((item, index) => {
				let itemData = null;
				try {
					itemData = JSON.parse(item);
				} catch (e) {
					itemData = item;
				}
				_this.adaptiveCard.parse(itemData);
				_this.adaptiveCard.render(_this.wrapper[index]);
			})
		}

	}
	renderCardWrapper = () => {
		const { cardData } = this.props;
		const _this = this;
		return <ul className={'pages'}>
			{
				cardData.map((item, index) => <li key={index} className={'page'} ref={el => _this.wrapper[index] = el} >

				</li>)
			}
		</ul>
	}
	render() {
		const { title, style } = this.props;
		return <div className={'wrapper'} >
			{
				title ? <Answer str={title} /> : null
			}
			<div className={'pages'} style={style} ref={el => this.container = el}>

			</div>

		</div>

	}
}
AdaptiveCard.defaultProps = {
	onExecuteAction: null,
	cardData: null,
}
AdaptiveCard.propTypes = {
	onExecuteAction: PropTypes.func,
	cardData: PropTypes.obj.isRequired,
}
export default AdaptiveCard;

/**
 * 						{
				cardData ? this.renderCardWrapper() :
					null
			}
 */