import React from 'react';

export default class Metadata extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a className="noDecoration" href={this.props.metadata.url}>
                <div className="metadata">
                    <a className="link" href={this.props.metadata.url}>
                        {this.props.metadata.title}
                    </a>
                    <img className="pic" src={this.props.metadata.image}
                        alt={this.props.metadata.title}/>
                    <div className="text">
                        {this.props.metadata.description}
                    </div>
                    <style jsx>
                        {`
                        .metadata
                        {
                            text-align: center;
                            display: flex;
                            width: 15%;
                            flex-direction: column;
                            justify-content: space-around;
                            font-family: 'Lato', sans-serif;
                            margin: 10px;
                            padding: 10px;
                            border: 1px solid grey;
                        }
                        .metadata:hover
                        {
                            background: rgb(255, 229, 204);
                        }

                        .link
                        {
                            color: rgb(57, 121, 170);
                        }
                        .pic
                        {
                            margin-top: 10px;
                            max-width:100%;
                            border-radius: 10%;
                        }
                        .text
                        {
                            font-size: 14px;
                            text-decoration: underline !important;
                            color:rgb(0, 0, 0);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                        }
                    `}
                    </style>
                </div>
            </a>
        );
    }
}
