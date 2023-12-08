import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import io, { Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'https://alfred-server.up.railway.app';

interface Message {
  senderId: string;
  content: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const router = useRouter();
  const { talentId, partnerId } = router.query;

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { talentId, partnerId },
    });

    // Listen for incoming messages
    socketRef.current.on('newChatMessage', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [talentId, partnerId]);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (input.trim() && socketRef.current) {
      socketRef.current.emit('chatMessage', {
        content: input,
        senderId: talentId,
        receiverId: partnerId,
      });

      // Add message to local state
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId: talentId as string, content: input },
      ]);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <ul>
        {messages.map((message, index) => (
          <li
            key={index}
            className={message.senderId === talentId ? 'sent' : 'received'}
          >
            {message.content}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
