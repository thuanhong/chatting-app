import { httpRequest } from '@src/utils/HttpRequest';
import { EndPoints } from '@src/constants/EndPoints';

const get_user_group_chat = async (user_id) => {
  return await httpRequest.get(`${EndPoints.GROUP.general_group_chat_endpoint}/${user_id}`);
};

export const GroupService = {
  get_user_group_chat,
};
