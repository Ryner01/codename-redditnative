import React from 'react-native';
import relativeDate from '../utils/relative-date';
import Api from '../api';

let {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  ScrollView
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column'
  },

  detail: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10
  },

  comments: {
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
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 !== r2;
      }
    });

    this.state = {
      dataSource: ds.cloneWithRows([]),
      loading: true
    };

    Api.getComments(this.props.data.subreddit, this.props.data.id).then((result) => {
      this.setState({
        detail: result.detail,
        dataSource: this.state.dataSource.cloneWithRows(result.comments),
        loading: false
      });
    });
  }

  renderComment(item) {
    return (
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.domain}>
            {item.author}
          </Text>
          <Text style={styles.title}>
            {item.text}
          </Text>
        </View>
        <View style={styles.cellBorder} />
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return <Text>Loading</Text>;
    }

    let item = this.state.detail;
    let image = item.image ? (
      <Image
      source={ { uri: item.image } }
      style={styles.cellImage}
      />
    ) : null;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
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
          </View>
          <View style={styles.comments}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderComment.bind(this)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

module.exports = Topic;
