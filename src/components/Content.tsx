import React, {useState} from 'react';
import {Button, Icon} from '@momentum-ui/react';
import {createRoom} from '../RemoteHQ';
import EmbeddedBrowser from './EmbeddedBrowser';
import Session from './Session';

interface Props {
  embeddedAppSdk: any
}

export default ({embeddedAppSdk}: Props) => {
  const [showOptions, setShowOptions] = useState(true);
  const [showSession, setShowSession] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const handleSessionOnClick = async (event) => {
    event.preventDefault();
    setShowSession(true);
    setShowOptions(false);
  };

  const handleBrowserOnClick = async (event) => {
    event.preventDefault();
    setShowBrowser(true);
    setShowOptions(false);
  }
  const session = showSession ?  
    <Session embeddedAppSdk={embeddedAppSdk}/> :
    showOptions && <div className="sessionOption">
    <Button 
        circle
        color="blue"
        onClick={async (event) => {await handleSessionOnClick(event)}}
      > 
        <Icon name="enter-room_20" />
      </Button >
      <div className="label" >Session</div>
    </div>;

  const browser = showBrowser ?
  <EmbeddedBrowser embeddedAppSdk={embeddedAppSdk} />:
  showOptions && <div className="browserOption">    
    <Button 
      circle
      disabled
      color="blue"
      onClick={async (event) => {await handleBrowserOnClick(event)}}
    > 
      <Icon name="browser_20" />
    </Button >
    <div className="label" >Browser</div>
  </div>;
  
  return <div className="options">
    {session}
    {browser}
  </div>;
}