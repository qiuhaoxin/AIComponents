import React,{Component} from 'react';
 import {Dialog,TypeIn,RecommendCard} from '../../../src/index.js';
//import  {Dialog,RecommendCard} from 'aicomponents';
import './index.less';

import chailubiaozhun from '../../images/chailubiaozhun.png';
import chuchashenqing from '../../images/chuchashenqing.png';
import xiechengshanglu from '../../images/xiechengshanglu.png';

const DIALOG_TITLE="这里是标题";
const urlMapping={
  'BUS_TRIP':'renderExtendBus_tip'
}
const SOURCE_ADDRESS="出发地",TARGET_ADDRESS='目的地',BEGIN_TIME="出发时间",BACK_TIME='返回时间';
class DialogPage extends Component{
	constructor(props){
		super(props);
		this.data=[
           {id:1,ftitle:'人人差旅',ftips:'我明天要去北京出差',ficonpath:chailubiaozhun},
           {id:2,ftitle:'智能核算',ftips:'我要核算',ficonpath:chuchashenqing},
           {id:3,ftitle:'日志管理',ftips:'我要日志管理',ficonpath:chuchashenqing},
           {id:4,ftitle:'业务流服务',ftips:'我要查看业务流程',ficonpath:xiechengshanglu},
		]
		this.typeInData=[

		]
	}
    handleDialogContent=(wordslot)=>{
	    let b_loc=SOURCE_ADDRESS,e_loc=TARGET_ADDRESS,b_t=BEGIN_TIME,e_t=BACK_TIME;
	    wordslot.forEach(item=>{
	       const number=item.number;
	       switch(number){
	         case 'user_e_l':
	             e_loc=item['originalWord']+'  ('+TARGET_ADDRESS+')';
	         break;
	         case 'user_b_l':
	             b_loc=item['originalWord']+'  ('+SOURCE_ADDRESS+')';
	         break;
	         case 'user_b_t':
	             b_t=item['normalizedWord'];
	         break;
	         case 'user_e_t':
	             e_t=item['normalizedWord'];
	         break;
	       }
	    })
	    return (
	       <div className={'dialogContent'}>
	           <div className={`dialogContent-left`}>
	               <div className={`'loc' ${b_loc!=SOURCE_ADDRESS ? 'loc_fill' : ''}`}>{b_loc}</div>
	               <div className={`'loc' ${b_loc!=TARGET_ADDRESS ? 'loc_fill' : ''}`}>{e_loc}</div>
	           </div>
	           <div className={'dialogContent-right'}>
	               <div className={`'time' ${b_t!=BEGIN_TIME ? 'time_fill' : ''}`}>{b_t}</div>
	               <div className={`'time' ${b_t!=BACK_TIME ? 'time_fill' : ''}`}>{e_t}</div>
	           </div>
	       </div>
	    )
  }
	handleDialogSubmit=(item)=>{
	     const url=item && item['url'];
	     const urlStr=url && url['url'];
	     const {dialogList}=this.state;
	     if(urlStr){
	        saveInLocalStorage('dialog',dialogList);
	        location.href=urlStr;
	     }
	}
	handleDialogEdit=(item)=>{
		const url=item && item['url'];
	     const urlStr=url && url['url'];
	     const {dialogList}=this.state;
	     const {sessionId}=this.props;
	     if(urlStr){
	        saveInLocalStorage('dialog',dialogList);//保存该次的会话记录
	        saveInLocalStorage('sessionId',sessionId);
	        location.href=urlStr;
	    }
	}
	render(){
		const item={
			className:"chatbot-dialog","text":"您什么时候回来呢？",id:2,"kdIntention":{"intention":"BUS_TRIP","intentionName":"出差申请",
			"kdWordslots":[{"normalizedWord":"2018-09-19","number":"user_b_t","originalWord":"明天","score":0,"wordslotType":"2"},
			{"normalizedWord":"北京","number":"user_e_l","originalWord":"北京","score":0,"wordslotType":"location"}],
			"say":"您什么时候回来呢？","score":0,"sessionId":"3cd9d602-c688-488c-9b9b-dd326711b1e3","status":"clarify"},"type":"TEXT"
		}
		const kdIntention=item['kdIntention'];
		const reason="您什么时候回来呢？";
		return (
            <div>
              <TypeIn title={reason ? reason : DIALOG_TITLE} className={`${'dialog'}`} content={()=>this.handleDialogContent(kdIntention['kdWordslots'])} 
                onSubmit={item.type=='URL' ? ()=>this.handleDialogSubmit(item) : null} onEdit={item.type=='URL' ? ()=>this.handleDialogEdit(item) : null}>
               {item.type=='URL' ? this[urlMapping[kdIntention['intention']]] : null}
              </TypeIn>
            </div>
		)
	}
}
export default DialogPage;

/*
* <RecommendCard data={this.data} className={'ai-rc-card'} desc={'请问我能帮您做点什么?'}></RecommendCard>
*/