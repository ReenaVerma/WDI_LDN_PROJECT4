import React from 'react';
import Flash from '../../lib/Flash';
import '../../assets/scss/main.scss';

const FlashMessages = () => {

  const messages = Flash.getMessages();
  Flash.clearMessages();

  return (

    // display flash messages as div.
    // if there are multiple messages, multiple will come through
    <div className="container">
      {/* we turned object into an array with object.key, so we can map it */}
      {/* we cant map an object only an array */}
      {messages && Object.keys(messages).map((type, i) =>
        <div key={i} className={`notification is-${type}`}> {messages[type]} </div>
        // {messages[type]} is the same as messages.type

      )}
    </div>
  );
};

// danger:  'this will self destruct in 5 seconds'
// success: 'welcome back Mr Bond'
// type will be danger first and then siuccess.
// messages will be 'this will self destruct in 5 seconds' and then 'welcome back Mr Bond' last
export default FlashMessages;
