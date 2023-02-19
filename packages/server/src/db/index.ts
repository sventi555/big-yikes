import { Firestore } from '@google-cloud/firestore';
import { toBool, toInt } from 'lib';

export const db = new Firestore({
  projectId: process.env.FIRESTORE_PROJECT_ID || 'local',
  host: process.env.FIRESTORE_HOST || 'localhost',
  port: toInt(process.env.FIRESTORE_PORT) || 8000,
  ssl: toBool(process.env.FIRESTORE_SSL) || false,
});
