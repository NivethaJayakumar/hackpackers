import React, {useState, useEffect} from 'react';
import {createBrowser, deleteBrowser} from '../RemoteHQ';
import { Checkbox, CheckboxGroup, Button, Input, Spinner } from '@momentum-ui/react';
import EmbeddedAppSDK from '../EmbeddedAppSDK';

interface Props  {
  embeddedAppSDK: any
}

const isLocal = location.host === 'localhost:8080';

export default ({embeddedAppSdk}: Props) => {
  const [frameURL, setFrameURL] = useState('');
  const [kioskMode, setKioskMode] = useState(false);
  const [iFrameVisibility, setIFrameVisibility] = useState(false);

  useEffect(() => {
    if(location.search) {
      console.log('Participant View');
      const frameUrl = decodeURIComponent(location.search).replace('?url=', '');

     // Get user information
     // update the participant view
     // update the frameURL
    } else {
      console.log('Host View');
      // Do Nothing
    }
  }, [location.search]);


  const iFrameLoadComplete = () => {};

  return <div className="browser">
    <div className="inputs">
      <CheckboxGroup name='CheckboxGroup1'>
        <Checkbox
          value='Kiosk Mode'
          label='Kiosk Mode'
          htmlId='kiosk'
          onClick={() => {setKioskMode(!kioskMode) }}
        />
        <Input
          name='Browser URL'
          label='Browser URL'
          htmlId='defaultInput'
          inputSize='small-5'
          placeholder={}
          onChange={(e) => {}}
          className="input"
        />
      </CheckboxGroup>
      <Button
        onClick={(e) => {}}>Create The Browser</Button>
      </div>
    {!isLocal ? <div className="iframe">
       <iframe 
        title="remoteHQ"
        className={`${iFrameVisibility ? 'showIFrame' : 'hideIFrame'}`}
        name="remoteHQ"
        height="100%"
        id="remoteHQ"
        src={frameURL}
        onLoad={() => {iFrameLoadComplete();}}
        width="100%"
      />
    </div> : <p>Iframe only works inside the meeting client!</p>}
  </div>
}