import axios from 'axios';

export default async function callApi(endpoint, method = 'GET', body, token) {
    let API_URL = 'http://app.testmaster.vn/api';
    try {
      let data;
      if (token !== undefined || token !== null || token !== '') {
        data = await axios({
          method: method,
          url: `${API_URL}/${endpoint}`,
          headers: { Authorization: `Bearer ${token}` },
          data: body
        });
        return data.data;
      } else {
        data = await axios({
          method: method,
          url: `${API_URL}/${endpoint}`,
          data: body
        });
        return data.data;
      }
    }
    catch (err) {
    }
}