import axios from 'axios';

export default async function callApi(endpoint, method = 'GET', body, token) {
    let API_URL = 'http://app.testmaster.vn/api';
    //let API_URL = 'http://192.168.1.144/Youngsante/api';
    let service = '';
    if(endpoint.startsWith('http'))
      service = endpoint;
    else 
      service = `${API_URL}/${endpoint}`;
    try {
      let data;
      if (token !== undefined || token !== null || token !== '') {
        data = await axios({
          method: method,
          url: service,
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