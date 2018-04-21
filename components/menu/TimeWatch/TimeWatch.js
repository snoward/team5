import React, { Component } from 'react';
import './styles.css';

export default class TimeWatch extends Component {
    state = {
        curTime: null
    };
    componentDidMount() {
        setInterval(() => {
            this.setState({
                curTime: new Date().toLocaleString()
            });
        }, 1000);
    }

    render() {
        return (
            <div className='last' >{this.state.curTime}
            </div>
        );
    }
}
