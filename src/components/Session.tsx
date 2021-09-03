import React, {useState} from 'react';
import {Button, Icon, Spinner} from '@momentum-ui/react';
import {createRoom} from '../RemoteHQ';

interface Props {
  embeddedAppSdk: any
}

export default ({embeddedAppSdk}: Props) => {
  const [sessionURL, setSessionURL] = useState('');
  const [iFrameIsLoading, setIFrameIsLoading] = useState(false);
  const [iFrameVisibility, setIFrameVisibility] = useState(false);

  const createSession = async (event) => {
    event.preventDefault();
    const {data: {url}} = await createRoom('hackpackers');
    
    setIFrameIsLoading(true);
    setSessionURL(url);
  };

  const shareApp = async (event) => {
    event.preventDefault();
    embeddedAppSdk.shareApp(`${sessionURL}?autoJoinAsGuest`);
    const user = embeddedAppSdk.getUser();
    console.log(user);
  };

  const killApp = async (event) => {
    event.preventDefault();

    if(embeddedAppSdk.isAppBeingShared) {
      console.log()
      embeddedAppSdk.stopSharingApp();
    }

    // End the Session in remoteHQ
    setIFrameVisibility(false);
  };

  const iFrameLoadComplete = () => {
    if(sessionURL) {
      setIFrameIsLoading(false);
      setIFrameVisibility(true);
    }
  };
  const iframe = <div className="iframe">
    {iFrameIsLoading  && <Spinner /> }
    <iframe 
      title="remoteHQ"
      className={`${iFrameVisibility ? 'showIFrame' : 'hideIFrame'}`}
      name="remoteHQ"
      height="100%"
      id="remoteHQ"
      src={sessionURL}
      onLoad={() => {iFrameLoadComplete();}}
      width="100%"
    />
  </div>;
  const session = sessionURL === '' ?  <div className="customButton">
    <Button 
        circle
        color="blue"
        onClick={async (event) => {await createSession(event)}}
      > 
        <Icon name="plus_20" />
      </Button >
      <div className="label">Create a Session</div>
  </div> :
  <div className="iframeContent">
    <div className="buttons">
      <div className="customButton">
        <Button
          circle
          color="red"
          onClick={async (event) => {await killApp(event)}}
        >
           <Icon name="cancel_20" />
        </Button >
        <div className="label">End The Session</div>
      </div>
      <div className="customButton">
        <Button
          circle
          color="blue"
          onClick={async (event) => {await shareApp(event)}}
        >
          <Icon name="share_20"/>
        </Button>
        <div className="label">Share With Others</div>
      </div>
    </div>
    {iframe}
  </div>;

  return <div className="session">
    {session}
  </div>
}