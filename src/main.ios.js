/**
 	* React Native Webpack Starter Kit
 	* https://github.com/jhabdas/react-native-webpack-starter-kit
 */

import React from 'react-native';
import App from './components/App.js'

const {
	AppRegistry,
	View,
	Text,
	Navigator
} = React;

class Reddit extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
    return (
			<Navigator
      	initialRoute={
      		{name: 'App', component: App}
      	}
        configureScene={() => {
        	return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
        	if (route.component) {
          	return React.createElement(route.component, { navigator });
         	}
      	}}
  		/>
		);
  }
}

AppRegistry.registerComponent('App', () => Reddit);
