const {messageList} = require('./message.js');

const getMessage = (messageCode) => {
    try {
        return messageList[messageCode];
    } catch (error) {
        console.error('Error reading message.json:', error);
        throw error;
    }
};


module.exports = getMessage