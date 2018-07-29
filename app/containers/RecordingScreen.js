import React from 'react';
import { Slider, Text, View } from 'react-native';
import { Audio, FileSystem, Permissions } from 'expo';

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
  static navigationOptions = () => {
    return {
      title: 'Record Audio'
    };
  };
  constructor(props) {
    super(props);

    this.recording = null;
    this.sound = null;
    this.recordingSettings = JSON.parse(
      JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY)
    );

    this.state = {
      recorderStatus: PlayerStatus.PLAY,
      displayRecording: true,
      haveRecordingPermissions: false,
      isRecording: false,
      recordingDuration: null,
      soundPosition: null,
      soundDuration: null
    };
  }

  componentDidMount() {
    this._askForPermissions();
  }

  componentWillUnmount() {
    if (this.recording !== null) {
      // this._stopRecording();
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }
    this._unloadPlayer();
  }

  // Private Methods
  _askForPermissions = async () => {
    // Recording Permission
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({ haveRecordingPermissions: response.status === 'granted' });
  };

  _setUpRecording = async () => {
    // Set Audio Mode
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    });

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateRecordingTimerStatus);

    this.recording = recording;

    this._startRecording();
  };

  _setUpPlayer = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    });
    const { sound, status } = await this.recording.createNewLoadedSound(
      {
        isLooping: true,
        isMuted: false,
        volume: 1.0,
        rate: 1.0,
        shouldCorrectPitch: true
      },
      this._updateSoundTimerStatus
    );
    this.sound = sound;
  };

  _unloadPlayer = async () => {
    if (this.sound !== null) {
      try {
        await this.sound.unloadAsync();
      } catch (error) {
        console.log('error', error);
      }

      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
  };

  _startRecording = async () => {
    this.recording.setOnRecordingStatusUpdate(this._updateRecordingTimerStatus);
    try {
      await this.recording.startAsync();
    } catch (error) {
      // An error occurred!
      console.log('error *****', error);
    }
  };

  _pauseRecording = async () => {
    try {
      await this.recording.pauseAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
  };

  _stopRecording = async () => {
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    // Setup Player
    this._setUpPlayer();
  };

  _updateRecordingTimerStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis
      });
    }
  };

  _updateSoundTimerStatus = status => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _getTimeFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getTimeFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getTimeFromMillis(0)}`;
  }

  _getPlaybackTimestamp() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return `${this._getTimeFromMillis(
        this.state.soundPosition
      )} / ${this._getTimeFromMillis(this.state.soundDuration)}`;
    }
    return '';
  }

  // Button Action
  _onRecordStartButton = () => {
    // Implement Audio Recording Start Logic
    this.setState({ recorderStatus: PlayerStatus.START });

    // Setup and Start Recording
    this._setUpRecording();
  };

  _onRecordPauseButton = () => {
    // Implement Audio Recording Pause Logic
    if (this.state.displayRecording) {
      // Audio Recoder Player
      // Pause Recording
      if (this.state.recorderStatus == PlayerStatus.START) {
        // Pause Audio Recording
        this._pauseRecording();
      } else {
        // Start Audio Recording
        this._startRecording();
      }
    } else {
      // Audio Media Player
      if (this.sound != null) {
        if (this.state.recorderStatus == PlayerStatus.START) {
          this.sound.pauseAsync();
        } else {
          this.sound.playAsync();
        }
      }
    }

    this.setState({
      recorderStatus:
        this.state.recorderStatus == PlayerStatus.START
          ? PlayerStatus.PAUSE
          : PlayerStatus.START
    });
  };

  _onRecordStopButton = () => {
    // Implement Audio Recording Stop Logic
    this.setState({
      recorderStatus: PlayerStatus.STOP,
      displayRecording: false
    });
    this._stopRecording();
  };

  _updateSeekSliderPosition() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return this.state.soundPosition / this.state.soundDuration;
    }

    return 0;
  }

  _onSliderValueChange = value => {};

  _onSliderSlidingComplete = async value => {};

  render() {
    return (
      <View style={[styles.flx1, styles.bgWhite]}>
        {!this.state.haveRecordingPermissions ? (
          <View style={[styles.flx1, styles.aic, styles.jcc]}>
            <Text style={[styles.tc, styles.normal, styles.f4]}>
              {
                'You must enable audio recording permissions in order to use this app.'
              }
            </Text>
          </View>
        ) : this.state.recorderStatus == PlayerStatus.PLAY ? (
          <MediaButton
            title={'Record'}
            styles={[styles.flx1, styles.aic, styles.jcc]}
            buttonStyles={[styles.bgPlay]}
            onButtonPress={this._onRecordStartButton}
          />
        ) : (
          <View style={[styles.flx1]}>
            <View style={[styles.flx1, styles.flxc, styles.aic, styles.jcsa]}>
              <Text style={[styles.tc, styles.b, styles.f2]}>
                {this.state.displayRecording
                  ? this._getRecordingTimestamp()
                  : this._getPlaybackTimestamp()}
              </Text>
              {!this.state.displayRecording ? (
                <Slider
                  style={{ width: '80%' }}
                  disabled={false}
                  value={this._updateSeekSliderPosition()}
                  onValueChange={this._onSliderValueChange}
                  onSlidingComplete={this._onSliderSlidingComplete}
                />
              ) : null}
            </View>
            <View style={[styles.flx1, styles.flxr, styles.aic, styles.jcsa]}>
              <MediaButton
                title={
                  this.state.recorderStatus == PlayerStatus.START
                    ? 'Pause'
                    : this.state.displayRecording
                      ? 'Record'
                      : 'Play'
                }
                styles={
                  this.state.displayRecording
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
              {this.state.displayRecording ? (
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
