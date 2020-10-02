import getConfig from 'next/config';
import axios from "axios";

const {publicRuntimeConfig = {}} = getConfig() || {};

const NetworkManager = axios.create({
  baseURL: publicRuntimeConfig.API_HOST,
});

NetworkManager.defaults.headers.post['Content-Type'] = 'application/json';

export default NetworkManager;