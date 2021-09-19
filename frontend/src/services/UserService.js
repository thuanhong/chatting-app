import { httpRequest } from '@src/utils/HttpRequest';
import { EndPoints } from '@src/constants/EndPoints';

const general_user_endpoint = async (props) => {
  return await httpRequest.post(EndPoints.USER.general_user_endpoint, { ...props });
};

const check_user_exist = async () => {
  return await httpRequest.get(EndPoints.USER.check_user_exist);
};

const get_user_contact = async (user_id) => {
  return await httpRequest.get(`${EndPoints.USER.general_user_endpoint}/${user_id}`);
};

export const UserService = {
  general_user_endpoint,
  check_user_exist,
  get_user_contact,
};
