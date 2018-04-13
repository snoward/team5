import axios from 'axios';
import React from 'react';

export default class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    async handleSubmit(event) {
        const self = this;
        event.preventDefault();
        await axios.post(`api/messages/${this.props.conversationId}`,
            { 'text': self.state.value },
            { withCredentials: true, responseType: 'json' });

        this.setState({ value: '' });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <input className={'hidden'} type="submit" value="Submit" />
                    <style jsx>
                        {`               
                        input
                        {
                            position: fixed;
                            bottom: 0px;
                            left: 53.6%;
                            width: 40.5%;
                            height: 16%;
                            z-index: 99;
                            background: white;
                            outline: none;
                            padding-left: 5px;
                            padding-right: 55px;
                            color: #666;
                            font-weight: 400;
                            resize: none;
                            overflow-y: scroll;
                            border: solid 5px lightsalmon;
                        }
                        .hidden
                        {
                        display:none;
                        }
                    `}
                    </style>
                </form>
            </div>
        );
    }
}
