import { httpRequest } from '@src/utils/HttpRequest';
import { EndPoints } from '@src/constants/EndPoints';

const get_user_group_chat = async () => {
  return await httpRequest.get(EndPoints.GROUP.general_group_chat_endpoint);
};

export const GroupService = {
  get_user_group_chat,
};
