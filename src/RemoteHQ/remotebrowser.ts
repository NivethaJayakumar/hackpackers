import axios from './axiosInstance';


export const createBrowser = async (
  kioskMode= false,
  incognitoMode= false,
  browserURL="https://webex.com",
): Promise<any> => {
  try {

    // return await axios.post('/cb', {
    //   kioskModeEnabled: kioskMode,
    //   incognitoModeEnabled: incognitoMode,
    //   browserURL,
    // });

    /** request POST /cb
     * {
     *  "browserURL": "https://webex.com", 
     *  "kioskModeEnabled":false, 
     *  "incognitoModeEnabled": true
     * }
     */
    return Promise.resolve(
      {
        "data": {
            "instanceURN": "us-east-1__e91b1e74e4e84ae0a76784c45094957d__1630952593",
            "embedURL": "https://rooms.remotehq.com/embed/remote-browser/us-east-1__539f6f793f9e41e688fafcf45b63cae7__1631033681?iframeSource=arash-cisco"
        },
        "error": null
    });

  } catch (error) {
    console.log(`RemoteHQ --- create browser, ${error}`);
  }
};
