import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import copy from 'copy-to-clipboard';
import Snackbar from 'material-ui/Snackbar';

import { getConversationInfo } from '../../../../lib/apiRequests/conversations';

import './styles.css';

export default class Participants extends React.Component {
    constructor(props) {
        super(props);
        this.state = { participants: [], copied: false };
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
                <Button onClick={()=>{
                    copy(this.state.inviteLink);
                    this.setState({ copied: true });
                }}>
                    Скопировать ссылку на чат  {this.state.copied ? <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        open={this.state.copied}
                        autoHideDuration={6000}
                        ContentProps={{
                            'aria-describedby': 'message-id'
                        }}
                        message={<span id="message-id">Ссылка скопирована</span>}
                    /> : null}
                </Button>
                }
                <List component="nav">
                    {this.state.participants.map((elem, idx) => {
                        return <ListItem>
                            <Button href={`/@${elem}`} className='invite-link'>
                                <Avatar>
                                    <img className='avatar_icon' src={`/api/avatar/${elem}`}/>
                                </Avatar>
                                <ListItemText key={idx} inset primary={elem}/>
                            </Button>
                        </ListItem>;
                    })}
                </List>
            </div >
        );
    }
}
