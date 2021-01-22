import React, { FC, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Widget, addResponseMessage } from 'react-chat-widget';

import { DEF_ERROR_MESSAGE } from '../config';
import { ChatboxProps } from '../types';
import connect from './connect';

const Chatbox: FC<ChatboxProps> = ({
    token,
    welcomeMessage,
    welcomeMessageDelay,
    errorMessage = DEF_ERROR_MESSAGE,
    widgetProps,
}) => {
    let socket: SocketIOClient.Socket | undefined;

    useEffect(() => {
        if (welcomeMessage) {
            if (welcomeMessageDelay) {
                setTimeout(() => addResponseMessage(welcomeMessage), welcomeMessageDelay);
            } else addResponseMessage(welcomeMessage);
        }
    }, []);

    const handleNewUserMessage = (message) => {
        // Connect on the first message
        if (!socket)
            connect(token)
                .then((_socket) => {
                    socket = _socket;

                    handleNewUserMessage(message);
                })
                .catch((error) => {
                    console.error(error);

                    addResponseMessage(errorMessage);
                });
        else socket.send(message);
    };

    return <Widget handleNewUserMessage={handleNewUserMessage} {...widgetProps} />;
};

Chatbox.propTypes = {
    token: PropTypes.string.isRequired,
    welcomeMessage: PropTypes.string,
    welcomeMessageDelay: PropTypes.number,
    errorMessage: PropTypes.string,
    widgetProps: PropTypes.object,
};

export default Chatbox;
