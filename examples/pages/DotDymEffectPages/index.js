import React, {Component} from 'react';
import './index.less';

//import DotDymEffect from "../../../src/components/DotDymEffect";
import _3dot from "../../../src/components/DotDymEffect/_3dot.json";
import ReactBodymovin from "react-bodymovin";
import {Answer} from "../../../src/components/Answer";


class DotDymEffectPages extends Component {
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

export default DotDymEffectPages;

/*
                // <Answer style={{height: '12px', width: '36px', paddingTop: '14px', paddingBottom: '14px'}} str={r}/>
 */


