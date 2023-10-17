import errorHandler from './errors';

//https://nitro.unjs.io/config
export default defineNitroConfig({
  errorHandler: "~/errors",
  devErrorHandler: errorHandler,
  storage: {
    cache: {
      driver: "redis",
      url: process.env.UPSTASH_REDIS_URL
    }
  }
});
