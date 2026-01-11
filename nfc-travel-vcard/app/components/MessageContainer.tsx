import React from 'react';

interface MessageContainerProps {
    message: string;
    type: 'success' | 'error' | 'info'|'none';
}

const MessageContainer: React.FC<MessageContainerProps> = ({ message, type }) => {
    const messageClass = type === 'error' ? 'error-message' : 
                         type === 'success' ? 'success-message' : 
                         'info-message';

    return (
        <div className={messageClass}>
            {message}
        </div>
    );
};

export default MessageContainer;