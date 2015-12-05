import React from 'react-native';
import url from 'url';
import Base64 from 'base64';
import config from './config';
import querystring from 'querystring';

const ACCESS_TOKEN_URL = `https://www.reddit.com/api/v1/access_token`;

let stateString = Math.random().toString();
let scope = 'identity read mysubreddits'
let authorizeURL = `https://www.reddit.com/api/v1/authorize.compact?client_id=${config.APP_KEY}&response_type=code&state=${stateString}&redirect_uri=nativeforreddit://login&duration=permanent&scope=${scope}`;

let {
  LinkingIOS
} = React;

class Auth {
  constructor() {
    this.token = null;
    this.loginCallback = null;
  }

  init() {
    LinkingIOS.addEventListener('url', this._handleUrl.bind(this));
  }

  login(loginCallback) {
    this.loginCallback = loginCallback;
    LinkingIOS.openURL(authorizeURL);
  }

  requestToken(auth) {
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

    return fetch(ACCESS_TOKEN_URL, params).then(res => res.json());
  }

  _handleUrl(e) {
    let query = url.parse(e.url, true).query;
    this.requestToken(query).then(token => {
      this.token = token;
      this.loginCallback();
    });
  }
}

module.exports = Auth;
