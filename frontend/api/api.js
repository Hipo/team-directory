import NetworkManager from './NetworkManager';

function authenticate(token) {
  NetworkManager.post("/users/authentication/", {code: token});
}

export {
  authenticate
}