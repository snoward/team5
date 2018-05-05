import React from 'react';

import { getConversationInfo } from '../../../../lib/apiRequests/conversations';

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
        // eslint-disable-next-line
        const inviteLink = conversation.isPrivate ? null : `${window.location.origin}/join/${conversationId}`;
        this.setState({
            participants: conversation.users,
            inviteLink
        });
    }

    render() {
        return (
            <div className='participants-container'>
                {this.state.inviteLink &&
                    <p className="invite-link">{this.state.inviteLink}</p>
                }
                <ol>
                    {this.state.participants.map((elem, idx) => {
                        return <div key={idx}>{elem}</div>;
                    })}
                </ol>
            </div >
        );
    }
}
