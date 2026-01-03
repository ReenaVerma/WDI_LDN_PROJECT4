import React from 'react';
import Flash from '../../lib/Flash';

const FlashMessages = () => {

  const messages = Flash.getMessages();
  Flash.clearMessages();

  return (

    // DISPLAY FLASH MESSAGES IN A DIV
    // we turned object into an array with object.key, so we can map it
    // we cant map an object only an array
    // multi-messages: type will be danger first and then success.
    <div>
      {messages && Object.keys(messages).map((type, i) =>
        <div key={i} className={`notification is-${type}`}> {messages[type]} </div>
        // {messages[type]} is the same as messages.type
      )}
    </div>
  );
};

export default FlashMessages;
