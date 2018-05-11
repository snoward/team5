import React from 'react';
import ReactModal from 'react-modal';
import ErrorBox from '././ErrorBox';
export default class ErrorModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            showModal: nextProps.showModal,
            error: nextProps.error,
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
                        backgroundColor: 'rgba(0,0,0,0.0)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        margin: 'auto',
                        width: 400,
                        height: 255,
                        border: null
                    }
                }}
            >
                <ErrorBox
                    error={this.state.error}
                    handleCloseModal={this.state.handleCloseModal}
                />
            </ReactModal>
        );
    }
}
