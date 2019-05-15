import React, {Component} from 'react';
import './index.less';

//import WaitingLoading3 from "../../../src/components/WaitingLoading3";
import _3dot from "../../../src/components/WaitingLoading3/_3dot.json";
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

        // let r = <ReactBodymovin options={dotDymEffect}/>
        let r;

        return (
            <div className={'content'}>
                {/*<Answer style={{height: '12px', width: '36px', paddingTop: '14px', paddingBottom: '14px'}} str={r}/>*/}
            </div>
        )
    }
}

export default DotDymEffectPages;

/*
                // <Answer style={{height: '12px', width: '36px', paddingTop: '14px', paddingBottom: '14px'}} str={r}/>
 */


