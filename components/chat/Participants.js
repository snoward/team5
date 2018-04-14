import axios from 'axios';
import React from 'react';

export default class Participants extends React.Component {
    constructor(props) {
        super(props);
        this.state = { participants: [] };
        this.componentWillReceiveProps(props);
    }

    async componentWillReceiveProps(nextProps) {
        const conversations = await axios.get('api/conversations',
            { withCredentials: true, responseType: 'json' })
            .then(res => res.data);
        for (let conversation of conversations) {
            if (conversation.id === nextProps.conversationId) {
                this.setState({ participants: conversation.users });
            }
        }
    }

    render() {
        return (
            <div className='participants-container'>
                <ol className='participants-list'>
                    {this.state.participants.map((elem, idx) => {
                        return <div key={idx} className="participant">{elem}</div>;
                    })}
                </ol>
                <style jsx>
                    {`
                        .participants-container
                        {
                            clear: left;
                            left: -35px;
                            font: 12px;
                            border: 2px solid;
                            width: 160px;
                            margin: 0;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    `}
                </style>
            </div >
        );
    }
}
