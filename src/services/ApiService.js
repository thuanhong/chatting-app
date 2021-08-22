import { httpRequest } from '@utils/HttpRequest';
import { EndPoints } from '@services/EndPoints';

// api patient
const get_list_patient = async () => {
  return await httpRequest.get(EndPoints.PATIENT.patient);
};

const create_patient = async (props) => {
  return await httpRequest.post(EndPoints.PATIENT.patient, { ...props });
};

const update_patient = async (props, id) => {
  return await httpRequest.patch(EndPoints.PATIENT.patient + `/${id}`, { ...props });
};

const get_patient_detail = async (id) => {
  return await httpRequest.get(EndPoints.PATIENT.patient + `/${id}`);
};

const get_list_doctor = async () => {
  return await httpRequest.get(EndPoints.DOCTOR.get_list_doctor);
};

const get_patient_visit = async (params) => {
  return await httpRequest.get(EndPoints.PATIENT_VISIT.get_patient_visit + params);
};
// api patient visit
const create_patient_visit = async (props) => {
  return await httpRequest.post(EndPoints.PATIENT_VISIT.create_patient_visit, { ...props });
};
const get_static_patient = async () => {
  return await httpRequest.get(EndPoints.STATIC.get_static_patient);
};

const get_static_payment = async () => {
  return await httpRequest.get(EndPoints.STATIC.get_static_payment);
};

// api doctor
const create_doctor = async (props) => {
  return await httpRequest.post(EndPoints.DOCTOR.create_doctor, props);
};

const upload_image = async (props) => {
  return await httpRequest.post(EndPoints.UTIL.upload_image, props);
};

const get_drug_list = async () => {
  return await httpRequest.get(EndPoints.UTIL.get_drug);
};

export const ApiService = {
  get_static_patient,
  get_static_payment,
  get_list_patient,
  create_patient,
  get_patient_visit,
  create_patient_visit,
  get_list_doctor,
  create_doctor,
  upload_image,
  update_patient,
  get_patient_detail,
  get_drug_list,
};
