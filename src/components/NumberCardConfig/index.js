/**
 * 数字卡片 可配置
 */

import React,{Component} from 'react';
import './index.less';
import Answer from '../Answer';
import ClassNames from 'classnames';

const prefixCls='ai-ncc'
class NumberCardConfig extends Component{
	constructor(props){
		super(props);
		this.frame={
			title:[
                {id:0,key:'',value:'title',wordslotType:''},
			],
			body:[
               {id:0,key:'实际数',value:'numeralDetail',wordslotType:'25'},
               {id:1,key:'余额',value:'numeralDetail',wordslotType:'25'},
			],
			footer:[
               {id:0,key:'同比',value:'ratioDetail',wordslotType:''},
               {id:1,key:'环比',value:'ratioDetail',wordslotType:''},
               {id:2,key:'年增长率',value:'ratioDetail',wordslotType:''}
			]
		}
		this.data={    
			desc:'寻遍苍穹，北京工业公司2018年12月份的银行存款数据被我找到啦',
			title:'北京工业公司',
			numeralDetail:[{item:"实际数","value":"￥5,612,089"}],//,{"item":"余额","value":"￥5,608,489"}
			ratioDetail:[{item:"同比",value:"100%"},{item:"环比","value":"0.00%"},{item:"年增长率",value:"100%"}],
		}
	}
	getValue=(key)=>{
		const {data}=this.props;
        const result=data[key];
        return result;
	}
	renderTitle=()=>{
		const {data,layout:{title}}=this.props;
		const _this=this;
        const str=title.map(item=>{
            const value=_this.getValue(item.value);
        	return <li key={item.id}>
	           {
	           	  item.key ? <div className={`${prefixCls}-key`}>{key}</div> : null
	           }
	           <div className={`${prefixCls}-value`}>
                   {value}
	           </div>
	        </li>
        })
        return <div className={`${prefixCls}-title`}>
             <ul>
                {str}
             </ul>
        </div>
	}
	renderBody=()=>{
		const {layout:{body}}=this.props;
		const _this=this;
		const bodyLen=body.length;
		const len=100 / bodyLen + '%';
		const str=body.map((item,index)=>{
            const value=_this.getValue(item.value);
            let valueStr=0;
            if(value.length > index){
                valueStr=value[index]['value']
            }
			return <li style={{width:len}} key={item.id} className={`${prefixCls}-item`}>
                <div className={`${prefixCls}-key`}>
                    {item.key}
                </div>
                <div className={`${prefixCls}-value`}>
                    {valueStr}
                </div>
			</li>
		})
        return <div className={`${prefixCls}-body`}>
           <ul>
               {str}
           </ul>
        </div>
	}
	renderFooter=()=>{
		const {layout:{footer}}=this.props;
		const _this=this;
		const len=100 / footer.length + '%';
		const str=footer.map((item,index)=>{
			const value=_this.getValue(item.value);
			let valueStr=0;
            if(value.length > index){
                valueStr=value[index]['value']
            }
			return <li style={{width:len}} key={item.id} className={`${prefixCls}-item`}>
                <div className={`${prefixCls}-value`}>
                    {valueStr}
                </div>
                <div className={`${prefixCls}-key`}>
                    {item.key}
                </div>
			</li>
		})
        return <div className={`${prefixCls}-footer`}>
            <ul>
                {str}
            </ul>
        </div>
	}
	render(){
		const {data:{desc},answerStyle,style,className}=this.props;
		const classNames=ClassNames({
            [`${className}`]:className,
		}
		,`${prefixCls}-wrapper`)
        return <div className={classNames}>
            <Answer str={desc} style={answerStyle}></Answer>
            <div className={`${prefixCls}-innerWrapper`}>
               {this.renderTitle()}
               {this.renderBody()}
               {this.renderFooter()}
            </div>
            {
                React.Children.map(this.props.children,function(child){
                      return <div>{child}</div>
                })
            }
        </div>
	}
}

export default NumberCardConfig;