import { httpRequest } from '@src/utils/HttpRequest';
import { EndPoints } from '@src/constants/EndPoints';

const get_user_group_chat = async (pagination) => {
  const queryString = `?take=${pagination.take}&pageIndex=${pagination.pageIndex}`;
  return await httpRequest.get(EndPoints.GROUP.general_group_chat_endpoint + queryString);
};

const update_group_info = async (id, payload) => {
  return await httpRequest.put(EndPoints.GROUP.general_group_chat_endpoint + `/${id}`, payload);
};

export const GroupService = {
  get_user_group_chat,
  update_group_info,
};
