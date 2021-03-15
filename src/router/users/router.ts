import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { getAllHandler } from './getAll';
import { getOneSchema, getOneHandler } from './getOne';
import { postSchema, postHandler } from './post';
import { patchSchema, patchHandler } from './patch';
import { deleteHandler } from './delete';

const name = 'users';

const router =  function (server: FastifyInstance, _: any, next: any) {

  server.get('/users',  {
    handler: getAllHandler,
  });

  server.get('/users/:userId', {
    schema: getOneSchema,
    handler: getOneHandler,
  });

  server.post('/users',  {
    schema: postSchema,
    handler: postHandler,
  });

  server.patch('/users/:userId',  {
    schema: patchSchema,
    handler: patchHandler,
  });

  server.delete('/users/:userId',  {
    handler: deleteHandler,
  });

  next();
};

export default fastifyPlugin(router, {
  name,
  fastify: '3.x',
});
