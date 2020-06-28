import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureSession(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    throw new AppError('Autorização não encontrada.', 401);
  }

  const [, token] = authorizationHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    next();
  } catch {
    throw new AppError('Autorização inválida.', 401);
  }
}
