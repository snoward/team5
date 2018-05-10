import React from 'react';
import Lightbox from 'react-image-lightbox';


export default class ImageMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: props.image,
            author: props.author,
            isImageOpen: false
        };
    }

    render() {

        return <div>
            <img
                onClick={() => this.setState({ isImageOpen: true })}
                src={this.state.image}/>
            {
                this.state.isImageOpen && (
                    <Lightbox
                        mainSrc={this.state.image}
                        onCloseRequest={() => this.setState({ isImageOpen: false })}
                        imageCaption={`Sender: ${this.state.author}`}
                    />
                )
            }
        </div>;
    }
}
