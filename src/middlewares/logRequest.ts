import { Request, Response, NextFunction } from 'express';

export default function logRequest(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { method, url } = request;

  const log = `[${method.toUpperCase()}] ${url}`;

  console.time(log);

  next();

  console.timeEnd(log);
}
