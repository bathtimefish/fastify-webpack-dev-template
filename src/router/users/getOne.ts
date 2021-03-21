import { FastifySchema, RouteHandlerMethod } from 'fastify';
import boom from '@hapi/boom';

import dummyResponse from './dummyResponse';
const users: IServer.user[] = dummyResponse as any;

export const getOneSchema: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      userId: { type: 'integer' },
    },
  },
};

export const getOneHandler: RouteHandlerMethod =  async (req, rep) => {
  try {
    const p = req.params as any;
    const user = users.find((u) => { return u.id === p.userId; });
    if (!user) throw boom.notFound();
    rep.send(user);
  } catch (e) {
    throw e;
  }
};
