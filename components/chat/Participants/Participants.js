import axios from 'axios';
import React from 'react';

import './styles.css';

export default class Participants extends React.Component {
    constructor(props) {
        super(props);
        this.state = { participants: [] };
        this.updateParticipants(props.conversationId);
    }

    async updateParticipants(conversationId) {
        const conversation = await axios.get(`api/conversations/${conversationId}`,
            { withCredentials: true, responseType: 'json' })
            .then(res => res.data);

        this.setState({
            participants: conversation.users
        });
    }

    render() {
        return (
            <div className='participants-container'>
                <ol className='participants-list'>
                    {this.state.participants.map((elem, idx) => {
                        return <div key={idx} className="participant">{elem}</div>;
                    })}
                </ol>
            </div >
        );
    }
}
