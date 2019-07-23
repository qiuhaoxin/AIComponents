import React, {Component} from 'react'

import F2 from '@antv/f2/lib/index-all'

import './index.css';
import ClassNames from 'classnames';

const prefixCls = 'ai-histogram'
const randomId = Math.random().toFixed(12) * 1e12

export default class HistogramCard extends Component {

    componentDidMount() {
        this.renderBar1()
    }

    /**
     *  普通柱状图
     */
    renderBar1 = () => {

        const {data,xAxisName,yAxisName} = this.props.data

        var chart = new F2.Chart({
            id: `mountNode-${randomId}`,
            pixelRatio: window.devicePixelRatio
        });

        chart.source(data, {
            sales: {
                tickCount: 5
            }
        });

        chart.tooltip({
            showItemMarker: false,
            onShow: function onShow(ev) {
                var items = ev.items;
                items[0].name = items[0].title;
                items[0].value =   + items[0].value;
            }
        });
        chart.interval().position(`${xAxisName}*${yAxisName}`);
        chart.render();
    }

    render() {
        const {title,updateTime} = this.props.data
        const {style,className} = this.props
        const classNames = ClassNames({[`${className}`]: className,}, `${prefixCls}-wrapper`)

        return (
            <div className={classNames} style={style}>
                <div className={`${prefixCls}-title`}>
                    {title}
                </div>
                <canvas id={`mountNode-${randomId}`} width={315} height={215}/>
                <div className={`${prefixCls}-bottom-content`}>数据统计截止：{updateTime}</div>
            </div>
        )
    }
}
