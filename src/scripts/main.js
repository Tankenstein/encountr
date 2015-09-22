import React, {render} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import AppComponent from './components/AppComponent';
import rootReducer from './reducers/rootReducer';

const TARGET_NAME = 'react-mount-node';

function main() {
  const target = document.getElementById(TARGET_NAME);
  const appStore = createStore(rootReducer);

  render((
    <Provider store={appStore}>
      {() => <AppComponent />}
    </Provider>
  ), target);
}

window.onload = main;
