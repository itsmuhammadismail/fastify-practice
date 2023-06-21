import { JWT } from '@fastify/jwt';
import prisma from '../utils/prisma';

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}
