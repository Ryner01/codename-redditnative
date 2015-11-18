import React from 'react-native';
import Api from '../api';
import relativeDate from '../utils/relative-date';

const {
  Text,
  ListView,
  View,
  StyleSheet,
  Image,
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

class Subreddit extends React.Component {
  static contextTypes = {
    auth: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 !== r2;
      }
    });

    this.state = {
      dataSource: ds.cloneWithRows([]),
    };

    Api.subreddit(this.props.name).then((result) => {
      this.setState({
        lastId: result.lastId,
        dataSource: this.state.dataSource.cloneWithRows(result.items)
      });
    });
  }

  handleRowPress(data) {
    this.props.navigator.push({ navTitle: 'Post', name: 'Topic', data: data });
  }

  renderRow(item) {
    let image = item.image ? (
      <Image
      source={ { uri: item.image } }
      style={styles.cellImage}
      />
    ) : null;
    return (
      <TouchableHighlight onPress={this.handleRowPress.bind(this, item)}>
        <View style={styles.row}>
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

module.exports = Subreddit;
