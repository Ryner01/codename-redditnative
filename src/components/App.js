import React from 'react-native';
import config from '../config.js';
import Dimensions from 'Dimensions';
import querystring from 'querystring';
import login from '../utils/login.js';
import Frontpage from './Frontpage.js';

let stateString = Math.random().toString();
let url = `https://www.reddit.com/api/v1/authorize.compact?client_id=${config.APP_KEY}&response_type=code&state=${stateString}&redirect_uri=nativeforreddit://login&duration=permanent&scope=identity`;

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
    LinkingIOS.openURL(url);
  }

  handleUrl(e) {
    let query = e.url.split('?')[1];
    let parsedQuery = querystring.parse(query);
    login.requestAccesToken(parsedQuery).then(res => {
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
