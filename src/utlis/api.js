import authentication from './login.js';

module.exports = {
  getData() {
    return authentication.getToken();
  }
};
