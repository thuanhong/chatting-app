import { httpRequest } from '@src/utils/HttpRequest';
import { EndPoints } from '@src/constants/EndPoints';

const fetch_message_by_group_id = async (id) => {
  return await httpRequest.get(EndPoints.CHAT.general_chat_endpoint + `/${id}`);
};

export const ChatService = {
  fetch_message_by_group_id,
};
