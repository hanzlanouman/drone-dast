// socket.js
import io from 'socket.io-client';

const socket = io('http://localhost:9033'); // Use the appropriate server URL

export default socket;
