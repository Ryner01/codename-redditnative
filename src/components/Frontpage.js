import React from 'react-native';
import api from '../utils/api.js';

const {
  View,
  Text,
  StyleSheet
} = React;

class Frontpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: api.getData()
    };
  }

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.state, null, 2)}</Text>
      </View>
    );
  }
}

module.exports = Frontpage;
