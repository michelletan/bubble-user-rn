import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Button } from 'native-base';
import { Styles } from '../styles/Styles';
import { Actions } from 'react-native-router-flux';
import { connect as connectRedux } from 'react-redux';

export class ChatComponent extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { messages: this.parseMessages(this.props.chat.messages) };
        this.onSend = this.onSend.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
    }

    parseMessages(messages) {
        parsed = [];
        for (var i = messages.length - 1; i >= 0; --i) {
            var messageOrg = messages[i];
            var avatar = 'http://flathash.com/' + messageOrg.userId;
            var messageParsed = {
                _id: messageOrg.id,
                text: messageOrg.content,
                createdAt: messageOrg.createdAt,
                user: {
                    _id: messageOrg.userId,
                    name: 'Anonymous',
                    avatar: avatar,
                },
            };

            parsed.push(messageParsed);
        }
        return parsed;
    }

    updateMessage(data) {
        // console.log(data);
        var avatar = 'http://flathash.com/' + data.userId;
        var messages = [
            {
                _id: new Date().toString + data.message,
                text: data.message,
                createdAt: new Date(),
                user: {
                    _id: data.userId,
                    name: 'Anonymous',
                    avatar: avatar,
                },
            },
        ];

        this.setState({
            messages: GiftedChat.append(this.state.messages, messages),
        });
    }

    componentWillDismount() {
        this.updateMessage = () => { };
        this.onSend = () => { };
    }

    componentDidMount() {
        // this.setState({ messages: this.parseMessages(this.props.chat.messages) });
        // UPDATE LISTENER TO BE PLACED IN COMPONENT
        this.props.socket.on('add_message', this.updateMessage);
    }

    onSend(messages = []) {
        if (messages.length > 0) {
            var message = messages[0];

            var parsedMessage = {
                roomId: this.props.roomId,
                user: this.props.user,
                message: message.text
            };

            this.props.onSend(parsedMessage);
            this.setState({
                messages: GiftedChat.append(this.state.messages, messages),
            });
        }
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                    _id: this.props.user,
                }}
                isAnimated={true}
                />
        );
    }
}

function getMessage(state) {
    let socket = state.socketHandler.socket;

    return {
        socket: socket
    }
}

export default connectRedux(getMessage)(ChatComponent);