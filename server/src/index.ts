import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets: WebSocket[] = [];

wss.on('connection', (socket) => {
  allSockets.push(socket);

  console.log('user connected');
  userCount = userCount + 1;
  console.log(userCount);

  socket.on('message', (message) => {
    console.log('got msg ' + message.toString());
    for (let i = 0; i < allSockets.length; i++) {
      const s = allSockets[i];
      s.send(message.toString() + ': sent from server');
    }
  });
});
