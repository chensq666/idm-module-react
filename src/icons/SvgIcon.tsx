import { Component } from 'react'
import './svg-icon.css'

interface IProp {
    iconClass: string
    className?: string
}

export default class SvgIcon extends Component<IProp> {
    static defaultProps = {
        className: ''
    }
    get isExternal() {
        if (!this.props.iconClass) return false
        return /^(https?:|mailto:|tel:)/.test(this.props.iconClass)
    }
    get iconName() {
        return `#icon-${this.props.iconClass}`
    }
    get svgClass() {
        if (this.props.className) {
            return 'svg-icon ' + this.props.className
        } else {
            return 'svg-icon'
        }
    }
    get styleExternalIcon() {
        return {
            mask: `url(${this.props.iconClass}) no-repeat 50% 50%`,
            WebkitMask: `url(${this.props.iconClass}) no-repeat 50% 50%`
        }
    }

    render() {
        return (
            <>
                {this.isExternal ? (
                    <div style={this.styleExternalIcon} className="svg-external-icon svg-icon" />
                ) : (
                    <svg className={this.svgClass} aria-hidden="true">
                        <use xlinkHref={this.iconName} />
                    </svg>
                )}
            </>
        )
    }
}
