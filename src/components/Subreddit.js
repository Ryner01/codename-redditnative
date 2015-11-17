import React from 'react-native';
import Api from '../api';

const {
  Text,
  ListView,
  View
} = React;

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

  render() {
    return (
      <View>
        <Text>{this.props.name}</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.title}</Text>}
        />
      </View>
    );
  }
}

module.exports = Subreddit;
