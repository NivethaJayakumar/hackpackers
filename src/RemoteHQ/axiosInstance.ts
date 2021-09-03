import axios from 'axios';


export default axios.create({
  baseURL: 'https://api.remotehq.com/v1',
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer Xo40ruUVyTvFcz7fk5XnDYKaeDuQ5QffIGw3b+KHjr0=",
  }
});

/**
 *     // TODO: make sure server responds correspondingly
    const response = fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://api.remotehq.com/v1/rooms')}`,
    { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer Xo40ruUVyTvFcz7fk5XnDYKaeDuQ5QffIGw3b+KHjr0=',
    },
    body: JSON.stringify({
      name,
      allowGuestAccess,
      videoConferenceEnabled: false,
      imageURL,
      type,
    })
  });
 */