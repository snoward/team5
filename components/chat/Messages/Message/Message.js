import React from 'react';
import { MessageBox } from 'react-chat-elements';

import Metadata from './Metadata/Metadata.js';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: props.currentUser,
            text: props.text,
            author: props.author,
            date: props.date,
            metadata: props.metadata,
            onMessageTitleClick: props.onMessageTitleClick,
            saveElementForScroll: props.saveElementForScroll
        };
    }

    render() {
        const side = this.state.author === this.state.currentUser ? 'right' : 'left';

        return <div ref={this.state.saveElementForScroll}>
            <MessageBox
                position={side}
                avatar={`/api/avatar/${this.state.author}`}
                title={this.state.author}
                onTitleClick={() => this.state.onMessageTitleClick(this.state.author)}
                type={'text'}
                text={this.state.text}
                date={new Date(this.state.date)}
                renderAddCmp={() => {
                    return this.state.metadata
                        ? <Metadata metadata={this.state.metadata}/>
                        : undefined;
                }}
            />
        </div>;
    }
}
