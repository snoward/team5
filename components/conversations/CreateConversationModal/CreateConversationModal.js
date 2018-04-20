import React from 'react';
import ReactModal from 'react-modal';

import CreateConversationForm from './CreateConversationForm/CreateConversationForm.js';

export default class CreateConversationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            isOpen: nextProps.isOpen,
            handleCloseModal: nextProps.handleCloseModal
        };
    }

    render() {
        return (
            <ReactModal
                isOpen={this.state.isOpen}
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
                <CreateConversationForm
                    handleCloseModal={this.state.handleCloseModal}
                    currentUser={this.props.currentUser}
                />
            </ReactModal>);
    }
}
