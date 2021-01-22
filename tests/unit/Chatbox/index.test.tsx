/* ----------------------------- Unit test suite ---------------------------- *
 *
 * Target: Chatbox component
 * Tests:
 * - Props validation
 * - Functionality
 * - Matching render snapshot
 *
 * -------------------------------------------------------------------------- */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { create } from 'react-test-renderer';
import { mocked } from 'ts-jest/utils';
import SocketIOClient from 'socket.io-client';

import connect from '@App/Chatbox/connect';
import { ChatboxProps } from '@App/types';
import { DEF_ERROR_MESSAGE } from '@App/config';

/* -------------------------------------------------------------------------- */
/*                                    Mocks                                   */
/* -------------------------------------------------------------------------- */

const mockedConnect = mocked(connect);
jest.mock('@App/Chatbox/connect', () => jest.fn(() => Promise.resolve({ send: () => undefined })));

const mockedSocketConnect = mocked(SocketIOClient.connect);
jest.mock('socket.io-client', () => ({
    connect: jest.fn(),
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
 * Render the component with the custom configuration
 * @param props Component props
 */
const renderComponent = (props?: Partial<ChatboxProps>) => {
    let Chatbox;

    // Isolation is required for react-chat-widget
    jest.isolateModules(() => {
        Chatbox = require('@App/index').Chatbox;
    });

    return render(<Chatbox token={token} {...props} />);
};

/* -------------------------------------------------------------------------- */
/*                                    Tests                                   */
/* -------------------------------------------------------------------------- */

describe('Chatbox component', () => {
    it('renders properly', () => {
        expect(() => {
            renderComponent();
        }).not.toThrowError();
    });
    it('does not open connection on component creation', () => {
        renderComponent();

        expect(mockedSocketConnect).not.toBeCalled();
    });
    it('opens connection on first message', async () => {
        const { getByAltText, getByPlaceholderText } = renderComponent({
            widgetProps: { autofocus: true },
        });
        userEvent.click(getByAltText('Close chat'));

        /*
            JSDOM submit event does not provide submitters
            --> https://github.com/jsdom/jsdom/issues/3117

            userEvent.type(getByPlaceholderText('Type a message...'), 'first message!');
            userEvent.click(getByAltText('Send'));

            Force submit with a custom event
        */

        const workaround = getByPlaceholderText('Type a message...') as HTMLInputElement & { message: any };
        workaround.message = {
            value: 'first message!',
        };
        workaround.dispatchEvent(new window.Event('submit', { bubbles: true }));

        expect(mockedConnect).toBeCalledTimes(1);
    });
    it('shows welcome message if defined', () => {
        const { queryByText, getByAltText } = renderComponent({
            welcomeMessage: 'hi!',
        });

        // Open widget
        userEvent.click(getByAltText('Close chat'));

        expect(queryByText('hi!')).toBeTruthy();
    });
    it('shows welcome message after delay if welcomeMessageDelay is defined', () => {
        jest.useFakeTimers();
        const { queryByText, getByAltText } = renderComponent({
            welcomeMessage: 'hi!',
            welcomeMessageDelay: 1000,
        });

        // Open widget
        userEvent.click(getByAltText('Close chat'));

        expect(queryByText('hi!')).toBeFalsy();

        jest.advanceTimersByTime(1000);

        expect(queryByText('hi!')).toBeTruthy();
    });
    it('uses errorMessage if defined', async () => {
        mockedConnect.mockImplementationOnce(() => Promise.reject('connection lost'));
        const { queryByText, getByAltText, getByPlaceholderText } = renderComponent({
            errorMessage: 'custom',
        });

        // Open widget
        userEvent.click(getByAltText('Close chat'));

        const workaround = getByPlaceholderText('Type a message...') as HTMLInputElement & { message: any };
        workaround.message = {
            value: 'first message!',
        };
        workaround.dispatchEvent(new window.Event('submit', { bubbles: true }));

        await waitFor(() => expect(queryByText('custom')).toBeTruthy());
    });
    it('uses default error if errorMessage is undefined', async () => {
        mockedConnect.mockImplementationOnce(() => Promise.reject('connection lost'));
        const { queryByText, getByAltText, getByPlaceholderText } = renderComponent();

        // Open widget
        userEvent.click(getByAltText('Close chat'));

        const workaround = getByPlaceholderText('Type a message...') as HTMLInputElement & { message: any };
        workaround.message = {
            value: 'first message!',
        };
        workaround.dispatchEvent(new window.Event('submit', { bubbles: true }));

        await waitFor(() => expect(queryByText(DEF_ERROR_MESSAGE)).toBeTruthy());
    });
    it('passes widgetProps to Widget component', () => {
        const { queryByText, getByAltText, getByPlaceholderText } = renderComponent({
            widgetProps: {
                title: 'custom title',
            },
        });

        // Open widget
        userEvent.click(getByAltText('Close chat'));

        expect(queryByText('custom title')).toBeTruthy();
    });
    it('validates props', () => {
        console.error = jest.fn();

        // @ts-expect-error validation test
        renderComponent({ errorMessage: 123 });
        // @ts-expect-error validation test
        renderComponent({ token: 123 });
        // @ts-expect-error validation test
        renderComponent({ welcomeMessage: 123 });
        // @ts-expect-error validation test
        renderComponent({ welcomeMessageDelay: '123' });
        // @ts-expect-error validation test
        renderComponent({ widgetProps: 123 });

        expect(console.error).toBeCalledTimes(5);
    });
    it('matches the snapshot', () => {
        const snapshot = create(require('@App/index').Chatbox).toJSON();
        expect(snapshot).toMatchSnapshot();
    });
});
