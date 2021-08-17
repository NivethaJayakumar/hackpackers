import React, {Component} from 'react';
import Webex from 'webex';
import moment from 'moment';
import {Button, Icon, Spinner, Avatar} from '@momentum-ui/react';

declare type Props = null;

export default class App extends Component {
  githubPage: string;
  state: any;
  webex: any;
  props: any;
  token: string;

  constructor(props: Props) {
    super(props);

    this.githubPage = 'https://github.com/WXSD-Sales/WebexPresence';
    this.token = "";
    this.state = {
      webexIsConnected: false,
    };
    this.webex = new Webex({
      config: {
        credentials: {
          // client_id: 'Cde0812fa83e09690c8e3bd1bf91883c8aea7f3579389aadc487004e628f7a997',
          // redirect_uri: 'https://wxsd-sales.github.io/WebexPresence',
          // redirect_uri: 'https://webexpresence.ngrok.io',
          scope: 'spark:all spark:kms'
        }
      }
    }); 
  }

  async componentDidMount(): Promise<void> {
    // await this.requestToken();
  }

  async requestToken(): Promise<void> {
    this.webex.on('ready', async() => {
      await this.validateToken();
    })
  }

  async validateToken(): Promise<void> {
    if(localStorage.getItem('webex_token')) {
      if((moment(localStorage.getItem('expiration_date')).diff(moment.utc()) < 0)) {
        localStorage.removeItem('webex_token');
        localStorage.removeItem('expiration_date');
        this.webex.authorization.initiateImplicitGrant();
      } else {
        const token = localStorage.getItem('webex_token').replace('Bearer ', '');
        this.webex = new Webex({
          credentials: token
        });

        this.setState({webexIsConnected: true});
        await this.connect();
      }
    } else if (this.webex.credentials.supertoken) {
      const {access_token, expires_in} = this.webex.credentials.supertoken;
      const startDate = moment.utc();
      const expirationDate = startDate.add(Number(expires_in), 'seconds');

      localStorage.setItem('webex_token', access_token);
      localStorage.setItem('expiration_date', expirationDate.format());

      this.setState({webexIsConnected: true});
      await this.connect();
    } else {
      this.webex.authorization.initiateImplicitGrant();
    }
  }

  async connect(): Promise<void> {
    try {
      await this.webex.internal.device.register();
      await this.webex.internal.mercury.connect();
      
    } catch (error) {
      console.log(error);
    }
  }

  render(): JSX.Element {

    return <div>
      {true ? 
        <div className="app">
          <div className="header" />
          <div className="content">
            <div> You are now connected! </div>
          </div>
        </div> : 
        <Spinner />}
    </div>
  }
}