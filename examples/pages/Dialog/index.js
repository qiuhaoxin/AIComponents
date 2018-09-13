import React,{Component} from 'react';
import {Dialog} from '../../../src/index.js';

class DialogPage extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
            <div>
                <Dialog></Dialog>
            </div>
		)
	}
}

export default DialogPage;