import React from 'react-native';

const {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
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
})

class Settings extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
   		<View style={styles.container}>
     		<TouchableHighlight style={styles.button} onPress={this.props.login.bind(this)}>
        	<Text style={styles.buttonText}>Login</Text>
      	</TouchableHighlight>
    	</View>
		);
	}
}

module.exports = Settings;
