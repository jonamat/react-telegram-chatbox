import { ElementType, FC } from 'react';

export interface WidgetProps {
    /** Title of the widget */
    title?: string;
    /** Subtitle of the widget */
    subtitle?: string;
    /** The placeholder of the message input */
    senderPlaceHolder?: string;
    /** The profile image that will be set on the responses */
    profileAvatar?: string;
    /** The picture image that will be shown next to the chat title */
    titleAvatar?: string;
    /** Show or hide the close button in full screen mode */
    showCloseButton?: boolean;
    /** Allow the use of full screen in full desktop mode */
    fullScreenMode?: boolean;
    /** Autofocus or not the user input */
    autofocus?: boolean;
    /** Custom Launcher component to use instead of the default */
    launcher?: (handleToggle: any) => ElementType;
    /** Function to handle the user clicking a quick button, will receive the 'value' when clicked. */
    handleQuickButtonClicked?: any;
    /** Show time stamp on messages */
    showTimeStamp?: boolean;
    /** Chat container id for a11y */
    chatId?: string;
    /** Alt value for the launcher when closed */
    launcherOpenLabel?: string;
    /** Alt value for the launcher when open */
    launcherCloseLabel?: string;
    /** Send button alt for a11y purposes */
    sendButtonAlt?: string;
    /** Prop that triggers on input change */
    handleTextInputChange?: (event: any) => any;
    /** Prop that triggers when a message is submitted, used for custom validation */
    handleSubmit?: (event: any) => any;
}

export interface ChatboxProps {
    /** Token generated by TgSocketBot */
    token: string;
    /** Send a message on chatbox creation */
    welcomeMessage?: string;
    /** Delay for the welcomeMessage */
    welcomeMessageDelay?: number;
    /** Message to send if connection fall or cannot be established */
    errorMessage?: string;
    /** Props for react-chat-widget */
    widgetProps?: WidgetProps;
}

/** A chat widget connected to your Telegram account. See docs [here](https://github.com/jonamat/react-telegram-chatbox) */
export declare const Chatbox: FC<ChatboxProps>;

declare const lib: {
    /** A chat widget connected to your Telegram account. See docs [here](https://github.com/jonamat/react-telegram-chatbox) */
    Chatbox: FC<ChatboxProps>;
};
export default lib;