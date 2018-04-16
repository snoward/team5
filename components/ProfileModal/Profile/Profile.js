import React from 'react';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            handleCloseModal: props.handleCloseModal,
            githubUrl: props.githubUrl,
            avatarUrl: props.avatarUrl
        };
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="avatar">
                        <img src={this.state.avatarUrl} alt='Avatar' />
                    </div>
                    <div className="container">
                        <a className="user__link" href={this.state.githubUrl}>
                            {this.state.username}</a>
                    </div>
                </div>
                <button className="close" onClick={this.state.handleCloseModal}>close</button>
                <style jsx>{`
                    .user__link
                    {
                        margin-top: 15px;
                        color: black;
                    }
                    .close
                    {
                        position:relative;
                        left: 44%;
                        top: 10px;
                        background-color: coral;
                        border: none;
                        padding: 10px;
                    }

                        .close:hover
                    {
                        background-color: white;
                        color: black;

                    }

                    .card, .card *{
                        outline: none !important;
                        }

                    .card {
                        outline: none;
                        width: 100%
                        hight: 100%;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        font-family: 'Lato', sans-serif;
                        box-shadow: 0 4px 8px 0 rgba(255,160,122,0.5);
                        transition: 0.3s;
                        background: white;
                    }

                    /* On mouse-over, add a deeper shadow */
                    .card:hover {
                        box-shadow: 0 8px 6px 0 rgba(255,160,122,0.5);
                    }

                    /* Add some padding inside the card container */
                    .container {
                        text-align: center;
                        padding: 20px;
                    }

                    .avatar
                    {
                        align-self:center;
                    }
                    img
                    {
                        width: 100px;
                        height: 100px;
                        border-radius: 60%;
                    }
                `}
                </style>
            </div>
        );
    }
}
