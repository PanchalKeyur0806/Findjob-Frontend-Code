import { createContext, useContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const socketUrl = isDevelopment
    ? "http://localhost:7000"
    : import.meta.env.VITE_BACKEND_URL;

  const socket = useMemo(
    () =>
      io(socketUrl, {
        withCredentials: true,
      }),
    [socketUrl]
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
