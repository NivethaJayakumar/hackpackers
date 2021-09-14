import React, {Component} from 'react';
import Webex from 'webex';
import {Spinner, Avatar} from '@momentum-ui/react';
import Browser from './Browser';

interface Props  {
  embeddedAppSdk: any
}

export default class App extends Component {
  embeddedAppSdk: any;

  constructor(props: Props) {
    super(props);

    this.embeddedAppSdk = props.embeddedAppSdk;
  }

  render(): JSX.Element {

    return <div className="app">
            <div className="content">
              <Browser embeddedAppSdk={this.embeddedAppSdk} />
            </div>
          </div>; 
  }
}