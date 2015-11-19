import React from 'react-native';
import relativeDate from '../utils/relative-date';
import Api from '../api';

let {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  PixelRatio
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

  row: {
    paddingTop: 5,
    paddingBottom: 5
  },

  comments: {
    padding: 10
  },

  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },

  detailText: {
    fontSize: 14,
  },

  score: {
    fontSize: 13,
    color: '#999999'
  },

  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: 1 / PixelRatio.get()
  },

  nested: {
    marginLeft: 10
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
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },
  comment: {
    flex: 1,
    fontSize: 16,
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
  author: {
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

    this.state = {
      comments: [],
      loading: true
    };

    Api.getComments(this.props.data.subreddit, this.props.data.id).then((result) => {
      this.setState({
        detail: result.detail,
        comments: result.comments,
        loading: false
      });
    });
  }

  renderComment(item) {
    if (item.more) {
      return <Text key={item.id}>MORE BUTTON</Text>;
    }

    var nested = null;

    if (item.comments && item.comments.length) {
      nested = (
        <View style={styles.nested}>
          {item.comments.map(this.renderComment.bind(this))}
        </View>
      );
    }

    return (
      <View style={styles.row} key={item.id}>
        <View style={styles.textContainer}>
          <Text style={styles.author}>
            {item.author}
          </Text>
          <Text>
            {item.score}
          </Text>
          <Text style={styles.comment}>
            {item.text}
          </Text>
        </View>
        <View style={styles.cellBorder} />
        {nested}
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
                  <Text style={styles.time} numberOfLines={1}>
                    {relativeDate(item.created)}
                  </Text>
                </View>
                <Text style={styles.detailText}>
                  {item.text}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.comments}>
            {this.state.comments.map(this.renderComment.bind(this))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

module.exports = Topic;
