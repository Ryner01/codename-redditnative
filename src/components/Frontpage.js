import React from 'react-native';
import Login from '../utils/login';

const {
  View,
  Text,
  StyleSheet
} = React;

class Frontpage extends React.Component {
  render() {
    return (
      <View>
        <Text>{JSON.stringify(Login.token, null, 2)}</Text>
      </View>
    );
  }
}

module.exports = Frontpage;
