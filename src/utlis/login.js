import Base64 from 'base64';
import config from '../config';
let token = null;

module.exports = {

  requestAccesToken(auth) {
    let acessUrl = `https://www.reddit.com/api/v1/access_token`;
    let authBasic = config.APP_KEY + ': ';
    var postObj = {
      method: 'post',
      headers: {
        'Authorization': `Basic ${Base64.btoa(authBasic)}`
      },
      body: `grant_type=authorization_code&code=${auth.code}&redirect_uri=nativeforreddit://login`
    };
    return fetch(acessUrl, postObj).then((res) => {
      return res.json();
    }).then((final) => {
      token = final;
    });
  },

  getToken() {
    return token;
  }
};
