import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  Platform
} from 'react-native';

class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    title: 'Please authenticate'
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    //Check if login token exist, then show fingerprint option if hardware available and is enrolled. Else, Launch login screen.
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      //Check Whether fingerprint hardware available or not.
      let isFingerprintHardwareAvailable = await Expo.Fingerprint.hasHardwareAsync();
      if (isFingerprintHardwareAvailable) {
        //check fingerprint enrolled or not. If enrolled, give fingerprint authentication option to user.
        let isFingerprintEnrolled = await Expo.Fingerprint.isEnrolledAsync();
        if (isFingerprintEnrolled) {
          this.setState({ isLoading: false });
          this._loginWithFingerPrint();
          return;
        }
      }
    }

    //This will switch to the Auth screen and this loading screen will be unmounted and thrown away.
    this.props.navigation.navigate('Auth');
  };

  _loginWithFingerPrint = async () => {
    let response = await Expo.Fingerprint.authenticateAsync();
    if (response.success) {
      this.props.navigation.navigate('App');
    } else {
      if (Platform.OS === 'ios') {
        this.props.navigation.navigate('Auth');
      } else {
        Alert.alert(
          'Authentication Failed',
          'your finger print is not valid! try again',
          [
            { text: 'OK', onPress: () => this._loginWithFingerPrint() },
            {
              text: 'Cancel',
              onPress: () => this.props.navigation.navigate('Auth')
            }
          ],
          { cancelable: false }
        );
      }
    }
  };

  // Render any loading content that you like here
  render() {
    const isLoading = this.state.isLoading;
    let view;
    if (isLoading) {
      view = <ActivityIndicator />;
    } else {
      view = (
        <View style={styles.fingerprintContainer}>
          <Image source={require('../assets/ic_fingerprint.png')} />
          <Text style={styles.fingerprinttext}>
            {' '}
            Touch your fingerprint sensor to unlock
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        {view}
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
  },
  fingerprintContainer: {
    alignItems: 'center'
  },
  fingerprinttext: {
    marginTop: 20
  }
});

export default AuthLoadingScreen;
