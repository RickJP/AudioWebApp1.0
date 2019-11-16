const currentServer = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000';
  } else {
    return 'https://english4all.live';
  }
};

export default currentServer;