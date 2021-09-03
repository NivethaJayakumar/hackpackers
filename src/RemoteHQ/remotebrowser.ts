import axios from './axiosInstance';


export const createBrowser = async (): Promise<any> => {
  try {

    return await axios.post('/cb');

  } catch (error) {
    console.log(`RemoteHQ --- create browser, ${error}`);
  }
};
