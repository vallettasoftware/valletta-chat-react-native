import React from 'react';
import { render } from 'react-dom';
import { getSnapshot, destroy, onSnapshot } from 'mobx-state-tree';
import { registerRootComponent } from 'expo';

import AppContainer from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(AppContainer);
