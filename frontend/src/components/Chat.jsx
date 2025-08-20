import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // In a real application, you'd fetch chat history for the authenticated user
  // useEffect(() => {
  //   fetchChatHistory();
  // }, []);

  // const fetchChatHistory = async () => {
  //   try {
  //     const response = await axios.get(`${config.backendUrl}/api/chat-history/`, {
  //       headers: {
  //         // 'Authorization': `Token YOUR_AUTH_TOKEN`
  //       }
  //     });
  //     setMessages(response.data);
  //   } catch (error) {
  //     console.error('Error fetching chat history:', error);
  //   }
  // };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = { text: newMessage, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage('');

    try {
      const response = await axios.post(`${config.backendUrl}/api/chat/`, {
        message: newMessage,
      });
      const aiResponse = { text: response.data.response, sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [...prevMessages, { text: 'Error: Could not get a response.', sender: 'ai' }]);
    }
  };

  return (
    <div>
      <h2>AI Chatbot</h2>
      <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll', padding: '10px', marginBottom: '10px' }}>
        {messages.length === 0 ? (
          <p>Start a conversation...</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', marginBottom: '5px' }}>
              <span style={{
                backgroundColor: msg.sender === 'user' ? '#dcf8c6' : '#f1f0f0',
                padding: '8px 12px',
                borderRadius: '15px',
                display: 'inline-block'
              }}>
                {msg.text}
              </span>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ width: '80%', padding: '8px' }}
        />
        <button type="submit" style={{ width: '18%', padding: '8px', marginLeft: '2%' }}>Send</button>
      </form>
    </div>
  );
}

export default Chat;
