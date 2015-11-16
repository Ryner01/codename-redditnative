import React from 'react-native';
import config from '../config.js';
import Dimensions from 'Dimensions';
import queryString from 'query-string';
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

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlReturned: false,
    };
  }

  componentDidMount() {
    LinkingIOS.addEventListener('url', this.handleUrl.bind(this));
  }

  handleUrl(e) {
    let query = e.url.split('?')[1];
    let parsedQuery = queryString.parse(query);
    login.requestAccesToken(parsedQuery).then((res) => {
      this.setState({
        urlReturned: true,
      });
    });
  }

  renderAuthView() {
    if (this.state.urlReturned) {
      return <Frontpage />;
    } else {
      return <WebView url={url} style={styles.webView} scalesPageToFit onShouldStartLoadWithRequest={false} />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderAuthView()}
      </View>
    );
  }
}

module.exports = App;
