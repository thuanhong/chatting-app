import { httpRequest } from '@src/utils/HttpRequest';
import { EndPoints } from '@src/constants/EndPoints';

const general_user_endpoint = async (payload) => {
  return await httpRequest.post(EndPoints.USER.general_user_endpoint, payload);
};

const check_user_exist = async () => {
  return await httpRequest.get(EndPoints.USER.check_user_exist);
};

const get_user_contact = async () => {
  return await httpRequest.get(EndPoints.USER.get_user_contact);
};

const search_user_with_email = async (payload) => {
  return await httpRequest.post(EndPoints.USER.search_user_with_email, payload);
};

const add_user_contact = async (payload) => {
  return await httpRequest.post(EndPoints.USER.add_user_contact, payload);
};

const check_user_contact = async (payload) => {
  return await httpRequest.post(EndPoints.USER.check_user_contact, payload);
};

export const UserService = {
  general_user_endpoint,
  check_user_exist,
  get_user_contact,
  search_user_with_email,
  add_user_contact,
  check_user_contact,
};
