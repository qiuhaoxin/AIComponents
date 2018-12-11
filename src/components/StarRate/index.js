import React, {Component} from 'react'
import PropTypes from 'prop-types'

import selectedStar from '../../images/icon_star_selected.png'
import normalStar from '../../images/icon_star_normal.png'
import SuperComponent from "../SuperComponent";


const parentStyles = {
    overflow: 'hidden',
    position: 'relative'
}

const defaultStyles = {
    position: 'relative',
    overflow: 'hidden',
    display: 'block',
    float: 'left'
}

class StarRate extends SuperComponent {

    constructor(props) {

        super(props)

        props = Object.assign({}, props)

        this.state = {
            uniqueness: (Math.random() + '').replace('.', ''),
            value: props.value || 0,
            stars: [],
        }

        this.state.config = {
            count: props.count,
            size: props.size,
            edit: props.edit,
        }

    }

    componentDidMount() {
        this.setState({
            stars: this.getStars(this.state.value)
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            stars: this.getStars(props.value),
            value: props.value,
            config: {
                ...this.state.config,
                edit: props.edit
            }
        })
    }


    getStars(activeCount) {
        if (typeof activeCount === 'undefined') {
            activeCount = this.state.value
        }
        let stars = []
        for (let i = 0; i < this.state.config.count; i++) {
            stars.push({
                active: i <= activeCount - 1
            })
        }
        return stars
    }


    clicked = (event) => {
        const {config} = this.state
        if (!config.edit) {
            return
        }
        let index = Number(event.target.getAttribute('data-index'))
        let value
        value = index = index + 1
        this.setState({
            value: value,
            stars: this.getStars(index)
        })
        this.props.onChange(value)
    }


    renderStars() {
        const {stars} = this.state
        return stars.map((star, i) => {
            return (
                <img
                    src={star.active ? selectedStar : normalStar}
                    style={defaultStyles}
                    key={i}
                    data-index={i}
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={(e) => this.handleTouchEnd(e, this.clicked.bind(this))}

                />
            )
        })
    }

    render() {

        const {className} = this.props

        return (
            <div className={className} style={parentStyles}>
                {this.renderStars()}
            </div>
        )
    }
}

StarRate.propTypes = {
    className: PropTypes.string,
    edit: PropTypes.bool,
    value: PropTypes.number,
    count: PropTypes.number,
}

StarRate.defaultProps = {
    edit: true,
    value: 0,
    count: 5,
    onChange: () => {
    }
};


export default StarRate;

