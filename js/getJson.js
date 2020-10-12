//Facade Pattern
export default function getFetch(url, params = {}) {
  return axios({
    url: url,
    method: 'GET',
    params: params,
  }).then((res) => res.data);
}
