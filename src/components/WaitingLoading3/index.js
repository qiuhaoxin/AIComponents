import React, {Component} from 'react';
import {Answer} from "../Answer";
import {WaitingLoading2} from "../WaitingLoading2";

class WaitingLoading3 extends Component {
    constructor(props) {
        super()
    }

    render() {
        const style = this.props.style
        let w = <WaitingLoading2/>
        return (
            <div style={style} >
                <Answer style={{paddingTop: '16px', paddingBottom: '16px',paddingLeft:'15px',paddingRight:'15px'}} str={w}/>
            </div>
        )
    }
}

export default WaitingLoading3;
