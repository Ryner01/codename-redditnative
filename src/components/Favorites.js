import React from 'react-native';

const {
  Text,
  ListView,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
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
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
    marginLeft: 4
  }
});

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 !== r2;
      }
    });

    this.state = {
      dataSource: ds.cloneWithRows([{ name: 'all' }, { name: 'programming' }, { name: 'vim' }, { name: 'javascript' }]),
    };
  }

  handleRowPress(data) {
    this.props.navigator.push({ navTitle: data.name, name: 'Subreddit', subreddit: data.name });
  }

  renderRow(item) {
    return (
      <TouchableHighlight onPress={this.handleRowPress.bind(this, item)}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {item.name}
            </Text>
          </View>
          <View style={styles.cellBorder} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

module.exports = Favorites;
