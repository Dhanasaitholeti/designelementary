const hostname = "https://designelement.onrender.com";

export const endpoints = {
  getuser: `${hostname}/user/`,
  login: `${hostname}/user/login`,
  signup: `${hostname}/user/signup`,
  getReaminders: `${hostname}/remainder/`,
  createRemainder: `${hostname}/remainder/new`,
  updateRemainder: `${hostname}/remainder/update/`, //add id of the remainder at last
  deleteRemainder: `${hostname}/remainder/delete/`, //add id of the remainder at last
  completeRemainder: `${hostname}/remainder/completed/`, //add if of the reaminder at last
};
