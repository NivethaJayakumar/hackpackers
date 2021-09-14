import React, {useState, useEffect} from 'react';
import {createBrowser} from '../RemoteHQ';
import { Checkbox, CheckboxGroup, Button, Input, Spinner } from '@momentum-ui/react';

interface Props {
  embeddedAppSdk: any
}

export default ({embeddedAppSdk}: Props) => {
  const [frameURL, setFrameURL] = useState('');
  const [kioskMode, setKioskMode] = useState(false);
  const [incognitoMode, setIncognitoMode] = useState(false);
  const [allowFullScreen, setAllowFullScreen] = useState(false);
  const [allowOthersToEdit, setAllowOthersToEdit] = useState(false);
  const [browserURL, setBrowserURL] = useState('https://webex.com');
  const [iFrameIsLoading, setIFrameIsLoading] = useState(false);
  const [iFrameVisibility, setIFrameVisibility] = useState(false);
  const [participantView, setParticipantView] = useState(false);
  const [embedURL, setEmbedURL] = useState('');
  const [space, setSpace] = useState("");

  useEffect(() => {
    if(location.search) {
      console.log('Participant View')
      const frameUrl = decodeURIComponent(location.search).replace('?url=', '');

      embeddedAppSdk.getUser().then((user) => {
        console.log(user);
        setFrameURL(`${frameUrl}&userName=${user.displayName}`);
        setParticipantView(true);
      })
    } else {
      console.log('Host View');
      embeddedAppSdk.getSpace().then((space) => {
        setSpace(JSON.stringify(space))
      })
    }
  }, [location.search]);


  const handleOnCreateBrowser = async (event) => {
    event.preventDefault();
    setIFrameIsLoading(true);
    const {data: {embedURL}} = await createBrowser(
      kioskMode,
      incognitoMode,
      browserURL
    );

    const user = await embeddedAppSdk.getUser() || {displayName: 'Guest'};
    console.log(user);
    const url = `${embedURL}&role=owner&allowFullscreen=${allowFullScreen}&userName=${user.displayName}`;
    setFrameURL(url);
    setEmbedURL(embedURL);
  };

  const handleOnShareWithOthers = (event) => {
    event.preventDefault();
    const role = allowOthersToEdit ? 'owner' : 'guest';
    const url = `https://remotehq.ngrok.io?url=${embedURL}&role=${role}&allowFullscreen=${allowFullScreen}`;
    
    embeddedAppSdk.shareApp(url);
  }

  const iFrameLoadComplete = () => {
    if(frameURL) {
      setIFrameIsLoading(false);
      setIFrameVisibility(true);
    }
  };

  return <div className="browser">
    <div>{space}</div>
   {!frameURL ? <div className="inputs">
      <CheckboxGroup name='CheckboxGroup1'>
        <Checkbox
          value='Kiosk Mode'
          label='Kiosk Mode'
          htmlId='kiosk'
          onClick={() => {setKioskMode(!kioskMode) }}
        />
        <Checkbox
          value='Incognito Mode'
          label='Incognito Mode'
          htmlId='incognito'
          onClick={() => {setIncognitoMode(!incognitoMode)}}
        />
        <Checkbox
          value='Allow Full Screen'
          label='Allow Full Screen'
          htmlId='allowFullscreen'
          onClick={() => {setAllowFullScreen(!allowFullScreen) }}
        />
        <Checkbox
          value='Allow Others to Edit'
          label='Allow Others to Edit'
          htmlId='allowEdit'
          onClick ={() => {setAllowOthersToEdit(!allowOthersToEdit)}}
        />
        <Input
          name='Browser URL'
          label='Browser URL'
          htmlId='defaultInput'
          inputSize='small-5'
          placeholder={browserURL}
          onChange={(e) => {setBrowserURL(e.target.value)}}
          className="input"
        />
      </CheckboxGroup>
      <Button
        onClick={(e) => handleOnCreateBrowser(e)}>Create The Browser</Button>
    </div> : !iFrameIsLoading && !participantView && <Button
      onClick={(e) => {handleOnShareWithOthers(e)}}
      className="shareOthers">Share With Others</Button>}
    {iFrameIsLoading && <Spinner />}
    <div className="iframe">
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
    </div>
  </div>
}
