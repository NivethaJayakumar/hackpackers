import React, {useState} from 'react';
import {Button} from '@momentum-ui/react';
import {createRoom} from '../RemoteHQ';

interface Props {

}

export default (props: Props) => {
  const [frameURL, setFrameURL] = useState('');
  const [iFrameRef, setIFrameRef] = useState();
  const [iFrameisLoading, setIFrameIsLoading] = useState(false);
  const [iFrameVisibility, setIFrameVisibility] = useState(false);

  const setRef = (newIframe) => {
    setIFrameRef(newIframe)
  };

  const handleOnClick = async (event) => {
    event.preventDefault();
    const {data: {url}} = await createRoom('hackpackers');
    location.href = url;
    setFrameURL(url);
  };

  const iFrameLoadComplete = () => {
    if(frameURL) {
      setIFrameIsLoading(false);
      setIFrameVisibility(true);
    }
  };

  return <iframe 
        title="remoteHQ"
        ref={setRef}
        className={`${iFrameVisibility ? 'showIFrame' : 'hideIFrame'}`}
        name="remoteHQ"
        height="100%"
        id="remoteHQ"
        src={"https://rooms.remotehq.com/cisco-remotehq/hackpackers?iframeSource=arash-cisco&autoJoinAsGuest=arash"}
        onLoad={() => {iFrameLoadComplete();}}
        width="100%"
      />;
}