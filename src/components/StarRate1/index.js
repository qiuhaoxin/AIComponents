import React,{Component} from 'react';
import './index.less';
import SuperComponent from '../SuperComponent';
import selectedStar from '../../images/icon_star_selected.png';
import normalStar from '../../images/icon_star_normal.png';

const prefixCls="ai-sr";
class StarRate1 extends SuperComponent{
	constructor(props){
		super(props);
		this.arrs=null;
	}
	componentDidMount(){
	}
	state={
		rate:0,
	}
	handleClick=(e,index)=>{
       const {onChange}=this.props;
       this.setState({
       	  rate:1 + index,
       },()=>{
          onChange && onChange(1 + index)
       })
	}
	renderStars=()=>{
		const {count}=this.props;
		const {rate}=this.state;
        const arrs=Array(5);
        for(let i=0;i<count;i++){
        	arrs.push(i);
        }
		const str=arrs.map((item,index)=>{
			return <li key={item} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} 
			onTouchEnd={(e)=>this.handleTouchEnd(e,this.handleClick.bind(this,e,item))}>
               <img src={item < rate ? selectedStar : normalStar} />
			</li>
		})
		return <ul className={`${prefixCls}-list`}>
            {
            	str
            }
		</ul>
	}
	render(){
		return (
            <div className={`${prefixCls}-wrapper`}>
                {
                	this.renderStars()
                }
            </div>
		)
	}
}
export default StarRate1;
