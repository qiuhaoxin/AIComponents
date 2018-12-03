import React, {Component} from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import './index.less';
import {fromJS, is} from 'immutable';



class SingleRecommendCard extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(nextProps), fromJS(this.props)) || !is(fromJS(nextState), fromJS(this.state));
    }

    preHandleAppMessage(appMessage) {

        appMessage =  JSON.parse(JSON.stringify(appMessage))
        // if (appMessage.length == 0){
        //     appMessage.push(' 当前意图没有配置提示语! ')
        // }

        while (appMessage.length < 3 && appMessage.length != 0) {
            appMessage.push('~')
        }

        for (let i = 0; i < appMessage.length; i++) {

            if (appMessage[i].length > 18){
                appMessage[i] = appMessage[i].slice(0, 18) + "..."
            }

            if (appMessage[i] != '~') {
                appMessage[i] = `"${appMessage[i]}"`
            }
        }

        return appMessage.slice(0,3)
    }
    render() {
        const {className,bgImg, style, appTitle, appMessage} = this.props;


        let sampleList = this.preHandleAppMessage(appMessage);

        const outer_css = ClassNames(
            {
                [`${className}`]: className
            },
            ['ai-srcs-wrapper']
        )
        const imgPath="../../images/singleRecommandBg.png";
        return (
            <div style={{...style, backgroundImage: `url(${bgImg})`, backgroundSize: '80px 80px'}} className={outer_css}>
                <div className={['ai-srcs-title']}>
                    {appTitle}
                </div>

                <div className={['ai-srcs-list']} >
                    <ul>
                        {
                            sampleList.map((item) => <li key={item}>{item}</li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

SingleRecommendCard.propTypes = {
    appTitle:PropTypes.string,
    appMessage: PropTypes.array
}
SingleRecommendCard.defaultProps = {
    appMessage:null,
    appTitle:null
}
export default SingleRecommendCard;