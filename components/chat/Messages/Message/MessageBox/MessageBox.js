/* eslint-disable max-len */
import React from 'react';
import moment from 'moment';
const ReactMarkdown = require('react-markdown');
import Lightbox from 'react-image-lightbox';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: props.position,
            text: props.text,
            author: props.title,
            date: props.date,
            avatar: props.avatar,
            metadata: props.metadata,
            isAvatarOpen: false,
            onMessageTitleClick: props.onMessageTitleClick,
            saveElementForScroll: props.saveElementForScroll,
            curTime: null
        };
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({
                curTime: this.state.date && !isNaN(this.state.date) && (
                    this.state.dateString ||
                    moment(this.state.date).fromNow()
                )
            });
        }, 1000);
    }


    render() {

        return <div>
            <li
                className = {this.state.position} >
                <div
                    className = "avatar" > <img
                        onClick={() => this.setState({ isAvatarOpen: true })}
                        src = {this.state.avatar}
                        draggable = "false"/>
                    {this.state.isAvatarOpen && (
                        <Lightbox
                            mainSrc={this.state.avatar}
                            onCloseRequest={() => this.setState({ isAvatarOpen: false })}
                            imageCaption = {this.state.author}
                        />
                    )}</div>
                <div className="msg">
                    <a onClick={this.props.onTitleClick}>{this.state.author}</a>
                    <ReactMarkdown renderers={{
                        linkReference: (reference) => {
                            if (!reference.href) {
                                return `[ ${reference.children[0]} ]`;
                            }

                            return <a href={reference.$ref}>{reference.children}</a>;
                        }
                    }}
                    source={this.state.text} />
                    <time>{this.state.curTime}</time>
                </div>
                <style jsx>
                    {`
                a
                {
                    cursor: pointer;
                }
                .other .msg {
                    order: 1;
                    border-top-left-radius: 0px;
                    box-shadow: -1px 2px 0px #D4D4D4;
                }
                .other:before {
                    content: "";
                    position: relative;
                    top: 0px;
                    right: 0px;
                    left: 40px;
                    width: 0px;
                    height: 0px;
                    border: 5px solid #fff;
                    border-left-color: transparent;
                    border-bottom-color: transparent;
                }

                .self {
                    justify-content: flex-end;
                    align-items: flex-end;
                }
                .self .msg {
                    order: 1;
                    border-bottom-right-radius: 0px;
                    box-shadow: 1px 2px 0px #D4D4D4;
                }
                .self .avatar {
                    order: 2;
                }
                .self .avatar:after {
                    content: "";
                    position: relative;
                    display: inline-block;
                    bottom: 19px;
                    right: 0px;
                    width: 0px;
                    height: 0px;
                    border: 5px solid #fff;
                    border-right-color: transparent;
                    border-top-color: transparent;
                    box-shadow: 0px 2px 0px #D4D4D4;
                }

                .msg {
                    background: white;
                    min-width: 130px;
                    max-width: 260px;
                    width: max-content;
                    margin-right: 17px;
                    word-wrap: break-word;
                    padding: 10px;
                    border-radius: 32px;
                    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.07);
                }
                .msg time {
                    font-size: 0.8rem;
                    margin: 0 0 0.2rem 0;
                    color: #777;
                }
                .msg img {
                    position: relative;
                    display: block;
                    width: 450px;
                    border-radius: 5px;
                    box-shadow: 0px 0px 3px #eee;
                    transition: all .4s cubic-bezier(0.565, -0.260, 0.255, 1.410);
                    cursor: default;
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                }
                @media screen and (max-width: 800px) {
                    .msg img {
                        width: 300px;
                    }
                }
                @media screen and (max-width: 550px) {
                    .msg img {
                        width: 200px;
                    }
                }

                .msg time {
                    font-size: 0.7rem;
                    color: #ccc;
                    display: flex;
                    margin-top: 3px;
                    float: right;
                    cursor: default;
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                }
                .msg time:before{
                    content:"\\f017";
                    color: #ddd;
                    font-family: FontAwesome, serif;
                    display: inline-block;
                    margin-right: 4px;
                }
                                `}
                </style>
            </li>
            {this.props.renderAddCmp()}

        </div>;
    }
}
