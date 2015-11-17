import React from 'react-native';
import Auth from '../auth';
import Subreddit from './subreddit';

let {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} = React;

var styles = StyleSheet.create({
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

class App extends React.Component {
  static childContextTypes = {
    auth: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
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
      <Subreddit name='all'/>
    );
  }
}

module.exports = App;
