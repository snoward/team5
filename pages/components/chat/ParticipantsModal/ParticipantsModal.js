import React from 'react';
import ReactModal from 'react-modal';

import Participants from './Participants/Participants';

export default class ParticipantsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            showModal: nextProps.showModal,
            handleCloseModal: nextProps.handleCloseModal,
            conversationId: nextProps.conversationId
        };
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
                <Participants
                    conversationId={this.state.conversationId}
                />
            </ReactModal>);
    }
}
