import React from 'react';

import './styles.css';

export default class Metadata extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href={this.props.metadata.url}>
                <div className='metadata'>
                    <a className='metadata__link' href={this.props.metadata.url}>
                        {this.props.metadata.title}
                    </a>
                    <img className='metadata__pic' src={this.props.metadata.image}
                        alt={this.props.metadata.title}/>
                    <div className='meatadata__text'>
                        {this.props.metadata.description}
                    </div>
                </div>
            </a>
        );
    }
}
