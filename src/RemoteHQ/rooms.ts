import axios from './axiosInstance';


export const createRoom = async (name: string, allowGuestAccess='true', imageURL='', type='collaboration'): Promise<any> => {
  try {

    return await Promise.resolve({
      "data": {
          "id": 33293,
          "slug": "hackpackers",
          "url": "https://rooms.remotehq.com/cisco-remotehq/hackpackers?iframeSource=arash-cisco&autoJoinAsGuest=arash"
      },
      "error": null
    });

  } catch (error) {
    console.log(`RemoteHQ --- create room, ${error}`);
  }
};

https://api.remotehq.com/v1/cb