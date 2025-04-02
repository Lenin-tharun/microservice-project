import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Correct Redis Connection Code (for Redis v4+)
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`
});

redisClient.on('error', (err) => console.error('❌ Redis Error:', err));

async function connectRedis() {
  try {
    await redisClient.connect();
    console.log('✅ Redis Connected');
  } catch (error) {
    console.error('❌ Redis Connection Failed:', error);
  }
}

connectRedis();

export default redisClient;
