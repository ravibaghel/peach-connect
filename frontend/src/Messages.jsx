import React, { useState, useEffect } from 'react';
import { fetchMessages, sendMessage } from './api';

export default function Messages({ jwt }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchMessages(jwt).then(setMessages);
  }, [jwt]);

  const handleSend = async () => {
    if (input.trim()) {
      await sendMessage({ content: input }, jwt);
      setInput('');
      fetchMessages(jwt).then(setMessages);
    }
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-lg font-bold mb-2">Messages</h2>
      <div className="mb-2 h-40 overflow-y-auto border p-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1 text-sm">{msg.content}</div>
        ))}
      </div>
      <div className="flex">
        <input
          className="border p-1 flex-1 mr-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
