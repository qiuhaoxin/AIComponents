/**
 * 财务1号报表 数据卡片
 * 
 */

import React,{Component} from 'react';
import './index.less';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const prefixCls=`ai-noc`;
const layoutData=[
    {type:'1',layout:{
    	title:[{id:0,key:'',vlaue:'title'}],
        body:[],
        footer:[{id:5,key:'数据统计截止:',value:'endDate'}],
    },
    {type:'2',layout:{
    	title:[],
    	body:[],
    	footer:[],
    }}
]
const data={
     title:'金蝶中国业绩总览',
     cardType:'one',
     bodyData:[
        [numberDetail:[{key:'',value:''},{key:'',value:''}],radioDetail:{}],
     ]
     updateTime:'2018.09.01',
}
const data2={
	 title:'金蝶云2月份的续费率',
     cardType:'two',
     bodyData:[
        [{key:'苍穹',value:'50%',id:0},{key:'星空',value:'70%',id:1}],
     ]
     updateTime:'2018.09.01',
}
const data3={
	 title:'苍穹客户数量',
     cardType:'three',
     bodyData:[
        [{key:'累计总数',value:'1000家',id:0},{key:'本年新增',value:'400家',id:1},{key:'同比增长',value:'40%',id:2}],
     ]
     updateTime:'2018.09.01',
}

class NumberOneCard extends Component{
	constructor(props){
		super(props);
	}
	state={
		cardData:null,
	}
	componentDidMount(){
		this.selectCardType();
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

	renderCardOne=()=>{

	}
	renderCardTwo=()=>{
         const {bodyData}=this.props;
		 const className=`${prefixCls}-card-two`;
		 const wrapperStr=bodyData.map(item=>{
            const liStr=item.map(itemData=>{

            	return <li key={itemData.id}>
                   <div>
                       {key}
                   </div>
                   <div>
                       {value}
                   </div>
            	</li>
            })
		 	return <ul key={item.id}>
                {liStr}
		 	</ul>
		 })
         return <div className={className}>
            
         </div>
	}
	renderCardThree=()=>{

	}
	renderBody=()=>{
         const {cardType}=this.props;
         switch(cardType){
         	case 'one':
               this.renderCardOne();
         	break;
         	case 'two':
               this.renderCardTwo();
         	break;
         	case 'three':
               this.renderCardThree();
         	break;
         }
	}
	renderFooter=()=>{
        const {data:{endDate}}=this.props;
        return <div>
            <span>数据统计截止:</span><span>{endDate}</span>
        </div>
	}
	//选择要渲染卡片的类型，并获取卡片元数据
	selectCardType=()=>{
        const {type}=this.props;
        const cardData=layoutData.filter(item=>item.type==type);
        this.setState({
        	cardData,
        })
	}
	render(){
		const {className,}
        const wrapperCls=ClassNames({
          [className]:!!className,
        },`${prefixCls}-wrapper`)
		return <div className={wrapperCls}>
           
		</div>
	}
}

NumberOneCard.defaultProps={

}
NumberOneCard.propTypes={

}
export default NumberOneCard;