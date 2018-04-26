import React, { Component } from 'react';
import './styles.css';

export default class LoadingSpinner extends Component {
    render() {
        return (<div className="spinner-container">
            <div class="loader loader-7">
                <div class="line line1"></div>
                <div class="line line2"></div>
                <div class="line line3"></div>
            </div>
        </div>);
    }
}
