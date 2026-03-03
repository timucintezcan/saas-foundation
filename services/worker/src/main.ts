import { Queue, Worker } from 'bullmq';

import { QUEUE_NAMES } from '@saas-foundation/shared';

const redisUrl = process.env.REDIS_URL ?? 'redis://127.0.0.1:6379';
const connection = new URL(redisUrl);
const redisConnection = {
  host: connection.hostname,
  port: Number(connection.port || 6379),
};

const queue = new Queue(QUEUE_NAMES.RENDER, { connection: redisConnection });

const worker = new Worker(
  QUEUE_NAMES.RENDER,
  async (job) => {
    // Placeholder job processor for Phase 1-2 scaffold.
    // eslint-disable-next-line no-console
    console.log('processing render job', job.id, job.name);
  },
  { connection: redisConnection },
);

worker.on('ready', () => {
  // eslint-disable-next-line no-console
  console.log('worker ready');
});

void queue.waitUntilReady();
