import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components';
import EmbeddedAppSDK from './EmbeddedAppSDK';


setTimeout(async () => {
  const embeddedAppSdk = new EmbeddedAppSDK();

  try {
    await embeddedAppSdk.onReady();

    ReactDOM.render(<App embeddedAppSdk={embeddedAppSdk}/>,
      document.getElementById('root')
    );
  } catch(e) {
    console.log(e)
  }
}, 0)