import React, {Component} from 'react';
import Webex from 'webex';
import {Spinner, Avatar} from '@momentum-ui/react';
import Session from './Session';
import Content from './Content';
import EmbeddedBrowser from '../EmbeddedBrowser';
import WebexEASDK from '../Webex';

interface Props  {
  embeddedAppSdk: any
}

export default class App extends Component {
  embeddedAppSdk: any;

  constructor(props: Props) {
    super(props);

    this.embeddedAppSdk = props.embeddedAppSdk;
    this.state = {
      webexIsConnected: false,
    };
  }

  render(): JSX.Element {

    return <div className="wrapper">
      {true ? 
        <div className="app">
          <div className="content">
            <Content embeddedAppSdk={this.embeddedAppSdk} />
          </div>
        </div> : 
        <Spinner />}
    </div>
  }
}