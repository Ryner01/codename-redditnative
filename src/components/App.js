import React from 'react-native';
import Auth from '../auth';

import Subreddit from './Subreddit';
import Topic from './Topic';
import Favorites from './Favorites';

let {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Navigator,
  TabBarIOS,
} = React;

var styles = StyleSheet.create({
  pageContainer: {
    marginTop: 70,
    backgroundColor: 'white',
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

let NavigationBarRouteMapper = {
  LeftButton(route, navigator, index) {
    if (index > 0) {
      return (
        <TouchableHighlight onPress={() => {
          if (index > 0) {
            navigator.pop();
          }
        }}>
        <Text>Back</Text>
        </TouchableHighlight>
      );
    }
  },

  RightButton() {
    return null;
  },

  Title(route) {
    let name = route.navTitle == null ? route.name : route.navTitle;
    return <Text>{name}</Text>;
  }
};

class App extends React.Component {
  static childContextTypes = {
    auth: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
      tab: 'default'
    };

    this.auth = new Auth();
    this.auth.init();
  }

  getChildContext() {
    return {
      auth: this.auth
    };
  }

  _renderSettings() {
    return (
      <Text>Settings</Text>
    );
  }

  _renderSearch() {
    return (
      <Text>Search</Text>
    );
  }

  _renderFrontpage() {
    return (
      <Navigator ref="frontPageNav"
        initialRoute={{name: 'Subreddit', index: 0}}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
          />
        }
        renderScene={(route, navigator) => {
          let page = null;
          if (route.name === 'Subreddit') {
            page = <Subreddit navigator={navigator} name={route.subreddit}/>;
          } else if (route.name === 'Topic') {
            page = <Topic navigator={navigator} data={route.data}/>;
          }

          return <View style={styles.pageContainer}>{page}</View>;
        }}
        />
    );
  }

  _renderDefault() {
    return (
      <Navigator ref="favNav"
        initialRoute={{name: 'Favorites', index: 0}}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
          />
        }
        renderScene={(route, navigator) => {
          let page = null;
          if (route.name === 'Subreddit') {
            page = <Subreddit navigator={navigator} name={route.subreddit}/>;
          } else if (route.name === 'Favorites') {
            page = <Favorites navigator={navigator}/>;
          } else if (route.name === 'Topic') {
            page = <Topic navigator={navigator} data={route.data}/>;
          }

          return <View style={styles.pageContainer}>{page}</View>;
        }}
        />
    );
  }

  handleLoginButton() {
    this.auth.login(() => {
      this.setState({
        authenticated: true
      });
    });
  }

  handleTabBarPress(name) {
    if (this.state.tab === name) {
      this.refs.favNav.popToTop();
    }

    this.setState({ tab: name });
  }

  render() {
    if (!this.state.authenticated) {
      return (
        <View style={styles.container}>
          <TouchableHighlight style={styles.button} onPress={this.handleLoginButton.bind(this)}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
      );
    }

    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Favories"
          systemIcon="favorites"
          selected={this.state.tab === 'default'}
          onPress={this.handleTabBarPress.bind(this, 'default')}>
          {this._renderDefault()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Favories"
          systemIcon="favorites"
          selected={this.state.tab === 'frontpage'}
          onPress={this.handleTabBarPress.bind(this, 'frontpage')}>
          {this._renderFrontpage()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          systemIcon="search"
          selected={this.state.tab === 'search'}
          onPress={this.handleTabBarPress.bind(this, 'search')}>
          {this._renderSettings()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Settings"
          systemIcon="more"
          selected={this.state.tab === 'settings'}
          onPress={this.handleTabBarPress.bind(this, 'settings')}>
          {this._renderSearch()}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

module.exports = App;