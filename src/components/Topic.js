import React from 'react-native';
import relativeDate from '../utils/relative-date';

let {
  View,
  Text,
  StyleSheet,
  Image
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  detail: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 10
  },
  textContainer: {
    flex: 1
  },
  cellImage: {
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    width: 60
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  domain: {
    color: '#999999',
    fontSize: 12
  },
  time: {
    fontSize: 12,
    color: '#cccccc'
  }
});

class Topic extends React.Component {
  render() {
    let item = this.props.data;

    let image = item.image ? (
      <Image
      source={ { uri: item.image } }
      style={styles.cellImage}
      />
    ) : null;
    return (
      <View style={styles.container}>
        <View style={styles.detail}>
          {image}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {item.title}
            </Text>
            <View style={styles.info}>
              <Text style={styles.domain} numberOfLines={1}>
                {item.domain}
              </Text>
              <Text style={styles.time} numberOfLines={1}>
                {relativeDate(item.created)}
              </Text>
            </View>
          </View>
        </View>
        <Text>comment</Text>
        <Text>comment</Text>
        <Text>comment</Text>
        <Text>comment</Text>
        <Text>comment</Text>
        <Text>comment</Text>
      </View>
    );
  }
}

module.exports = Topic;
