import React from 'react-native';
import Api from '../api';
import relativeDate from '../utils/relative-date';
import RefreshableListView from 'react-native-refreshable-listview';

const {
  Text,
  ListView,
  View,
  StyleSheet,
  Image,
  PixelRatio,
  TouchableHighlight,
  InteractionManager
} = React;

import SafariView from 'react-native-safari-view';

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
  score: {
    fontSize: 13,
    color: '#999999'
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
  subredditName: {
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
  },
  commentButton: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white'
  },
  signInText: {
    marginTop: 20,
    fontSize: 12,
    height: 20,
    textAlign: 'center'
  }
});

let resultsCache = {};

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
      lastId: '',
      items: [],
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount() {
    let name = this.props.name;
    if (this.props.name === undefined) {
      if (this.context.auth.token !== null) {
        name = 'frontpage'
      } else {
        name = 'all'
      };
    }
    let cacheKey = name;

    if (resultsCache[cacheKey] != null) {
      let data = resultsCache[cacheKey];
      InteractionManager.runAfterInteractions(() => {
        this.setState({
          lastId: data.lastId,
          items: data.items,
          dataSource: this.state.dataSource.cloneWithRows(data.items)
        });
      });
    } else {
      Api.subreddit(name, this.context.auth).then((result) => {
        console.log('selected:' + name);
        resultsCache[cacheKey] = result;

        InteractionManager.runAfterInteractions(() => {
          this.setState({
            lastId: result.lastId,
            items: result.items,
            dataSource: this.state.dataSource.cloneWithRows(result.items)
          });
        });
      });
    }
  }

  handleRefresh() {
    let name = this.props.name;
    if (this.props.name === undefined) {
      if (this.context.auth.token !== null) {
        name = 'frontpage'
      } else {
        name = 'all'
      };
    }
    return new Promise((resolve, reject) => {
      Api.subreddit(name, this.context.auth).then((result) => {
        resolve();
        this.setState({
          lastId: result.lastId,
          items: result.items,
          dataSource: this.state.dataSource.cloneWithRows(result.items)
        });
      });
    });
  }

  loadMoreRows() {
    let name = this.props.name;
    if (this.props.name === undefined) {
      if (this.context.auth.token !== null) {
        name = 'frontpage'
      } else {
        name = 'all'
      };
    }

    let currentItems = this.state.items;
    Api.subreddit(name, this.context.auth, {lastId: this.state.lastId}).then((result) => {
      let updatedItems = currentItems.concat(result.items);
      InteractionManager.runAfterInteractions(() => {
        this.setState({
          lastId: result.lastId,
          items: updatedItems,
          dataSource: this.state.dataSource.cloneWithRows(updatedItems)
        });
      });
    });
  }

  handleRowPress(data) {
    if (data.external) {
      SafariView.show({
        url: data.url
      });
    } else {
      this.props.navigator.push({ navTitle: 'Post', name: 'Topic', data: data });
    }
  }

  showComments(data) {
    this.props.navigator.push({ navTitle: 'Post', name: 'Topic', data: data });
  }

  renderRow(item) {
    let image = item.image ? (
      <Image
        source={ { uri: item.image } }
        style={styles.cellImage}
      />
    ) : null;

    var postColor = 'white';

    if (item.nsfw) {
      postColor = 'rgb(255, 240, 229)';
    }
    if (item.pinned) {
      postColor = 'rgb(229, 255, 240)';
    }

    let subreddit = item.subreddit === this.props.name ? null : (
      <Text style={styles.subredditName} numberOfLines={1}>
        {item.subreddit}
      </Text>
    );

    return (
      <View>
        <TouchableHighlight onPress={this.handleRowPress.bind(this, item)}>
          <View style={[styles.row, { backgroundColor: postColor }]}>
            {image}
            <View style={styles.textContainer}>
              <Text style={styles.score}>
                {item.score}
              </Text>
              <Text style={styles.title}>
                {item.title}
              </Text>
              <View style={styles.info}>
                <Text style={styles.domain} numberOfLines={1}>
                  {item.domain}
                </Text>
                {subreddit}
                <Text style={styles.time} numberOfLines={1}>
                  {relativeDate(item.created)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.showComments.bind(this, item)}>
          <View style={styles.commentButton}>
            <Text>{item.commentCounts} comments</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.cellBorder} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <RefreshableListView
          style={styles.subredditContainer}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          loadData={this.handleRefresh.bind(this)}
          refreshDescription="Refreshing..."
          onEndReached={this.loadMoreRows.bind(this)}
          onEndReachedThreshold={100}
        />
      </View>
    );
  }
}

module.exports = Subreddit;
