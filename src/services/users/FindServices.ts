import { getRepository } from 'typeorm';

import User from '../../models/User';
import AppError from '../../errors/AppError';

interface RequestDTO {
  id: string;
}

class FindUserServices {
  public async execute({ id }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    return user;
  }
}

export default FindUserServices;
