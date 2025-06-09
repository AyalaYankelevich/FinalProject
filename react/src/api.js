
import axios from 'axios';

const BASE_URL = 'http://localhost:5095/api';

export const fetchData = async (controller, action = '', params = {}, method = 'get') => {
  try {
    const url = `${BASE_URL}/${controller}${action ? `/${action}` : ''}`;
    if (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete') {
      // GET and DELETE: params go in query string
      const response = await axios({ url, method, params });
      return response.data;
    } else {
      // POST and PUT: params go in body
      const response = await axios({ url, method, data: params });
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};