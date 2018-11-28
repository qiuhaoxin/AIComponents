import React, {Component} from 'react';
import './index.less';
import Input from '../../../src/components/Input';

class InputSample extends Component {
    constructor(props) {
        super()
    }

    render() {

        return (
            <div className={'content'}>
                hello world
                <Input
                       text={'我明天去北京'}
                       afterEnter={(inputValue, oldValue) => {
                           console.log("inputValue is : " + JSON.stringify(inputValue))
                           console.log("oldValue is : " + JSON.stringify(oldValue))
                       }}
                       focusEvent={console.log('focusEvent')}/></div>
        )
    }
}

export default InputSample;


