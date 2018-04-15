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

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentUser: nextProps.currentUser,
            text: nextProps.text,
            author: nextProps.author,
            date: nextProps.date,
            metadata: nextProps.metadata,
            onMessageTitleClick: nextProps.onMessageTitleClick,
            saveElementForScroll: nextProps.saveElementForScroll
        });
    }

    render() {
        const side = this.state.author === this.state.currentUser ? 'right' : 'left';

        if (this.state.metadata) {
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
                        return <Metadata metadata={this.state.metadata}/>;
                    }}
                />
            </div>;
        }

        return <div ref={this.state.saveElementForScroll}>
            <MessageBox
                position={side}
                avatar={`/api/avatar/${this.state.author}`}
                title={this.state.author}
                onTitleClick={() => this.state.onMessageTitleClick(this.state.author)}
                type={'text'}
                text={this.state.text}
                date={new Date(this.state.date)}
            />
        </div>;
    }
}
