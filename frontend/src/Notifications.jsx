import React, { useEffect, useState } from 'react';
import { fetchNotifications } from './api';

export default function Notifications({ jwt }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications(jwt).then(setNotifications);
    const interval = setInterval(() => {
      fetchNotifications(jwt).then(setNotifications);
    }, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, [jwt]);

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-lg font-bold mb-2">Notifications</h2>
      <ul className="list-disc pl-5">
        {notifications.map((note, idx) => (
          <li key={idx} className="mb-1 text-sm">{note.content}</li>
        ))}
      </ul>
    </div>
  );
}
