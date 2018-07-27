import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

class WorkListScreen extends React.Component {
  _record = async () => {
    this.props.navigation.navigate('Recording');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is worklist screen</Text>
        <Button title="Record Audio" onPress={this._record} />
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

export default WorkListScreen;
