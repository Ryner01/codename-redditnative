import Base64 from 'base64';
import config from '../config';
import querystring from 'querystring';

let token = null;

module.exports = {
  requestAccesToken(auth) {
    let url = `https://www.reddit.com/api/v1/access_token`;
    let authBasic = config.APP_KEY + ':';
    let params = {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Base64.btoa(authBasic)}`
      },
      body: querystring.stringify({
        'grant_type': 'authorization_code',
        'code': auth.code,
        'redirect_uri': 'nativeforreddit://login'
      })
    };
    return fetch(url, params).then(res => {
      return res.json();
    }).then(value => {
      token = value;
    });
  },

  getToken() {
    return token;
  }
};
