import NetworkManager from './NetworkManager';

function authenticate(token) {
  return NetworkManager.post("/users/authentication/", {code: token});
}

function getMyProfile() {
  return NetworkManager.get("/users/me/");
}

function getUser(id) {
  return NetworkManager.get(`/users/${id}/`);
}

function getUsers() {
  return NetworkManager.get("/users/");
}

function getTeams() {
  return NetworkManager.get("/teams/");
}

function getProjects() {
  return NetworkManager.get("/projects/");
}

export {
  authenticate,
  getMyProfile,
  getUser,
  getUsers,
  getTeams,
  getProjects
}