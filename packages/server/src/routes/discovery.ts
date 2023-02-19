import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { Block, BlockTypeSlugSchema, Structure, Vector2DSchema } from 'lib';
import { db } from '../db';

const BASE_PATH = '/discovery';

const BlockSchema = Type.Object({
  type: BlockTypeSlugSchema,
  position: Vector2DSchema,
});

const StructureSchema = Type.Object({
  blocks: Type.Array(BlockSchema),
});

type StructureType = Static<typeof StructureSchema>;

interface DBDiscovery {
  userId: string;
  username: string;
  structureHash: string;
  time: number;
}

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
      const alreadyDiscovered = (
        await db
          .collection('discoveries')
          .where('userId', '==', userId)
          .where('structureHash', '==', structure.hash)
          .get()
      ).size;

      // if the discovery does not exist, add it to db
      if (!alreadyDiscovered) {
        const newDiscovery: DBDiscovery = {
          userId,
          username,
          structureHash: structure.hash,
          time: Date.now(),
        };
        await db.collection('discoveries').add(newDiscovery);
      }

      // get all discoveries matching structure hash sorted by time
      const discoveries: DBDiscovery[] = (
        await db
          .collection('discoveries')
          .where('structureHash', '==', structure.hash)
          .orderBy('time', 'desc')
          .get()
      ).docs.map((doc) => doc.data() as DBDiscovery);

      // format the response, and send it back to user
      return discoveries.map((discovery) => ({
        time: discovery.time,
        username: discovery.username,
      }));
    },
  );
};
