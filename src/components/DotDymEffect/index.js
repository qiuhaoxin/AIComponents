import React, {Component} from 'react';
// import './index.less';
  import {Answer} from "../Answer";
import {WaitingLoading2} from "../WaitingLoading2";

class DotDymEffect extends Component {
    constructor(props) {
        super()
    }

    render() {
        let w = <WaitingLoading2/>
        return (
            <div className={'content'}>
                <Answer style={{paddingTop: '16px', paddingBottom: '16px',paddingLeft:'15px',paddingRight:'15px'}} str={w}/>
            </div>
        )
    }
}

export default DotDymEffect;
