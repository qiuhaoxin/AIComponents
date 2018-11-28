import React, {Component} from 'react';
import './index.less';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import {fromJS, is} from 'immutable';
import happyImg from './happy_icon@2x.png'
import sadImg from './sad_icon@2x.png'

const prefixCls = "ai-vr2";

class VoiceReceive2 extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(nextProps), fromJS(this.props)) || !is(fromJS(nextState), fromJS(this.state));
    }

    hanldeBtnClick = (e, key) => {
        console.log("key is " + key);
        const {onCancelClick, onOkClick} = this.props;
        switch (key) {
            case 'noHelp':
                onCancelClick && onCancelClick();
                break;
            case 'help':
                onOkClick && onOkClick();
                break;
            default:

                break;
        }
    }
    renderContent = () => {
        const {data} = this.props;

        return (
                <div className={`${prefixCls}-content`}>
                    <div>
                        <span onClick={(e) => this.hanldeBtnClick(e, 'noHelp')} className={` ${prefixCls}-btn`}>
                            <img src={happyImg}/> {'  '}帮到我了
                            </span>
                        <span onClick={(e) => this.hanldeBtnClick(e, 'help')} className={` ${prefixCls}-btn`}>
                             <img src={sadImg}/> {'  '}没帮到我
                            </span>
                    </div>
                </div>
        )
    }

    render() {
        console.log("render in VoiceReceive");
        const {className} = this.props;
        const classNames = ClassNames({
            [`${className}`]: !!className,
        }, `${prefixCls}-wrapper`);
        const {data} = this.props;
        return (
            <div className={classNames}>
                {
                    data && data.desc ?
                        <div className={`${prefixCls}-desc`}>{data.desc}</div> : null
                }
                {
                    this.renderContent()
                }
            </div>
        )
    }
}

VoiceReceive2.defaultProps = {
    onCancelClick: null,
    onOkClick: null,
}
VoiceReceive2.propTypes = {
    onCancelClick: PropTypes.func,
    onOkClick: PropTypes.func,
}
export default VoiceReceive2;