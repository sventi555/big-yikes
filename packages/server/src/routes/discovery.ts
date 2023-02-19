import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { Block, BlockTypeSlugSchema, Structure, Vector2DSchema } from 'lib';

const BASE_PATH = '/discovery';

const BlockSchema = Type.Object({
  type: BlockTypeSlugSchema,
  position: Vector2DSchema,
});

const StructureSchema = Type.Object({
  blocks: Type.Array(BlockSchema),
});

type StructureType = Static<typeof StructureSchema>;

export const discoveryRoutes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: StructureType }>(
    BASE_PATH,
    {
      schema: { body: StructureSchema },
      preValidation: [fastify.authenticate],
    },
    async (request, reply) => {
      const blocks = request.body.blocks.map(
        (b) => new Block(b.type, b.position),
      );
      const structure = new Structure(blocks);

      if (!structure.isValid()) {
        reply.status(400).send('Blocks are invalid');
        return;
      }

      const { sub: userId, username } = request.user as {
        sub: string;
        username: string;
      };

      // check if user has already made this discovery

      // if the discovery does not exist, add it to db

      // get all discoveries matching structure hash sorted by time

      // format the response, and send it back to user
    },
  );
};
