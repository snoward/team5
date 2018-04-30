import React from 'react';
import { Picker } from 'emoji-mart';

export default class EmojiPicker extends React.Component {
    constructor(props) {
        super(props);
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            recentEmoji: nextProps.recentEmoji,
            onEmojiSelect: nextProps.onEmojiSelect
        };
    }

    render() {
        return (
            <Picker
                recent={this.state.recentEmoji.length
                    ? this.state.recentEmoji
                    : ['smiley']
                }
                onClick={this.state.onEmojiSelect}
                showPreview={false}
                color='lightsalmon'
                set='emojione'
                style={{
                    position: 'absolute',
                    bottom: '75%',
                    right: '4%',
                    zIndex: 100
                }}
                i18n={{ categories: { recent: 'Last used' } }}
            />
        );
    }
}
