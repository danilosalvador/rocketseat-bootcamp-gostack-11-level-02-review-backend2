import { Router } from 'express';

import CreateSessionServices from '../services/sessions/CreateServices';

const sessionsRoute = Router();

sessionsRoute.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSessionServices = new CreateSessionServices();

  const { user, token } = await createSessionServices.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRoute;
