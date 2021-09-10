import { httpRequest } from '@utils/HttpRequest';
import { EndPoints } from '@services/EndPoints';

// api patient
// const get_list_patient = async () => {
//   return await httpRequest.get(EndPoints.PATIENT.patient);
// };

// const create_patient = async (props) => {
//   return await httpRequest.post(EndPoints.PATIENT.patient, { ...props });
// };
const save_info_user = async (props) => {
  return await httpRequest.post(EndPoints.USER.save_info_user, { ...props });
};

const check_user_exist = async () => {
  return await httpRequest.get(EndPoints.USER.check_user_exist);
};

export const ApiService = {
  save_info_user,
  check_user_exist,
};
