import React from 'react';

import './styles.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            handleCloseModal: props.handleCloseModal,
            githubUrl: props.githubUrl,
            avatarUrl: props.avatarUrl
        };
    }

    render() {
        return (
            <div>
                <div className='profile'>
                    <div className='profile__avatar'>
                        <img src={this.state.avatarUrl} alt='Avatar' />
                    </div>
                    <div className='profile__link-container'>
                        <a className='profile__link' href={this.state.githubUrl}>
                            {this.state.username}</a>
                    </div>
                </div>
                <button className='profile__close-button'
                    onClick={this.state.handleCloseModal}>close</button>
            </div>
        );
    }
}
