import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyStatic from 'fastify-static';
import boom from '@hapi/boom';
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

server.get('/data', async (req, rep) => {
  try {
    if (req.query !== {}) throw rep.send(boom.badRequest('Request has no parameter'));
    const params: server.queryParameter = req.query as any;
    if (!params.greet) throw boom.badRequest('`greet` was not founded');
    const greet = `Hello ${params.greet}`;
    rep.send(greet);
  } catch (e) {
    throw boom.internal(e);
  }
});

server.post('/data', async (req, rep) => {
  try {
    const body: server.requestBody = req.body as any;
    if (!body.param1) throw boom.badRequest('`param1` was not found');
    if (!body.param2) throw boom.badRequest('`param2` was not found');
    rep.send(body);
  } catch (e) {
    throw boom.internal(e);
  }
});

export default server;
