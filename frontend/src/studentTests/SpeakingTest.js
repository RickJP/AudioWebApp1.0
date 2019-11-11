import React, {Component, useState, useEffect} from 'react';
import Layout from '../core/Layout';
import './styles/style.css';

import Recorder from './Recorder';
import Recorder2 from './Recorder2';
// import { Player } from './Player';
// import { Player2 } from './Player2';

import AudioPlayer from "react-h5-audio-player";
import { isAuthenticated } from "../auth";

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  return [playing, toggle];
};



const SpeakingTest = () => {

  const [trackNo, setTrackNo] = useState(0);
  const [audioFiles] = useState(['Instructions', 'Set1', 'Set2', 'Set3', 'Set4', 'Set5', 'Set6', 'Set7', 'Set8', 'Set9', 'Set10' ]);
  const [filesPlayed] = useState([0,0,0]);
  const [nextTrack, setNextTrack] = useState(false);
  const [hidePlayer, setHidePlayer] = useState(false);

  const incTrack = () => {
    console.log(filesPlayed);
    if (trackNo  < audioFiles.length && nextTrack) {
      setTrackNo(trackNo + 1);
    }
    if (trackNo === audioFiles.length) {
      console.log('FINISHED TEST');
    }
  };

  const setTrackHidePlayer = () => {
    setNextTrack(true);
    setHidePlayer(true);
  }

  useEffect(() => {
  }, []);

  const showTracks = (audioFiles, trackNo) => {
    return (
      <div>
        {/* {audioFiles.map((item, idx) => (
          <li key={idx}>{idx} - {item}</li>
        ))} */}
        Current track: <em id={trackNo}>{trackNo}</em>
      </div>
  );
  }
  // const {
  //   user: { name }
  // } = isAuthenticated();
  const audioFile = audioFiles[trackNo];
  const url = `http://localhost:8000/api/playAudio/${audioFile}.wav`;
  // const [playing, toggle] = useAudio(url);


  return (
    <Layout
      
      children
      title="Listening Test"
      description=""
      className="container-fluid noselect"
    >
     
      {/* <button id="play" onClick={toggle}>{playing ? 'Pause' : 'Play'}</button> */}

      <Recorder2 test={true}/>
     
    
      <br />
      {/* <Player2  url={url} finished /> */}
      <br/>
      <AudioPlayer
        src={url}
        onPlay={e => filesPlayed[trackNo] = 1}
        onEnded={e => setTrackHidePlayer()}
        hidePlayer={hidePlayer}
      /> 
      {showTracks(audioFiles, trackNo)}
      {/* <button id="inc-btn" onClick={incTrack}>Inc</button> */}
      <button onClick={incTrack} disabled={false}>Next</button>
    </Layout>
  );
};

export default SpeakingTest;

