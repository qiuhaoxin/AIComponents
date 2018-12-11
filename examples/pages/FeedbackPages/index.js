import React, { Component } from 'react';
import './index.less';
import ReactStars from 'react-stars'
import successImg from '../../images/image_success.png'
import Feedback from "../../../src/components/Feedback";

const prefixCls = 'ai-fb';
class FeedbackPages extends Component {
    constructor(props) {
        super()
    }

    state = {
        rate: 0,
        content: '全都是建议，全都是建议～',
        showMasker: false,
        submitStr: '提交'
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

    handleSubmit = () => {
        if (this.state.submitStr == '已提交') {
            return
        }
        console.log("submit")
        const { handleSubmitFun } = this.props;

        const submitData = {
            rate: this.state.rate,
            content: this.state.content
        }

        handleSubmitFun && handleSubmitFun(submitData)

        setTimeout(
            () => {
                this.setState({
                    showMasker: true
                }, () => {
                    setTimeout(
                        () => {
                            this.setState({
                                showMasker: false,
                                submitStr: '已提交'
                            })
                        },
                        1000
                    );
                })
            }, 500
        )
    }

    render() {

        // const showMasker = this.state.showMasker;
        // const submitStr = this.state.submitStr
        // return (
        //     <div>
        //         <div className={`${prefixCls}-rate-wrapper`}>
        //             <div className={`${prefixCls}-rate-wrapper-center`}>
        //                 <ReactStars
        //                     count={5}
        //                     onChange={(rate) => this.updateRate(rate)}
        //                     size={34}
        //                     half={false}
        //                     value={this.state.rate}
        //                     color1={'#BBBBBB'}
        //                     color2={'#FFA834'} />
        //             </div>
        //         </div>
        //
        //         <div className={`${prefixCls}-content-wrapper`}>
        //             <div className={`${prefixCls}-content-wrapper-center`}>
        //                 <textarea className={`${prefixCls}-content`} placeholder={'你的建议将让我变得更聪明～'} value={this.state.content} onChange={this.handleContentInput} />
        //             </div>
        //         </div>
        //
        //         <div onClick={() => this.handleSubmit()} className={`${prefixCls}-footer`}>
        //             {submitStr}
        //         </div>
        //
        //         <div className={`${prefixCls}-popWindow`} style={{ display: showMasker ? 'block' : 'none' }}/>
        //         <div className={`${prefixCls}-popWindow-bg`} style={{ display: showMasker ? 'block' : 'none' }}/>
        //         <div className={`${prefixCls}-maskLayer`} style={{ display: showMasker ? 'block' : 'none' }}>
        //             <img src={successImg} />
        //             反馈成功
        //         </div>
        //
        //     </div>
           return  <div>
                <Feedback handleSubmitFun={(e)=>{console.log("e is : " + JSON.stringify(e))}}/>
            </div>

    }
}

export default FeedbackPages;
