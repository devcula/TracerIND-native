/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {I, J, K} from '@env';

AppRegistry.registerComponent(appName, () => App);

module.exports = {
  I,
  J,
  K,
};
