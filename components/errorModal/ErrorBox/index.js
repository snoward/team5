import React from 'react';

import './styles.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: props.error,
            handleCloseModal: props.handleCloseModal,
            avatarUrl: props.avatarUrl
        };
    }

    render() {
        return (
            <div>
                <div className='error'>
                    <div className='error__icon'>
                        ⚠️
                    </div>
                    <div className='error__message-container'>
                        <p>{this.state.error}</p>
                    </div>
                </div>
                <button className='error__close-button'
                    onClick={this.state.handleCloseModal}>close</button>
            </div>
        );
    }
}
