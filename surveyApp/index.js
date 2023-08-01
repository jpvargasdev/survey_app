import React from 'react';
import ErrorBoundary from './app/screens/error_screen/error_boundary'

;import {AppRegistry} from 'react-native';
import Screens from './app/screens';
import {name as appName} from './app.json';

function App() {
  return (
    <ErrorBoundary catchErrors="always">
      <Screens />
    </ErrorBoundary>
  );
}

AppRegistry.registerComponent(appName, () => App);
