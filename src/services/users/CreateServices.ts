import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../models/User';
import AppError from '../../errors/AppError';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserServices {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const checkEmailExist = await userRepository.findOne({ where: { email } });

    if (checkEmailExist) {
      throw new AppError('E-mail já existe.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserServices;
