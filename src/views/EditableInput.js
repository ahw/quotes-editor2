import React, { Component } from 'react';

export default class EditableInput extends Component  {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const style = Object.assign(
            {},
            this.props.styleOverrides,
            this.state.focused
                ? this.props.focusStyleOverrides
                : {}
        );

        return (
            <input
                className={`EditableInput ${this.props.className}`}
                style={style}
                value={this.props.value}
                onChange={(e) => {
                    if (this.props.onChangeEvent) {
                        this.props.onChangeEvent(e);
                    } else {
                        this.props.onChange(e.target.value);
                    }
                }}
                onFocus={(e) => this.setState({ focused: true })}
                onBlur={(e) => this.setState({ focused: false })}
            />
        );
    }
}

EditableInput.defaultProps = {
    className: '',
    styleOverrides: {},
    focusStyleOverrides: {},
}