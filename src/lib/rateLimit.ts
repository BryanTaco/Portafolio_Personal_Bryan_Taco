import { NextRequest } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'middleware',
  points: 10, // Number of requests
  duration: 60, // Per 60 seconds
});

export default async function rateLimit(request: NextRequest) {
  try {
    // Get IP from headers (common headers for IP detection)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               request.headers.get('cf-connecting-ip') ||
               'anonymous';

    await rateLimiter.consume(ip);
    return { success: true };
  } catch (rejRes) {
    return { success: false };
  }
}
