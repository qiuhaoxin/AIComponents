import React, {Component} from 'react'

import F2 from '@antv/f2/lib/index-all'

import './index.css';
import ClassNames from 'classnames';

const prefixCls = 'ai-line'
const randomId = Math.random().toFixed(12) * 1e12

export default class LineDataCard extends Component {

    componentDidMount() {
        this.renderBar1()
    }

    /**
     *  折线图
     */
    renderBar1 = () => {
        const {data, xAxisKeyName, yAxis} = this.props.data

        const yAxisName = yAxis[0].keyName

        let chart = new F2.Chart({
            id: `mountNode-${randomId}`,
            height: 180,
            pixelRatio: window.devicePixelRatio
        });

        chart.source(data, {
            [yAxisName]: {
                ticks: [0, 20, 40, 60, 80,100],
                formatter: function formatter(val) {
                    return val  + '%';
                }
            },
            [xAxisKeyName]: {
                range: [0, 1]
            }
        });
        chart.tooltip({
            showCrosshairs: true,
            showItemMarker: false,
            onShow: function onShow(ev) {
                let items = ev.items;
                items[0].name = null;
                // items[0].value = items[0].value;
            }
        });

        chart.axis(xAxisKeyName, {
            tickLine: false
        })

        chart.line().position(`${xAxisKeyName}*${yAxisName}`).color("#5ED5C4");
        // chart.point().position(`${xAxisKeyName}*${yAxisName}`).style({
        //     stroke: '#fff',
        //     lineWidth: 1
        // });
        chart.render();
    }

    render() {
        const {style, className} = this.props
        const {title, updateTime} = this.props.data
        const classNames = ClassNames({[`${className}`]: className,}, `${prefixCls}-wrapper`)

        return (
            <div className={classNames} style={style}>
                <div className={`${prefixCls}-title`}>
                    {title}
                </div>
                <canvas id={`mountNode-${randomId}`}/>
                <div className={`${prefixCls}-bottom-content`}>数据统计截止：{updateTime}</div>
            </div>
        )
    }
}
