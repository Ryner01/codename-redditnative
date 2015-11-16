import React from 'react-native';
import api from '../utlis/api.js';

const {
  View,
  Text,
  StyleSheet
} = React;

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class Frontpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: api.getData()
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>GoodJob dude. You are in.</Text>
        <Text>GoodJob dude. You are in.</Text>
        <Text>GoodJob dude. You are in.</Text>
      </View>
    );
  }
}

module.exports = Frontpage;
