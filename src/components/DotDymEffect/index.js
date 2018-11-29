import React, {Component} from 'react';
import './index.less';
 import ReactBodymovin from 'react-bodymovin'
import _3dot from "./_3dot.json";
import {Answer} from "../Answer";

class DotDymEffect extends Component {
    constructor(props) {
        super()
    }

    render() {
        const dotDymEffect = {
            loop: true,
            autoplay: true,
            prerender: true,
            animationData: _3dot
        }

        let r = <ReactBodymovin options={dotDymEffect}/>

        return (
            <div className={'content'}>
                <Answer style={{height: '12px', width: '36px', paddingTop: '14px', paddingBottom: '14px'}} str={r}/>
            </div>
        )
    }
}

export default DotDymEffect;