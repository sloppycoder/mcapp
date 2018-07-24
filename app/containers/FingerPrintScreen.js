import React from 'react';
import Expo from 'expo';
import { Alert, StyleSheet, View, Image, Text } from 'react-native';

class FingerPrintScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/ic_fingerprint.png')} />
        <Text style={styles.fingerprinttext}>
          {' '}
          Touch your fingerprint sensor to unlock{' '}
        </Text>
      </View>
    );
  }
  
  _LoginWithFingerPrint = async () => {
    let response = await Expo.Fingerprint.authenticateAsync();
    if (response.success) {
      this.props.navigation.navigate('App');
    } else {
      Alert.alert(
        'Authentication Failed',
        'your finger print is not valid! try again',
        [{ text: 'OK', onPress: () => this._LoginWithFingerPrint() }]
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fingerprinttext: {
    marginTop: 50
  }
});

export default FingerPrintScreen;
