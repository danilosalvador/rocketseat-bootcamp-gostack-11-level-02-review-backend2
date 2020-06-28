import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../../errors/AppError';
import authConfig from '../../config/auth';
import User from '../../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class CreateSessionsServices {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Usuário e/ou senha inválido.', 401);
    }

    const passwordMached = await compare(password, user.password);

    if (!passwordMached) {
      throw new AppError('Usuário e/ou senha invalidos.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionsServices;
