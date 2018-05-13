import React from 'react';
import Lightbox from 'react-image-lightbox';
import copy from 'copy-to-clipboard';
import Snackbar from 'material-ui/Snackbar';

import './styles.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        // eslint-disable-next-line
        const profileLink = window.location.origin + '/@' + props.username;
        this.state = {
            username: props.username,
            self: props.self,
            handleCloseModal: props.handleCloseModal,
            profileLink,
            githubUrl: props.githubUrl,
            isAvatarOpen: false,
            avatarUrl: props.avatarUrl,
            copied: false
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
                                imageCaption={this.state.username}
                            />
                        )}
                    </div>
                    <div className='profile__link-container'>
                        <a className='profile__link' href={this.state.githubUrl}>
                            {this.state.username}</a>
                        <p>
                            {this.state.self
                                ? <a className='profile__link'
                                    onClick={() => {
                                        copy(this.state.profileLink);
                                        this.setState({ copied: true });
                                        setTimeout(() => {
                                            this.setState({ copied: false });
                                        }, 3000);
                                    }}>
                                    {this.state.profileLink}</a>
                                : <a className='profile__link' href={this.state.profileLink}>
                                    {this.state.profileLink}</a>}
                        </p>
                    </div>
                </div>
                <button className='profile__close-button'
                    onClick={this.state.handleCloseModal}>close</button>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    open={this.state.copied}
                    disableWindowBlurListener={true}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id'
                    }}
                    message={<p id='message-id'>Ссылка скопирована</p>}
                />
            </div>
        );
    }
}
