import axios from "axios";

const NetworkManager = axios.create({
  baseURL: "https://07544a715fd4.ngrok.io/api",
});

NetworkManager.defaults.headers.post['Content-Type'] = 'application/json';

export default NetworkManager;