import cors from '@fastify/cors';
import 'dotenv/config';
import Fastify from 'fastify';
import fastifyAuth0Verify from 'fastify-auth0-verify';
import { toInt } from 'lib';
import { discoveryRoutes } from './routes';

const fastify = Fastify({ logger: true });

fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(500).send();
});

fastify.register(cors);

fastify.register(fastifyAuth0Verify, {
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
});

fastify.register(discoveryRoutes);

(async () => {
  try {
    await fastify.listen({
      host: '0.0.0.0',
      port: toInt(process.env.PORT) || 3001,
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
