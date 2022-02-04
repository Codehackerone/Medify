import RateLimiter from "async-ratelimiter";
import { Redis } from "ioredis";
import { Response, Request } from "express";

type OptionsType = {
  db: Redis;
  duration?: number;
  max?: number;
  id?: (input: any) => any;
  headers?: Record<string, string>;

  errorMessage?: string;
  disableHeader?: boolean;
  remaining?: number;
  reset?: number;
  total?: number;
  status?: number;
};

export default function ratelimiter(options: OptionsType) {
  const defaultOptions = {
    duration: 60 * 60 * 1000, // 1 hour
    max: 2500,
    id: (req: Request) => req.ip,
    headers: {
      remaining: "X-RateLimit-Remaining",
      reset: "X-RateLimit-Reset",
      total: "X-RateLimit-Limit",
    },
    status: 429,
  };

  const opts = { ...defaultOptions, ...options };

  const {
    remaining = "X-RateLimit-Remaining",
    reset = "X-RateLimit-Reset",
    total = "X-RateLimit-Limit",
  } = opts.headers;

  return async function ratelimiter(req: Request, res: Response, next: any) {
    const id = opts.id(req);

    if (id === false) return await next();

    const limiter = new RateLimiter({ ...opts, id });

    // check limit
    const limit = await limiter.get({});

    // check if current call is legit
    const calls = limit.remaining > 0 ? limit.remaining - 1 : 0;

    // check if header disabled
    const disableHeader = opts.disableHeader || false;

    let headers = {};
    if (!disableHeader) {
      // header fields
      headers = {
        [remaining]: calls,
        [reset]: limit.reset,
        [total]: limit.total,
      };

      res.set(headers);
    }

    if (limit.remaining) return await next();

    const delta = (limit.reset * 1000 - Date.now()) | 0;
    const after = (limit.reset - Date.now() / 1000) | 0;
    res
      .status(opts.status)
      .set("Retry-After", after.toString())
      .send(opts.errorMessage || `Rate limit exceeded, retry in ${delta}.`);
  };
}
