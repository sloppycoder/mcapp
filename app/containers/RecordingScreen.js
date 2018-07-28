import React from 'react';
import { Slider, Text, View } from 'react-native';
import MediaButton from '../components/MediaButton';

import { styles } from '../styles';

// Enum of Recoder Player Status
const PlayerStatus = {
  PLAY: 'PLAY',
  START: 'START',
  PAUSE: 'PAUSE',
  STOP: 'STOP'
};

class RecordingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { recorderStatus: PlayerStatus.PLAY, isRecording: true };
  }

  _onRecordStartButton = () => {
    // Implement Audio Recording Start Logic
    this.setState({ recorderStatus: PlayerStatus.START });
  };

  _onRecordPauseButton = () => {
    // Implement Audio Recording Pause Logic
    this.setState({
      recorderStatus:
        this.state.recorderStatus == PlayerStatus.START
          ? PlayerStatus.PAUSE
          : PlayerStatus.START
    });
    if (this.state.isRecording) {
      // Audio Recoder Player
    } else {
      // Audio Media Player
    }
  };

  _onRecordStopButton = () => {
    // Implement Audio Recording Stop Logic
    this.setState({ recorderStatus: PlayerStatus.STOP, isRecording: false });
  };

  render() {
    return (
      <View style={[styles.flx1, styles.bgWhite]}>
        {this.state.recorderStatus == PlayerStatus.PLAY ? (
          <MediaButton
            title={'Record'}
            styles={[styles.flx1, styles.aic, styles.jcc]}
            buttonStyles={[styles.bgPlay]}
            onButtonPress={this._onRecordStartButton}
          />
        ) : (
          <View style={[styles.flx1]}>
            <View
              style={[
                styles.flx1,
                styles.jcc,
                styles.aic,
                styles.flxc,
                styles.jcsa
              ]}
            >
              <Text style={[styles.tc, styles.b, styles.f1]}>{'01:00'}</Text>
              {!this.state.isRecording ? (
                <Slider
                  style={{ width: '80%' }}
                  disabled={true}
                  step={1}
                  minimumValue={18}
                  maximumValue={71}
                  value={this.state.timer}
                  onValueChange={val => this.setState({ timer: val })}
                  onSlidingComplete={val => this.getVal(val)}
                />
              ) : null}
            </View>
            <View style={[styles.flx1, styles.flxr, styles.aic, styles.jcsa]}>
              <MediaButton
                title={
                  this.state.recorderStatus == PlayerStatus.START
                    ? 'Pause'
                    : this.state.isRecording
                      ? 'Record'
                      : 'Play'
                }
                styles={
                  this.state.isRecording
                    ? []
                    : [styles.flx1, styles.aic, styles.jcc]
                }
                buttonStyles={[
                  this.state.recorderStatus == PlayerStatus.START
                    ? styles.bgPause
                    : styles.bgPlay
                ]}
                onButtonPress={this._onRecordPauseButton}
              />
              {this.state.isRecording ? (
                <MediaButton
                  title={'Stop'}
                  buttonStyles={[styles.bgStop]}
                  onButtonPress={this._onRecordStopButton}
                />
              ) : (
                <View />
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default RecordingScreen;
