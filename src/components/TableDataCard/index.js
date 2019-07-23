import React, {Component} from 'react'

import F2 from '@antv/f2/lib/index-all'

import './index.css';
import ClassNames from 'classnames';

const prefixCls = 'ai-table'
const randomId = Math.random().toFixed(12) * 1e12

export default class TableDataCard extends Component {

    componentDidMount() {

    }

    /**
     *  表格图
     */
    renderTable = () => {
        const {data,  headKeyNames} = this.props.data
        const thsDom = <tr>{headKeyNames.map(item => <th key={item}>{item}</th>)}</tr>

        const thdDom = data.map((tds, index) =>
            <tr key={index}>
                {
                    headKeyNames.map((headKey, index) => {
                        return <td key={index}>{tds[headKey]}</td>
                    })
                }
            </tr>
        )

        return <div className={`${prefixCls}-div-wrapper`}>
            <table>
                <thead>{thsDom}</thead>
                <tbody>{thdDom}</tbody>
            </table>
        </div>

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
                {
                    this.renderTable()
                }
                <div className={`${prefixCls}-bottom-content`}>数据统计截止：{updateTime}</div>
            </div>
        )
    }
}
