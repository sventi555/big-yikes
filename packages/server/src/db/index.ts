import { Firestore, Settings } from '@google-cloud/firestore';
import { toBool, toInt } from 'lib';

const options: Settings = {
  projectId: process.env.FIRESTORE_PROJECT_ID || 'local',
  ssl: toBool(process.env.FIRESTORE_SSL),
};

if (process.env.FIRESTORE_HOST) {
  options.host = process.env.FIRESTORE_HOST;
}

if (process.env.FIRESTORE_PORT) {
  options.port = toInt(process.env.FIRESTORE_PORT);
}

export const db = new Firestore(options);
