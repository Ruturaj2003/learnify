import Redis from 'ioredis';

if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL is not defined in the environment variables.');
}

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

export default redis;
