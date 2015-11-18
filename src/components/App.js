import React from 'react-native';
import Auth from '../auth';
import querystring from 'querystring';

import Subreddit from './Subreddit';
import Topic from './Topic';

let {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Navigator
} = React;

var styles = StyleSheet.create({
  pageContainer: {
    marginTop: 70,
    backgroundColor: 'white',
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

let NavigationBarRouteMapper = {
  LeftButton() {
    return null;
  },

  RightButton() {
    return null;
  },

  Title() {
    return <Text>Test</Text>;
  }
};

class App extends React.Component {
  static childContextTypes = {
    auth: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
    };

    this.auth = new Auth();
    this.auth.init();
  }

  getChildContext() {
    return {
      auth: this.auth
    };
  }

  handleLoginButton() {
    this.auth.login(() => {
      this.setState({
        authenticated: true
      });
    });
  }

  render() {
    if (!this.state.authenticated) {
      return (
        <View style={styles.container}>
          <TouchableHighlight style={styles.button} onPress={this.handleLoginButton.bind(this)}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
      );
    }

    return (
      <Navigator
        initialRoute={{name: 'Subreddit', index: 0}}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
          />
        }
        renderScene={(route, navigator) => {
          let page = null;
          if (route.name === 'Subreddit') {
            page = <Subreddit navigator={navigator} name='all'/>;
          } else if (route.name === 'Topic') {
            page = <Topic navigator={navigator} data={route.data}/>;
          }

          return <View style={styles.pageContainer}>{page}</View>;
        }}
        />
    );
  }
}

module.exports = App;
