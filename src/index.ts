import { createServer } from 'http';
import app from './app.js';

const normalizePort = (val: string) => {
  const port = parseInt(val, 10); // tslint:disable-line:no-shadowed-variable

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

// const errorHandler = (error: Error) => {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }
//   const address = server.address();
//   const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges.');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use.');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// };

const server = createServer(app);

// server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind); // tslint:disable-line:no-console
});

server.listen(port);