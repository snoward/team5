import React, { Component } from 'react';
import './styles.css';

export default class LoadingSpinner extends Component {
    render() {
        return (<div className="spinner-container">
            <div className="loader loader-7">
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
            </div>
        </div>);
    }
}
