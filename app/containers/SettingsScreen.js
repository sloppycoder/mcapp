import React from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';

class SettingsScreen extends React.Component {
  _logoutAsync = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is setttings screen</Text>
        <Button title="Logout" onPress={this._logoutAsync} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SettingsScreen;
