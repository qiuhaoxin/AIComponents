import React, {Component} from 'react'

import F2 from '@antv/f2/lib/index-all'

import './index.css';
import ClassNames from 'classnames';

const prefixCls = 'ai-combine'
const randomId = Math.random().toFixed(12) * 1e12

export default class CombineDataCard extends Component {

    componentDidMount() {
        this.renderBar1()
    }

    /**
     *  柱状图和折线图组合
     */
    renderBar1 = () => {
        const {data, xAxisName, yAxisName, yAxisName2} = this.props.data

        let width = 300;
        let chart = new F2.Chart({
            id: `mountNode-${randomId}`,
            width: width,
            height: width * 0.64,
            pixelRatio: window.devicePixelRatio,
        });

        chart.source(data, {
            [yAxisName2]: {
                ticks: [0, 0.2, 0.4, 0.6, 0.8, 1],
                formatter: function formatter(val) {
                    return val * 100 + '%';
                }
            }
        });

        chart.interval().position(`${xAxisName}*${yAxisName2}`).color("#4598F0");
        chart.line().position(`${xAxisName}*${yAxisName2}`)
            .color('#EA6F38')
            .size(2)
            .shape('smooth');

        let legendItems = [{
            name: yAxisName,
            marker: 'square',
            fill: '#4598F0',
        }, {
            name: yAxisName2,
            fill: '#EA6F38',
            marker: function marker(x, y, r, ctx) {
                ctx.lineWidth = 1;
                ctx.strokeStyle = ctx.fillStyle;
                ctx.moveTo(x - r - 3, y);
                ctx.lineTo(x + r + 3, y);
                ctx.stroke();
                ctx.fill();
            },
        }];

        chart.legend({
            custom: true,
            items: legendItems,
            position: 'top',
            align: 'center'
        });

        chart.tooltip(false)

        // 绘制柱状图上的文本数字
        data.forEach(obj => {
            chart.guide().text({
                position: [obj[xAxisName], obj[yAxisName2]],
                content: obj[yAxisName],
                style: {
                    textAlign: 'start'
                },
                offsetX: -10,
                offsetY: -5
            });
        });

        chart.render();
    }

    render() {
         const {style,className} = this.props

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
