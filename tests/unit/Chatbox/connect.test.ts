/* ----------------------------- Unit test suite ---------------------------- *
 *
 * Target: Connect fn
 * Tests:
 * - Widget input toggling
 * - Message handling
 * - Error handling
 *
 * -------------------------------------------------------------------------- */

import '@testing-library/jest-dom/extend-expect';
import { mocked } from 'ts-jest/utils';
import connect from '@App/Chatbox/connect';
import { toggleInputDisabled, addResponseMessage } from 'react-chat-widget';

/* -------------------------------------------------------------------------- */
/*                                    Mocks                                   */
/* -------------------------------------------------------------------------- */

const mockToggleInputDisabled = mocked(toggleInputDisabled);
const mockAddResponseMessage = mocked(addResponseMessage);
jest.mock('react-chat-widget', () => ({
    toggleInputDisabled: jest.fn(),
    addResponseMessage: jest.fn(),
}));

const mockOnConnect = jest.fn();
const mockOnConnectError = jest.fn();
const mockOnMessage = jest.fn();
jest.mock('socket.io-client', () => ({
    connect: () => ({
        on: (event, callback) => {
            switch (event) {
                case 'connect':
                    return mockOnConnect(callback);
                case 'message':
                    return mockOnMessage(callback);
                case 'connect_error':
                    return mockOnConnectError(callback);
            }
        },
        isSocketInstance: true,
    }),
}));

const token = 'fakeToken';

/* -------------------------------------------------------------------------- */
/*                              Bridge operations                             */
/* -------------------------------------------------------------------------- */

beforeEach(() => {
    jest.clearAllMocks();
});

/* -------------------------------------------------------------------------- */
/*                               Render wrapper                               */
/* -------------------------------------------------------------------------- */

/**
 * Run the function with the custom configuration
 * @param customToken Override default token
 */
const run = (customToken?: string) => {
    return connect(customToken || token);
};

/* -------------------------------------------------------------------------- */
/*                                    Tests                                   */
/* -------------------------------------------------------------------------- */

describe('Connect fn', () => {
    it('disable user input until connection', () => {
        run();
        expect(mockOnConnect).toBeCalledTimes(1);
        mockOnConnect.mock.calls[0][0]();

        expect(mockToggleInputDisabled).toBeCalledTimes(2);
    });
    it('sends payload to addResponseMessage callback if a message arrives', () => {
        run();
        expect(mockOnConnect).toBeCalledTimes(1);
        mockOnConnect.mock.calls[0][0]();

        expect(mockOnMessage).toBeCalledTimes(1);
        mockOnMessage.mock.calls[0][0]();

        expect(mockAddResponseMessage).toBeCalledTimes(1);
    });
    it('resolves and return a socket instance if connection is established successfully', async () => {
        mockOnConnect.mockImplementationOnce((cb) => cb());

        // @ts-expect-error mocked
        const { isSocketInstance } = await run();

        expect(isSocketInstance).toBe(true);
    });
    it('throws an error if connection cannot be established', () => {
        mockOnConnectError.mockImplementationOnce((cb) => cb('error!'));

        return run().catch((error) => expect(error).toBe('error!'));
    });
});
