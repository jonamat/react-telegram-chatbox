import { toggleInputDisabled, addResponseMessage } from 'react-chat-widget';
import SocketIOClient from 'socket.io-client';

import { TBS_HOST, TBS_PATH } from '../config';

const connect = (token) =>
    new Promise<SocketIOClient.Socket>((res, rej) => {
        // Disallow other messages until connection is established
        toggleInputDisabled();

        const socket = SocketIOClient.connect(TBS_HOST, {
            path: TBS_PATH,
            // @ts-expect-error socketIO missing declaration
            auth: { token },
        });

        socket.on('connect', () => {
            socket.on('message', (message: string) => {
                addResponseMessage(message);
            });

            // Re-enable input
            toggleInputDisabled();
            res(socket);
        });

        socket.on('connect_error', rej);
    });

export default connect;
