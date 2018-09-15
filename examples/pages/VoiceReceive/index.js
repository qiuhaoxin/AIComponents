import React,{Component} from 'react';
import './index.less';
import VoiceReceive from '../../../src/components/VoiceReceive';

class VoiceReceivePage extends Component{
	constructor(props){
		super(props);
		this.data={
			desc:'要是没有问题了，小K就退下啦',
			title:'小K帮到您了吗',
			btns:[

			],

		}
	}
	render(){
        return (
           <div>
               <VoiceReceive data={this.data} className={`ai-vr-demo`}>

               </VoiceReceive>
           </div>
        )
	}
}
export default VoiceReceivePage;