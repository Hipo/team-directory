import axios from "axios";
import getConfig from 'next/config'
// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.
const {publicRuntimeConfig} = getConfig()

const apiHandler = axios.create({
  baseURL: "123"
});

export default apiHandler;
