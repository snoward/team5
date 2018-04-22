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
                <div className="card">
                    <div className="avatar">
                        <img src={this.state.avatarUrl} alt='Avatar' />
                    </div>
                    <div className="container">
                        <a className="user__link" href={this.state.githubUrl}>
                            {this.state.username}</a>
                    </div>
                </div>
                <button className="close" onClick={this.state.handleCloseModal}>close</button>
            </div>
        );
    }
}
