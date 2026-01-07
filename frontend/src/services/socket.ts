let socket: WebSocket | null = null;

const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://localhost:3001'; 

export function connectSocket(): WebSocket {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(WS_URL);
  }

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
}

export function sendMessage(message: unknown) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;

  socket.send(JSON.stringify(message));
}