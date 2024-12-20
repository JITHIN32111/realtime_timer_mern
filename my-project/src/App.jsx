import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Connect to the backend server
const socket = io('http://localhost:3001');

const Timer = () => {
  const [elapsedTime, setElapsedTime] = useState(0); // Displayed elapsed time
  const [isRunning, setIsRunning] = useState(false); // Timer running state

  useEffect(() => {
    // Listen for timer updates from the backend
    socket.on('timerUpdate', (data) => {
      setElapsedTime(data.elapsedTime);
      setIsRunning(data.isRunning);
    });

    return () => {
      socket.off('timerUpdate'); // Cleanup on component unmount
    };
  }, []);

  const handleCheckIn = () => {
    socket.emit('checkIn'); // Emit a check-in event to the backend
  };

  const handleCheckOut = () => {
    socket.emit('checkOut'); // Emit a check-out event to the backend
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-4xl font-bold text-gray-800 mb-4">
        Timer: {elapsedTime} seconds
      </div>
      <div className="flex space-x-4">
        {!isRunning ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            onClick={handleCheckIn}
          >
            Check In
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;
