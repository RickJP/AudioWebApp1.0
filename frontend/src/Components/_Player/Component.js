import React from 'react';
import ReactPlayer from 'react-player'
import AudioPlayer from "react-h5-audio-player";
import './style.css';


export const MyPlayerContainer = ({url}) =>
  <div>
    <AudioPlayer
    src={url}
    onPlay={e => console.log("onPlay")}
  />


    {/* <h4>Press Play</h4>
    <audio controls>
      <source src={url} type="audio/mpeg" />
    </audio> */}

    {/* <audio controls>
    <ReactPlayer url={url} playing />
    </audio> */}
    {/* <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          url={url}
          width='100%'
          height='100%'
          playing
          controls
        />
      </div> */}
  </div>;