import React from 'react';
import ReactModal from 'react-modal';

import Profile from './Profile/Profile.js';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: props.showModal,
            username: props.username,
            handleCloseModal: props.handleCloseModal,
            githubUrl: 'https://github.com/' + props.username,
            avatarUrl: props.avatarUrl
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.showModal,
            username: nextProps.username,
            handleCloseModal: nextProps.handleCloseModal,
            githubUrl: 'https://github.com/' + nextProps.username,
            avatarUrl: nextProps.avatarUrl
        });
    }

    render() {
        return (
            <ReactModal
                isOpen={this.state.showModal}
                onRequestClose={this.state.handleCloseModal}
                shouldCloseOnOverlayClick={true}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        justifyContent: 'center',
                        zIndex: 1000
                    },
                    content: {
                        backgroundColor: 'rgba(0,0,0,0.0)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        margin: 'auto',
                        width: 400,
                        height: 220,
                        border: null
                    }
                }}
            >
                <Profile
                    username={this.state.username}
                    handleCloseModal={this.state.handleCloseModal}
                    githubUrl={this.state.githubUrl}
                    avatarUrl={this.state.avatarUrl}
                />
            </ReactModal>);
    }
}
