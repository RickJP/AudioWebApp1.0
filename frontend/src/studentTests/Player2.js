
import React from 'react';
import AudioPlayer from "react-h5-audio-player";

const Player2 = ({
  url
}) => (
  <AudioPlayer
    src={url}
    onPlay={e => console.log("onPlay")}
    onEnded={e => {}}
  />
)

export { Player2};




