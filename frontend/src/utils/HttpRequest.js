import axios from 'axios';
import { CookieHandler } from '@src/utils/Cookies';

export const createAxios = () => {
  let baseURLStr = 'http://localhost:8000';
  let headerObj = {
    'Content-Type': 'application/json',
  };
  if (CookieHandler.getCookieFromBrowser('access_token') && CookieHandler.getCookieFromBrowser('access_token') !== '') {
    headerObj = {
      ...headerObj,
      Authorization: 'Bearer ' + CookieHandler.getCookieFromBrowser('access_token'),
    };
    return axios.create({
      baseURL: baseURLStr,
      headers: headerObj,
      timeout: 15000,
    });
  }

  return axios.create({
    baseURL: baseURLStr,
    headers: headerObj,
    timeout: 15000,
  });
};

const _get = async (url) => {
  try {
    const result = await createAxios().get(url);
    return { msg: result.data, statusCode: result.status };
  } catch (error) {
    if (error.response) {
      return { msg: error.response.data, statusCode: error.response.status };
    }
    return null;
  }
};

const _put = async (url, data) => {
  try {
    const result = await createAxios().put(url, data);
    return result.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return null;
  }
};

const _post = async (url, data) => {
  try {
    const result = await createAxios().post(url, data);
    return { msg: result.data, statusCode: result.status };
  } catch (error) {
    if (error.response) {
      return { msg: error.response.data, statusCode: error.response.status };
    }
    return null;
  }
};

const _delete = async (url, config = {}) => {
  try {
    const result = await createAxios().delete(url, config);
    return result.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return null;
  }
};

const _patch = async (url, data) => {
  try {
    const result = await createAxios().patch(url, data);
    return { msg: result.data, statusCode: result.status };
  } catch (error) {
    if (error.response) {
      return { msg: error.response.data, statusCode: error.response.status };
    }
    return null;
  }
};

export const httpRequest = {
  get: _get,
  put: _put,
  post: _post,
  delete: _delete,
  patch: _patch,
};
