import axios from 'axios';
import React from 'react';

export default class Participants extends React.Component {
    constructor(props) {
        super(props);
        this.state = { participants: [] };
    }

    async componentWillReceiveProps(nextProps) {
        console.info('in here');
        console.info(nextProps.conversationId);
        const conversations = await axios.get('api/conversations',
            { withCredentials: true, responseType: 'json' })
            .then(res => res.data);
        for (let conversation of conversations) {
            if (conversation.id === nextProps.conversationId) {
                this.state.participants = conversation.users;
            }
        }
        console.info(this.state.participants);

        // this.setState({
        //     participants: people.map(elem => JSON.parse(elem))
        // });
    }

    render() {
        return (
            <div className='participants-container'>
                <ol className='participants-list'>
                    {this.state.participants.map((elem, idx) => {
                        return <div key={idx} className="participant">elem.username</div>;
                    })}
                </ol>
                <style jsx>
                    {`
                            
                    `}
                </style>
            </div >
        );
    }
}
