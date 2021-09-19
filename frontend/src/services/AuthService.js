import { httpRequest } from '@src/utils/HttpRequest';
import { EndPoints } from '@src/constants/EndPoints';

const login = (username, password) => {
  let body_data = {
    username,
    password,
  };

  return httpRequest.post(EndPoints.AUTHENTICATION.login, body_data);
};

const check_auth = async () => {
  return await httpRequest.get(EndPoints.HEALTH.health_check_authenticated);
};

const get_token = async () => {
  return await httpRequest.post(EndPoints.AUTHENTICATION.token);
};

const sign_up = async (signUpInfo) => {
  return await httpRequest.post(EndPoints.AUTHENTICATION.sign_up, signUpInfo);
};

export const AuthService = {
  login,
  check_auth,
  get_token,
  sign_up,
};
