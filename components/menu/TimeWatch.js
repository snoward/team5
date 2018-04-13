import React, { Component } from 'react';

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
                <style jsx>{`                
                .last
                {
                    position: absolute;
                    top: 30px;
                    left: 115px;
                    font-family: 'Lato';
                    font-size: 11px;
                    font-weight: 400;
                    color: rgba(255,255,255,0.6);
                    cursor: default;
                }
                `}</style>
            </div>
        );
    }
}
