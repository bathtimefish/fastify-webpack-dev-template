import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyStatic from 'fastify-static';
import path from 'path';

const server = fastify();
server.register(fastifyCors, {
  exposedHeaders: ['X-Total-Count'],
});
server.register(fastifyStatic, {
  root: path.join(__dirname, '../public'),
  prefix: '/',
});
server.register(require('fastify-boom'));

server.get('/', async (_, rep) => {
  rep.sendFile('index.html');
});

// routers
server.register(require('./router/users'));

export default server;
