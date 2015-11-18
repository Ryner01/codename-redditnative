import React from 'react-native';
import App from './components/App.js';

const {
  AppRegistry
} = React;

class Reddit extends React.Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('App', () => Reddit);
