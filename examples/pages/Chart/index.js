/**
 * 图表
 */
import React,{Component} from 'react';
import BarChartCard from '../../../src/components/BarChartCard';
import './index.less';

class BarChartCardPage extends Component{
    constructor(props){
    	super(props);
      this.chartData=[{
        year: '1951 年',
        sales: 38
      }, {
        year: '1952 年',
        sales: 52
      }, {
        year: '1956 年',
        sales: 61
      }, {
        year: '1957 年',
        sales: 145
      }, {
        year: '1958 年',
        sales: 48
      }, {
        year: '1959 年',
        sales: 38
      }, {
        year: '1960 年',
        sales: 38
      }, {
        year: '1962 年',
        sales: 38
      }];
		}

    render(){
    	return <div>
         <BarChartCard data={this.chartData} title={'测试柱状图'}>

         </BarChartCard>
    	</div>
    }
}


export default BarChartCardPage;

