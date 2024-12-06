import { useEffect, useState } from "react";

const WS_URL = "ws://ec2-13-235-71-155.ap-south-1.compute.amazonaws.com:8080";

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
