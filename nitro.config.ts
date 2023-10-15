//https://nitro.unjs.io/config
export default defineNitroConfig({
  storage: {
    cache: {
      driver: "redis",
      url: process.env.UPSTASH_REDIS_URL
    }
  }
});
