import axios from "axios";

const root_url = "http://192.168.3.64:5000/";

export async function get(url) {
  return await axios
    .get(root_url + url)
    .then((data) => data.data)
    .then((data) => {
      return data;

    })
    .catch((err) => {
      return err;
    });
}
export function post(url, body) {
  return axios
    .post(root_url + url, body)
    .then((data) => data.data)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
}
export function put(url, body) {
  return axios
    .put(root_url + url, body)
    .then((data) => data.data)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      if (err) {
        return err;
      }
    });
}
export function remove(url) {
  return axios
    .delete(root_url + url)
    .then((data) => data.data)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
}
