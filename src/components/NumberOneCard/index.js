/**
 * 财务1号报表 数据卡片
 * 
 */

import React,{Component} from 'react';
import './index.less';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Answer from '../Answer';

const prefixCls=`ai-noc`;
const data={
     title:'金蝶中国业绩总览',
     cardType:'one',
     bodyData:[
        {  
          numberDetail:[
          	{key:'本年收款',value:'¥123,4万'},
          	{key:'缺口',value:'¥-34万'},
          ],
          radioDetail:[
            {key:'完成率',value:'60%'},
          	{key:'同比增长',value:'60%'},   
          	{key:'云占比',value:'34%'},
          ]
        },
     ],
     updateTime:'2018.09.01',
}
const data2={
	 title:'金蝶云2月份的续费率',
     cardType:'two',
     bodyData:[
        [{key:'苍穹',value:'50%',id:0},{key:'星空',value:'70%',id:1}],
     ],
     updateTime:'2018.09.01',
}
const data3={
	 title:'苍穹客户数量',
     cardType:'three',
     bodyData:[
        [{key:'累计总数',value:'1000家',id:0},{key:'本年新增',value:'400家',id:1},{key:'同比增长',value:'40%',id:2}],
     ],
     updateTime:'2018.09.01',
}

class NumberOneCard extends Component{
	constructor(props){
		super(props);
    this.isMove=false;
    this.curPageIdx=0;
    this.distTargetX=0;
	}
	state={
		cardData:null,
	}
	componentDidMount(){
	}
	getValue=(key)=>{
        
	}
	renderCardData=()=>{

	}
	renderTitle=()=>{
    const {data:{title}}=this.props;
      return <div className={`${prefixCls}-title`}>
        {title}
      </div>
	}
  getNumberTitle=(numberData)=>{
      let str="";
      numberData.forEach((item,index)=>{
         if(index>0){
          str+='和';
         }
         str+=item.key;
      })
      return str;
  }
  getNumberValue=(numberData)=>{
     let arr=[];
     numberData.forEach(item=>{
         arr.push(item.value);
     })
     return arr;
  }
  renderNumberDetail=(numberData)=>{
      const title=this.getNumberTitle(numberData);
      const valueArr=this.getNumberValue(numberData);
      return <div className={`${prefixCls}-number`}>
          <div className={`${prefixCls}-number-title`}>
             {title}
          </div>
          <div className={`${prefixCls}-number-value`}>
             {
                valueArr.map(item=><span className={`${prefixCls}-value`}>{item}</span>)
             }
          </div>
      </div>
  }
  renderRadioDetail=(radioData)=>{
      let leftRadio=[];
      let rightRadio=[];
      radioData.forEach((item,index)=>{
         if(index % 2==0){
            leftRadio.push(<div key={item.id}>
               <span className={`${prefixCls}-key`}>{item.key}:</span>
               <span className={`${prefixCls}-value`}>{item.value}</span>
            </div>)
         }else{
            rightRadio.push(<div>
               <span className={`${prefixCls}-key`}>{item.key}:</span>
               <span className={`${prefixCls}-value`}>{item.value}</span>
            </div>)
         }
      })
      return <div className={`${prefixCls}-radio`}>
        <div className={`${prefixCls}-radio-left`}>
          {leftRadio}
        </div>
        <div className={`${prefixCls}-radio-right`}>
          {rightRadio}
        </div>
      </div>
  }
  renderDecoration=(len)=>{
      let decorationArr=[];
      for(let i=0;i<len;i++){
          const csn=i==0 ? 'selected' : null;
          decorationArr.push(<li key={i} className={csn}></li>)
      }
      return <ul className={`${prefixCls}-decoration`}>
         {decorationArr}
      </ul>
  }
	renderCardOne=()=>{
     const {data:{bodyData}}=this.props;
     const className=`${prefixCls}-card-one`;
     //const len=bodyData.length;
     const len=2;
     const wrapperStr=bodyData.map((item,index)=>{
          const numberData=item.numberDetail;
          const radioData=item.radioDetail;
          let leftStyle=index * 316;
          leftStyle=leftStyle==0 ? 0 : leftStyle+'px';
         const style={transform:`translate3d(${leftStyle},0,0)`};
         return <div key={item.id} ref={el=>this[`wrapper-${index}`]=el} style={style} className={`${prefixCls}-body ${prefixCls}-body-${item.id}`}
         onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd} onTransitionEnd={this.handleTransitionEnd}>
            {this.renderNumberDetail(numberData)}
            {this.renderRadioDetail(radioData)}
         </div>
     })
     return <div className={className}>
        {wrapperStr}
     </div>
	}
	renderCardTwo=()=>{
     const {data:{bodyData}}=this.props;
		 const className=`${prefixCls}-card-two`;
		 const wrapperStr=bodyData.map(item=>{
            const liStr=item.map(itemData=>{

            	return <li key={itemData.id}>
                   <div className={`${prefixCls}-key`}>
                       {itemData.key}
                   </div>
                   <div className={`${prefixCls}-value`}>
                       {itemData.value}
                   </div>
            	</li>
            })
		 	return <ul key={item.id}>
          {liStr}
		 	</ul>
		 })
     return <div className={className}>
        {wrapperStr}
     </div>
	}
  handleTouchStart=(e)=>{
    const pointer=e.touches ? e.touches[0] : e;
    const {data:{bodyData}}=this.props;
    if(bodyData.length==1)return;
    this.startX=pointer.pageX;
    this.startY=pointer.pageY;
  }
  handleTouchMove=(e)=>{
      const point=e.touches ? e.touches[0] : e;
      const pageX=point.pageX;
      const pageY=point.pageY;
      const distanceX=pageX - this.startX;
      const distanceY=pageY - this.startY;
      if(Math.abs(distanceX) > Math.abs(distanceY) + 40){
          const direction=distanceX > 0 ? 1 : -1;
          if(this.direction==0 || this.direction!=direction){
                this.direction=direction;
                this.getTarget();
          }
          this.transform(distanceX / 3);
          this.isMove=true;
      }
  }
  getTarget=()=>{
          const curPageIdx=this.curPageIdx;
          const {data:{bodyData}}=this.props;
          if(this.distTargetX==0){
            this.distTargetX=-316 * this.direction;
          }
          if(this.direction==-1){
            //左滑
            if(this.curPageIdx==bodyData.length - 1){
              this.distTarget=null;
            }else{
               const targetIdx=curPageIdx + 1;
               this.distTarget=this[`wrapper-${targetIdx}`];
            }
            this.sourceTarget=this['wrapper-'+curPageIdx];
          }else{
            //右滑
            if(this.curPageIdx==0){
              this.distTarget=null;
            }else{
              this.distTarget=this[`wrapper-${curPageIdx - 1}`];
            }
            this.sourceTarget=this['wrapper-'+curPageIdx];
          }
  }
  handleTouchEnd=(e)=>{
          const point = e.changedTouches ? e.changedTouches[0] : e;
          const {data:{bodyData}}=this.props;
          const endPageX=point.pageX;
          const endPageY=point.pageY;
          const CHANGE_DISTANCE=Math.round(316 / 4);
          const distanceX=Math.abs(Math.round(endPageX - this.startX));
          const distanceY=Math.abs(Math.round(endPageY - this.startY));
          if((this.curPageIdx==0 && this.direction==1) || (this.curPageIdx==bodyData.length - 1 && this.direction==-1)){
             this.setTransition('transform .5s');
             this.transform(0);
          }else if(distanceX > CHANGE_DISTANCE){
            this.setTransition('transform .5s');
            this.transform(this.direction * 316);
            this.curPageIdx+=this.direction * -1;
          }else{
            this.setTransition('transform .5s');
            this.transform(0);
          }
          this.reset();
  }
  handleTransitionEnd=()=>{
      const {data:{bodyData}}=this.props;
      for(let i=0,len=bodyData.length;i<len;i++){
             this[`wrapper-${i}`].style['transition']='';
      }
  }
  setTransition=(transitionStr)=>{
         if(this.sourceTarget){
             this.sourceTarget.style['transition']=transitionStr;
         }
         if(this.distTarget){
             this.distTarget.style['transition']=transitionStr;
         }
  }
  reset=()=>{
          this.distTargetX=0;
          this.direction=0;
          this.sourceTarget=null;
          this.distTarget=null;
  }
  transform=(x)=>{
          if(this.sourceTarget){
            this.sourceTarget.style['transform']=`translate3d(${x}px,0,0)`;
          }
          if(this.distTarget){
            const shouldTranslateX=this.distTargetX +x;
            this.distTarget.style['transform']=`translate3d(${shouldTranslateX}px,0,0)`;
          }
  }
	renderCardThree=()=>{

	}
	renderBody=()=>{
         const {data:{cardType}}=this.props;
         switch(cardType){
         	case 'one':
              return this.renderCardOne();
         	break;
         	case 'two':
               return this.renderCardTwo();
         	break;
         	case 'three':
              return this.renderCardThree();
         	break;
         }
	}
	renderFooter=()=>{
        const {data:{updateTime}}=this.props;
        return <div className={`${prefixCls}-footer`}>
            <span>数据统计截止:</span><span>{updateTime}</span>
        </div>
	}
	render(){
  		const {className,desc,answerStyle,data:{bodyData}}=this.props;
      const len=bodyData.length;
      const wrapperCls=ClassNames({
            [className]:!!className,
      },`${prefixCls}-wrapper`)
  		return <div className={wrapperCls}>
             <Answer str={desc} style={answerStyle}></Answer>
             <div className={`${prefixCls}-innerWrapper`}>
                 {
                 	  this.renderTitle()
                 }
                 {
                 	  this.renderBody()
                 }
                 {
                    len > 1 ? this.renderDecoration(len) : null
                 }
                 {
                 	  this.renderFooter()
                 }
             </div>
  		</div>
	}
}

NumberOneCard.defaultProps={

}
NumberOneCard.propTypes={

}
export default NumberOneCard;