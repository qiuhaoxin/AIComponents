import React, {Component} from 'react'

import F2 from '@antv/f2/lib/index-all'

import './index.css';
import ClassNames from 'classnames';

const prefixCls = 'gp-histogram'

const randomId = Math.random().toFixed(12) * 1e12

export default class GroupHistogramCard extends Component {

    componentDidMount() {
        this.renderBar1()
    }


    /**
     *  分组柱状图
     */
    renderBar1 = () => {
        const {data,xAxisName,yAxisName,groupBasis} = this.props.data

        var Shape = F2.Shape;
        var Util = F2.Util;
        Shape.registerShape('interval', 'text', {
            draw: function draw(cfg, container) {
                var points = this.parsePoints(cfg.points);
                // points 顶点的顺序
                // 1 ---- 2
                // |      |
                // 0 ---- 3
                var style = Util.mix({
                    fill: cfg.color,
                    z: true // 需要闭合
                }, cfg.style);
                var intervalShape = container.addShape('rect', {
                    attrs: Util.mix({
                        x: points[1].x,
                        y: points[1].y,
                        width: points[2].x - points[1].x,
                        height: points[0].y - points[1].y
                    }, style)
                });

                var origin = cfg.origin._origin; // 获取对应的原始数据记录
                var textShape = container.addShape('text', {
                    zIndex: 1,
                    attrs: {
                        x: (points[1].x + points[2].x) / 2,
                        y: points[1].y - 1, // 往上偏移 1 像素
                        text: origin[yAxisName],
                        fill: '#808080',
                        textAlign: 'center',
                        textBaseline: 'bottom',
                        fontSize: 10 // 字体大小
                    }
                });
                container.sort();
                return [intervalShape, textShape];
            }
        });

        let chart = new F2.Chart({
            id: `mountNode-${randomId}`,
            pixelRatio: window.devicePixelRatio
        });
        chart.source(data);

        // 设置图例位置
        chart.legend({
            position: 'top',
            align: 'center'
        });

        // 不显示y轴文本
        chart.axis(yAxisName, {
            label: null
        })

        chart.interval().position(`${xAxisName}*${yAxisName}`).color(groupBasis).shape('text').adjust({
            type: 'dodge',
            marginRatio: 0 // 设置分组间柱子的间距
        });
        // chart.interaction('pan', {
        //     mode: 'x'
        // });
        chart.interaction('pan');
        chart.render();
    }

    render() {
        const {style,className} = this.props

        const {title,updateTime} = this.props.data
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
