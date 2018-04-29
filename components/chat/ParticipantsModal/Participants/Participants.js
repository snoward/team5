import React from 'react';

import { getConversationInfo } from '../../../../lib/apiRequests';

import './styles.css';

export default class Participants extends React.Component {
    constructor(props) {
        super(props);
        this.state = { participants: [] };
        this.updateParticipants(props.conversationId);
    }

    async updateParticipants(conversationId) {
        const conversation = await getConversationInfo(conversationId)
            .then(res => res.data);

        this.setState({
            participants: conversation.users
        });
    }

    render() {
        return (
            <div className='participants-container'>
                <ol>
                    {this.state.participants.map((elem, idx) => {
                        return <div key={idx}>{elem}</div>;
                    })}
                </ol>
            </div >
        );
    }
}
