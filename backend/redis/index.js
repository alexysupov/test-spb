import { createClient } from 'redis';

export const redisClient = createClient({
    url: 'redis://redis:6379'
})

export const redisWrapper = {
    get: async (key) => redisClient.get(JSON.stringify(key)).then(JSON.parse),
    set: async (key, value) => redisClient.set(JSON.stringify(key), JSON.stringify(value)),
    exists: async (key) => redisClient.exists(JSON.stringify(key))
}