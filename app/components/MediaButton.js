import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../styles';

export default class MediaButton extends React.Component {
  _onButtonPress = () => {
    if (typeof this.props.onButtonPress === 'function') {
      // button press action
      this.props.onButtonPress();
    }
  };

  render() {
    return (
      <View style={[this.props.styles]}>
        <TouchableOpacity
          style={[
            styles.h16,
            styles.w10,
            styles.br9,
            styles.aic,
            styles.jcc,
            this.props.buttonStyles
          ]}
          onPress={this._onButtonPress}
        >
          <Text style={[styles.tc, styles.normal, styles.f5, styles.white]}>
            {this.props.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
