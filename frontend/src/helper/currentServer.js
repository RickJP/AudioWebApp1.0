const currentServer = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000/api/';
  } else {
    return 'https://english4all.live/api/';
  }
};

export default currentServer;