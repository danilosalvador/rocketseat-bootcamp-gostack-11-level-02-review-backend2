import { Router } from 'express';

import ensureSession from '../middlewares/ensureSession';
import CreateUserServices from '../services/users/CreateServices';
import FindUserServices from '../services/users/FindServices';

const usersRoute = Router();

usersRoute.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserServices = new CreateUserServices();

  const user = await createUserServices.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRoute.get('/', ensureSession, async (request, response) => {
  const findUserServices = new FindUserServices();

  const user = await findUserServices.execute({ id: request.user.id });

  delete user.password;

  return response.json(user);
});

export default usersRoute;
