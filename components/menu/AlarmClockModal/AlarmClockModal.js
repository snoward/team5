import React from 'react';
import ReactModal from 'react-modal';

import AlarmClock from './AlarmClock/AlarmClock';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            showModal: nextProps.showModal,
            handleCloseModal: nextProps.handleCloseModal
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
                        backgroundColor: 'rgb(255,255,255)',
                        margin: 'auto',
                        width: 400,
                        height: 500,
                        border: null,
                        boxShadow: '0 0 5px #9e9e9e'
                    }
                }}
            >

                <AlarmClock
                    handleCloseModal={this.state.handleCloseModal}
                />
            </ReactModal>);
    }
}
