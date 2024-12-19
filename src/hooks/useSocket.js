import { useEffect, useState } from "react";

const WS_URL = "wss://new-chess-backend.onrender.com";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("connected");
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("disconnected");
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  return socket;
};
