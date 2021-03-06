import React, { Component } from 'react';

import Welcome from '../Welcome/Welcome.jsx';
import Message from '../Welcome/Message.jsx';
class Banner extends Component {
    constructor (props) {
        super(props);
        this.state = {
            active: true
        };

        this.onCloseMessage = this.onCloseMessage.bind(this);
    }

    onCloseMessage (event) {
        event.preventDefault();
        this.closeMessageTimeoutActive = setTimeout(() => {
            this.setState({
                active: false
            });

            clearTimeout(this.closeMessageTimeoutActive);
        }, 150);

        this.closeMessageTimeoutPosition = setTimeout(() => {
            this.setState({
                style: {
                    position: 'relative'
                }
            });

            clearTimeout(this.closeMessageTimeoutPosition);
        }, 1450);
    }

    render () {
        if (!this.state.active) {
            return (
                <div
                    style={this.state.style}
                    className="App-banner non-active"
                />
            )
        }

        const { banner } = this.props;
        return (
            <div className="App-banner active">
                <Welcome onClose={this.onCloseMessage}>
                    <Message
                        title="Bem-vindo à"
                        text="PROFILES"
                        image={banner}
                    />
                </Welcome>
            </div>
        )
    }
}

export default Banner
