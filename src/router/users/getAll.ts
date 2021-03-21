import { RouteHandlerMethod } from 'fastify';

import dummyResponse from './dummyResponse';
const users: IServer.user[] = dummyResponse as any;

export const getAllHandler: RouteHandlerMethod =  async (_, rep) => {
  try {
    rep.header('X-Total-Count', users.length);
    rep.send(users);
  } catch (e) {
    throw e;
  }
};
