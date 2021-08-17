import React, {Component} from 'react';
import Webex from 'webex';
import {Spinner, Avatar} from '@momentum-ui/react';

declare type Props = null;

export default class App extends Component {
  constructor(props: Props) {
    super(props);

    // TODO: USE THE SDK
    // this.webex = new Webex({
    //   credentials: token
    // });
    this.state = {
      webexIsConnected: false,
    };
  }

  render(): JSX.Element {

    return <div>
      {true ? 
        <div className="app">
          <div className="header" />
          <div className="content">
            <Avatar src="https://avatar-prod-us-east-2.webexcontent.com/Avtr~V1~1eb65fdf-9643-417f-9974-ad72cae0e10f/V1~47c32d0b-0444-460d-8bce-2265b501aac5~311b7801865d484fb072dd0d5e8374bd~1600" />
            <Avatar src="https://avatar-prod-us-east-2.webexcontent.com/Avtr~V1~1eb65fdf-9643-417f-9974-ad72cae0e10f/V1~c2b605da-484e-42ff-8cc5-cb2ea8d21480~ee9b71a2768a4f3399847f740c5916a2~1600" />
            <Avatar src="https://avatar-prod-us-east-2.webexcontent.com/Avtr~V1~1eb65fdf-9643-417f-9974-ad72cae0e10f/V1~7b383e03-f175-4ae4-b60a-6d8b378d2ffd~cde996507221414a8474c687450fd24f~1600" />
            <Avatar src="https://avatar-prod-us-east-2.webexcontent.com/Avtr~V1~1eb65fdf-9643-417f-9974-ad72cae0e10f/V1~c2b605da-484e-42ff-8cc5-cb2ea8d21480~ee9b71a2768a4f3399847f740c5916a2~1600" />
            <Avatar src="https://avatar-prod-us-east-2.webexcontent.com/Avtr~V1~1eb65fdf-9643-417f-9974-ad72cae0e10f/V1~c2b605da-484e-42ff-8cc5-cb2ea8d21480~ee9b71a2768a4f3399847f740c5916a2~1600" />
            <div> You are now connected! </div>
          </div>
        </div> : 
        <Spinner />}
    </div>
  }
}