import React, {Component} from 'react';
import './index.less';
import successImg from '../../images/image_success.png'
import StarRate from "../StarRate";
import SuperComponent from "../SuperComponent";

// import successImgGif from '../../images/image_success_gif.gif'

const prefixCls = 'ai-fb';

class Feedback extends  SuperComponent {
    constructor(props) {
        super()
    }

    state = {
        rate: 0,
        content: '',
        showMasker: false,
        submitStr: '提交',
        hasSubmit: false,
        showTips: false
    }


    updateRate = (value) => {
        this.setState({
            rate: value
        })
    }

    handleContentInput = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    /**
     * 评分与建议不能同时为空
     * @returns {boolean}
     */
    verifyParam = () => {
        const {rate, content} = this.state
        return !(rate == 0 && content == '');
    }

    handleSubmit = () => {
        if (this.state.hasSubmit) {
            return
        }

        if (this.verifyParam() == false) {
            this.handleShowTips();
            return
        }


        const {handleSubmitFun} = this.props;

        const submitData = {
            rate: this.state.rate,
            content: this.state.content
        }

        handleSubmitFun && handleSubmitFun(submitData)

        setTimeout(
            () => {
                this.setState({
                    showMasker: true,
                    hasSubmit: true
                }, () => {
                    setTimeout(
                        () => {
                            this.setState({
                                showMasker: false,
                                submitStr: '已提交'
                            })
                        },
                        2000
                    );
                })
            }, 500
        )
    }

    handleShowTips = () => {
        this.setState({
            showTips: true
        }, () => {
            setTimeout(
                () => {
                    this.setState({
                        showTips: false
                    })
                },
                2000
            );
        })
    }

    render() {

        const {showMasker, hasSubmit, submitStr, showTips} = this.state
        return (
            <div>

                <div style={{display: showTips ? 'block' : 'none'}}  className={`${prefixCls}-header`}>
                    您还未进行任何评价哟～
                </div>

                <div className={`${prefixCls}-rate-wrapper`}>
                    <div className={`${prefixCls}-rate-wrapper-center`}>
                        <StarRate
                            count={5}
                            onChange={(rate) => this.updateRate(rate)}
                            size={34}
                            value={this.state.rate}
                            edit={!hasSubmit}

                        />
                    </div>
                </div>

                <div className={`${prefixCls}-content-wrapper`}>
                    <div className={`${prefixCls}-content-wrapper-center`}>
                        <textarea disabled={hasSubmit} className={`${prefixCls}-content`} placeholder={'你的建议将让我变得更聪明～'} value={this.state.content} onChange={this.handleContentInput}/>
                    </div>
                </div>

                <div
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={(e)=>this.handleTouchEnd(e,this.handleSubmit.bind(this))}
                    className={`${prefixCls}-footer`}>
                    {submitStr}
                </div>

                <div className={`${prefixCls}-popWindow`} style={{display: showMasker ? 'block' : 'none'}}/>
                <div className={`${prefixCls}-popWindow-bg`} style={{display: showMasker ? 'block' : 'none'}}/>
                <div className={`${prefixCls}-maskLayer`} style={{display: showMasker ? 'block' : 'none'}}>
                    {/*<img src={successImgGif}/>*/}
                    <img src={successImg}/>
                    反馈成功
                </div>

            </div>
        )
    }
}

export default Feedback;
