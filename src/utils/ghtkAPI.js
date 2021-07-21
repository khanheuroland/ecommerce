import axios from 'axios';

export default async function callApi(endpoint, method = 'GET', body, token) {
    try {
      let data;
      if (token !== undefined || token !== null || token !== '') {
        data = await axios({
          method: method,
          url: endpoint,
          headers: { 'Token': '72f862d1997f81f12e6f15Aa96194B9A9f15B4Eb' },
          data: body
        });
        return data.data;
      } else {
        data = await axios({
          method: method,
          url: endpoint,
          data: body
        });
        return data.data;
      }
    }
    catch (err) {
    }
}