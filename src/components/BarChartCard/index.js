/**
 * 柱状图卡片
 *
 */

import React,{Component} from 'react';
import F2 from '@antv/f2/lib/index-all'

class BarChartCard extends Component{
	constructor(props){
	   super(props);
	}
	componentDidMount(){
	    this.initChart();
	    this.renderChart();
	}
	initChart=()=>{
	     this.chart = new F2.Chart({
		    id: 'mountNode',
		    pixelRatio: window.devicePixelRatio
		 });
	}
    renderChart=()=>{
    	  const {data}=this.props;
		  this.chart.source(data, {
		    sales: {
		      tickCount: 5
		    }
		  });
		  // this.chart.tooltip({
		  //   showItemMarker: false,
		  //   onShow: function onShow(ev) {
		  //     var items = ev.items;
		  //     items[0].name = null;
		  //     items[0].name = items[0].title;
		  //     items[0].value = '¥ ' + items[0].value;
		  //   }
		  // });
		  this.chart.interval().position('year*sales');
		  this.chart.render();
    }
    renderTitle=()=>{
       const {title}=this.props;
       return <div>
           {title}
       </div>
    }
	render(){
        return <div>
           <canvas id='mountNode'>

           </canvas>
        </div>
	}
}

export default BarChartCard;

