// import React from 'react';
// import logo from './logo.svg';
import "./App.css";
import GameBoard from "./GameBoard";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from 'react';

function App() {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);
    return () => { newSocket.close(); }
  }, [setSocket]);

  if (socket == null) {
    return null;
  }

  return (
    <div>
      <div className="heading-container">
        <h1>Worduel</h1>
      </div>
      <GameBoard socket={socket} />
    </div>
  );
}

export default App;
