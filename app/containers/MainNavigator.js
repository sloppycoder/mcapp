import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import WorkListScreen from './WorkListScreen';
import RecordingScreen from './RecordingScreen';
import SettingsScreen from './SettingsScreen';
import LoginScreen from './LoginScreen';
import AuthLoadingScreen from './AuthLoadingScreen';

const WorkListNavigator = createStackNavigator({
  WorkList: WorkListScreen,
  Recording: RecordingScreen
});

WorkListNavigator.navigationOptions = {
  tabBarLabel: 'Work',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
};

const SettingsNavigator = createStackNavigator({
  Settings: SettingsScreen
});

SettingsNavigator.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-options${focused ? '' : '-outline'}`
          : 'md-options'
      }
    />
  )
};

const AppNavigator = createBottomTabNavigator({
  WorkListNavigator,
  SettingsNavigator
});

const AuthNavigator = createStackNavigator({ Login: LoginScreen });

const AuthLoadingNavigator = createStackNavigator({
  screen: AuthLoadingScreen
});

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingNavigator,
    Auth: AuthNavigator,
    App: AppNavigator
  },
  {
    initialRouteName: 'AuthLoading'
  }
);
