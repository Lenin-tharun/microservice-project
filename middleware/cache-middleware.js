import redisClient from '../config/redis-config.js';

export const cacheProjects = async (req, res, next) => {
    try {
        const cachedProjects = await redisClient.get('projects');
        if (cachedProjects) {
            console.log("✅ Data served from Redis Cache");
            return res.status(200).json(JSON.parse(cachedProjects));
        }
        next();
    } catch (err) {
        console.error("❌ Redis Cache Error:", err);
        next();
    }
};
