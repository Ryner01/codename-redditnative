import Base64 from 'base64';
import config from '../config';
import querystring from 'querystring';

const ACCESS_TOKEN_URL = `https://www.reddit.com/api/v1/access_token`;

module.exports = {
  token: null,

  requestAccesToken(auth) {
    let authBasic = Base64.btoa(config.APP_KEY + ':');

    let params = {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authBasic}`
      },
      body: querystring.stringify({
        'grant_type': 'authorization_code',
        'code': auth.code,
        'redirect_uri': 'nativeforreddit://login'
      })
    };

    return fetch(ACCESS_TOKEN_URL, params).then(res => {
      return res.json();
    }).then(value => {
      this.token = value;
    });
  },
};
