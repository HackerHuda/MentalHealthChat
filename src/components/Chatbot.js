import React, { useState } from 'react';
import Message from './Mesage.js';
import UserInput from './UserInput.js';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I help you today?', sender: 'bot' }
  ]);

  const sendMessage = async (text) => {
    const newMessages = [...messages, { text, sender: 'user' }];
    setMessages(newMessages);

    const botResponse = await getBotResponse(text);
    setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
  };

  const getBotResponse = async (message) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/chat', { message });
      return response.data.reply;
    } catch (error) {
      console.error(error);
      return 'Sorry, something went wrong.';
    }
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <UserInput sendMessage={sendMessage} />
    </div>
  );
};

export default Chatbot;
