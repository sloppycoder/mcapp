import React from 'react';
import { AsyncStorage, Button, StyleSheet, View } from 'react-native';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Please login in'
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Log me in!" onPress={this._LoginAsync} />
      </View>
    );
  }

  _LoginAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default LoginScreen;
