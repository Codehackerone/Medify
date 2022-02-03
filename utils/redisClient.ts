import Redis from "ioredis";

const REDIS_PORT = parseInt(process.env.REDIS_PORT || "6379", 10);
const REDIS_HOST = process.env.REDIS_HOST || "localhost";

const redisClient = new Redis(REDIS_PORT, REDIS_HOST);

redisClient.connect(() => {
  console.log(
    `redis client connected successfully. port:${REDIS_PORT} host:${REDIS_HOST}`
  );
});

export default redisClient;
