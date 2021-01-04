import { FastifyInstance, FastifySchema, RouteHandlerMethod } from 'fastify';
import boom from '@hapi/boom';
import fastifyPlugin from 'fastify-plugin';

const name = 'users';

const users: IServer.user[] = [
  {
    id: 1,
    name: 'Elvis Carlson',
    address: '1508 Allison Avenue',
    birthday: '09/04/95',
    sex: 'man',
  },
  {
    id: 2,
    name: 'Primrose Delarosa',
    address: '1465 Edwards Street',
    birthday: '08/12/01',
    sex: 'woman',
  },
  {
    id: 3,
    name: 'Elise Lindsay',
    address: '1682 Peaceful Lane',
    birthday: '02/06/85',
    sex: 'woman',
  },
];

const router =  function (server: FastifyInstance, _: any, next: any) {
  // getAll
  server.get('/users', async (_, rep) => {
    try {
      rep.header('X-Total-Count', users.length);
      rep.send(users);
    } catch (e) {
      throw boom.internal(e);
    }
  });
  // getOne
  const getOneSchema: FastifySchema = {
    params: {
      type: 'object',
      properties: {
        userId: { type: 'integer' },
      },
    },
  };
  const getOneHandler: RouteHandlerMethod =  async (req, rep) => {
    try {
      const p = req.params as any;
      const user = users.find((u) => { return u.id === p.userId; });
      rep.send(user);
    } catch (e) {
      throw boom.internal(e);
    }
  };
  server.get('/users/:userId', {
    schema: getOneSchema,
    handler: getOneHandler,
  });
  // post
  const postSchema: FastifySchema = {
    body: {
      type: 'object',
      required: ['id', 'name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        address: { type: 'string' },
        birthday: { type: 'string' },
        sex: { type: 'string', enum: ['man', 'woman'] },
      },
    },
  };
  const postHandler: RouteHandlerMethod = async (req, rep) => {
    try {
      const body = req.body as any;
      const user: IServer.user = {
        id: body.id,
        name: body.name,
        address: body.address,
        birthday: body.birthday,
        sex: body.sex,
      };
      users.push(user);
      rep.send(user);
    } catch (e) {
      throw boom.internal(e);
    }
  };
  server.post('/users',  {
    schema: postSchema,
    handler: postHandler,
  });

  next();
};

export default fastifyPlugin(router, {
  name,
  fastify: '3.x',
});
