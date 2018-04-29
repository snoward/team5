import React from 'react';
import Lightbox from 'react-image-lightbox';

import './styles.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            handleCloseModal: props.handleCloseModal,
            githubUrl: props.githubUrl,
            isAvatarOpen: false,
            avatarUrl: props.avatarUrl
        };
    }

    render() {
        return (
            <div>
                <div className='profile'>
                    <div className='profile__avatar'>
                        <img
                            onClick={() => this.setState({ isAvatarOpen: true })}
                            src={this.state.avatarUrl} alt='Avatar' />
                        {this.state.isAvatarOpen && (
                            <Lightbox
                                mainSrc={this.state.avatarUrl}
                                onCloseRequest={() => this.setState({ isAvatarOpen: false })}
                                imageCaption = {this.state.username}
                            />
                        )}
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
