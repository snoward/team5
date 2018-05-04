import React from 'react';
import Lightbox from 'react-image-lightbox';

import './styles.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        // eslint-disable-next-line
        const profileLink = window.location.origin + '/@' + props.username;
        this.state = {
            username: props.username,
            handleCloseModal: props.handleCloseModal,
            profileLink,
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
                        <p>
                            <a className='profile__link' href={this.state.profileLink}>
                                {this.state.profileLink}</a>
                        </p>
                    </div>
                </div>
                <button className='profile__close-button'
                    onClick={this.state.handleCloseModal}>close</button>
            </div>
        );
    }
}
