import { httpRequest } from '@src/utils/HttpRequest';
import { EndPoints } from '@src/constants/EndPoints';

const fetch_list_contact = async (pagination) => {
  const queryString = `?take=${pagination.take}&pageIndex=${pagination.pageIndex}`;

  return await httpRequest.get(EndPoints.CONTACT.general_contact_endpoint + queryString);
};

export const ContactService = {
  fetch_list_contact,
};
