import React,{Component} from 'react';
import './index.less';
import NumberCard from '../../../src/components/NumberCard';
import Comment from '../../../src/components/Comment';
class NumberCardPage extends Component{
	constructor(props){
		super(props);
		this.data={
			title:'金蝶软件(中国)有限公司',
			desc:'寻遍苍穹，黑龙江分公司2018年11月份的现金数据被我找到啦',
			value:'300000.34W',
			numeralDetail:[
               {
               	  item:'实际数',
               	  value:'263056.00万'
               }
			],
			ratioDetail:[
               {item:'环比',value:'+60%'},
               {item:'环比',value:'+70%'},
               {item:'环比',value:'+80%'},
			]
		}
		this.data1={
			title:'金蝶软件(中国)有限公司',
			desc:'测试描述',
			value:'300000.34W',
			numeralDetail:[
               {
               	  item:'实际数',
               	  value:'263056.00万'
               }
			],
			ratioDetail:[
               {item:'环比',value:'+60%'},
               {item:'环比',value:'+70%'},
			]
		}
		this.data2={
			numeralDetail:[
               {
               	  item:'实际数',
               	  value:'2630'
               },
               {
               	  item:'实际数',
               	  value:'2630'
               }
			],
			ratioDetail:[

			]
		}
	}
   handleNegativeClick=()=>{
      console.log("onNegativeClick!");
   }
   handlePositiveClick=()=>{
      console.log("onPositiveClick!");
   }
	render(){
		return (
            <div>
               <NumberCard data={this.data} className={'ai-nc-demo'} >
                     <Comment onNegativeClick={this.handleNegativeClick} onPositiveClick={this.handlePositiveClick}></Comment>
               </NumberCard>
                <NumberCard data={this.data1} className={'ai-nc-demo1'}>

               </NumberCard>
               <NumberCard data={this.data2} className={'ai-nc-demo'}>

               </NumberCard>
            </div>
		)
	}
}

export default NumberCardPage;


/*
*               <NumberCard data={this.data} className={'ai-nc-demo'}>

               </NumberCard>
                <NumberCard data={this.data1} className={'ai-nc-demo1'}>

               </NumberCard>

*/