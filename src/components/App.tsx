import React, {Component} from 'react';
import PropTypes, {InferProps} from 'prop-types';
import Browser from './Browser';

export default class App extends Component {
  embeddedAppSdk: any;
  static propTypes: {
    embeddedAppSdk: any
  }

  constructor(props: InferProps<typeof App.propTypes>) {
    super(props);

    this.state = {
      webexIsConnected: false,
    };
  }

  render(): JSX.Element {

    return <div className="app">
            <div className="content">
              <Browser embeddedAppSdk={this.embeddedAppSdk} />
            </div>
          </div>; 
  }
}

App.propTypes = {
  embeddedAppSdk: PropTypes.any.isRequired
};