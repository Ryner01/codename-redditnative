import React from 'react-native';
import App from './components/App.js';

const {
  AppRegistry,
  View,
  Text,
  NavigatorIOS,
  StyleSheet
} = React;

let styles = StyleSheet.create({
  navWrap: {
    flex: 1,
    marginTop: 70
  },
  nav: {
    flex: 1
  }
});

class Reddit extends React.Component {
  render() {
    return (
      <NavigatorIOS
        itemWrapperStyle={styles.navWrap}
        style={styles.nav}
        initialRoute={{
          title: 'Reddit',
          component: App,
        }} />
    );
  }
}

AppRegistry.registerComponent('App', () => Reddit);
