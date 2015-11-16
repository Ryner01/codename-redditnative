import React from 'react-native';
import config from '../config.js';
import Dimensions from 'Dimensions';
import queryString from 'query-string';
import login from '../utlis/login.js';
import Frontpage from './Frontpage.js';

let stateString = Math.random().toString();
let url = `https://reddit.com/api/v1/authorize.compact?client_id=${config.APP_KEY}&response_type=code&state=${stateString}&redirect_uri=nativeforreddit://login&duration=permanent&scope=identity`;

var {
  View,
  Text,
  StyleSheet,
  WebView,
  LinkingIOS
} = React;

var styles = StyleSheet.create({
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
    this.handleUrl = this.handleUrl.bind(this);
    this.state = {
      urlReturned: false,
    };
  }

  componentDidMount() {
    LinkingIOS.addEventListener('url', this.handleUrl);
  }

  handleUrl(e) {
    var query = e.url.split('?')[1];
    var parsedQuery = queryString.parse(query);
    login.requestAccesToken(parsedQuery).then((res) => {
      this.setState({
        urlReturned: true,
      });
    });
  }

  render() {
    let renderAuthView = () => {
      if (this.state.urlReturned) {
        return <Frontpage />;
      } else {
        return <WebView url={url} style={styles.webView} scalesPageToFit onShouldStartLoadWithRequest={false} />;
      }
    };
    return (
      <View style={styles.container}>
        {renderAuthView()}
      </View>
    );
  }
}

module.exports = App;
