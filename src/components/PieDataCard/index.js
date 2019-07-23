import React, {Component} from 'react'

import F2 from '@antv/f2/lib/index-all'

import './index.css';
import ClassNames from 'classnames';

const prefixCls = 'ai-pie-histogram'
const randomId = Math.random().toFixed(12) * 1e12

export default class PieDataCard extends Component {

    componentDidMount() {
        this.renderBar1()
    }

    /**
     *  饼状图
     */
    renderBar1 = () => {
        const {data, xAxisName, yAxisName} = this.props.data

        let width = 280;
        var chart = new F2.Chart({
            id: `mountNode-${randomId}`,
            width: width,
            height: width * 0.707,
            pixelRatio: window.devicePixelRatio
        });

        chart.source(data, {
            percent: {
                formatter: function formatter(val) {
                    return val * 100 + '%';
                }
            }
        });

        chart.legend({
            position: 'right',
            clickable: false
        });

        chart.tooltip(false);
        chart.coord('polar', {
            transposed: true,
            radius: 0.85,
            innerRadius: 0.518
        });

        chart.axis(false);
        chart.interval().position(`a*${yAxisName}`).color(xAxisName, ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0']).adjust('stack').style({
            lineWidth: 3,
            stroke: '#fff',
            lineJoin: 'round',
            lineCap: 'round'
        });

        chart.guide().html({
            position: ['50%', '55%'],
            html:
                '<div style="text-align: center;width: 100px;height: 72px;vertical-align: middle;">'
                + '<p id="number" style="font-size: 12px;margin: 10px 10px 5px; "/>'
                + '<p id="name" style="font-size: 12px;margin: 0;"/>'
                + '</div>'
        });
        chart.render();

        chart.interaction('pie-select', {
            startEvent: 'tap',
            animate: {
                duration: 300,
                easing: 'backOut'
            },
            onEnd(ev) {
                const {shape, data, selected} = ev;
                if (shape) {
                    if (selected) {
                        document.getElementById("number").textContent = '收入占比'
                        document.getElementById("name").textContent = `${data.percent * 100}%`
                    } else {
                        document.getElementById("number").textContent = ''
                        document.getElementById("name").textContent = ''
                    }
                }
            },
            onStart(ev) {
                console.log('点击事件')
            }
        });

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
