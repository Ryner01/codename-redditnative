import React from 'react-native';
import config from '../config.js';
import Dimensions from 'Dimensions';
import login from '../utils/login.js';
import Frontpage from './Frontpage.js';
import url from 'url';

let stateString = Math.random().toString();
let authorizeURL = `https://www.reddit.com/api/v1/authorize.compact?client_id=${config.APP_KEY}&response_type=code&state=${stateString}&redirect_uri=nativeforreddit://login&duration=permanent&scope=identity`;

let {
  View,
  Text,
  StyleSheet,
  WebView,
  LinkingIOS
} = React;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlReturned: false,
    };
  }

  componentDidMount() {
    LinkingIOS.addEventListener('url', this.handleUrl.bind(this));
    LinkingIOS.openURL(authorizeURL);
  }

  handleUrl(e) {
    let query = url.parse(e.url, true).query;
    login.requestAccesToken(query).then(res => {
      this.setState({
        urlReturned: true,
      });
    });
  }

  renderAuthView() {
    if (this.state.urlReturned) {
      return <Frontpage />;
    } else {
      return <Text>You should log in</Text>;
    }
  }

  render() {
    return (
      <View>
        {this.renderAuthView()}
      </View>
    );
  }
}

module.exports = App;
