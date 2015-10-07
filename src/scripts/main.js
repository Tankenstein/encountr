import React from 'react';
import {render} from 'react-dom';
import {compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import persistState from 'redux-localstorage';

import AppComponent from './components/AppComponent';
import rootReducer from './reducers/rootReducer';
import storageConfig from './services/storageConfig';

const TARGET_NAME = 'react-mount-node';

function main() {
  const target = document.getElementById(TARGET_NAME);

  const createPersistentStore = compose(
    persistState(storageConfig.STORAGE_KEY, storageConfig)
  )(createStore);

  const appStore = createPersistentStore(rootReducer);

  render((
    <Provider store={appStore}>
      <AppComponent />
    </Provider>
  ), target);
}

window.onload = main;
