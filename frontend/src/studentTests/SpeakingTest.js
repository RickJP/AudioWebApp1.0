import React, {Component, useState, useEffect} from 'react';
import Layout from '../core/Layout';
import './styles/style.css';

import Recorder from './Recorder';
import Recorder2 from './Recorder2';
// import { Player } from './Player';
// import { Player2 } from './Player2';

import AudioPlayer from "react-h5-audio-player";
import { isAuthenticated } from "../auth";

// const useAudio = url => {
//   const [audio] = useState(new Audio(url));
//   const [playing, setPlaying] = useState(false);

//   const toggle = () => setPlaying(!playing);

//   useEffect(() => {
//     playing ? audio.play() : audio.pause();
//   }, [playing]);

//   return [playing, toggle];
// };



const SpeakingTest = () => {

  const [trackNo, setTrackNo] = useState(0);
  const [audioFiles] = useState(['Instructions', 'Set1', 'Set2', 'Set3', 'Set4', 'Set5', 'Set6', 'Set7', 'Set8', 'Set9', 'Set10']);
  //const [filesPlayed] = useState([0,0,0]);
  const [nextTrack, setNextTrack] = useState(false);
  const [hidePlayer, setHidePlayer] = useState(false);
  const [recNow, setRecNow] = useState(0);
  const [text] = useState([`このタスクでは、関係のない10組の日本語の言葉を聞きます。（２語の組を２回、３語の組を２回、４語の組を２回、５語の組を２回、６語の組を２回聞きます。）各組の語を覚えて、聞いた順番どおりにそれらの語を使って、各語につき１文ずつ、作ってください。各組の語を聞いた後に文を作るように、音源でも指示が出ます。できるだけ素早く文法的にも意味的にも正しい文をそれぞれの語につき１文作ってください。10秒しかありません。また、毎回異なる動詞や文法を使うようにしてください。各組の各語につき１文です。タスクでの発話は録音されます。ご参加いただきありがとうございます。
  `, `Tセット１ (２語)`, `Tセット2 (２語)`, `Tセット3 (２語)`, `Tセット4 (２語)`, 
  `Tセット5 (２語)`, `Tセット6 (２語)`, `Tセット7 (２語)`, `Tセット8 (２語)`,
  `Tセット9 (２語)`, `Tセット10 (２語)`,  ])

  const incTrack = () => {    
    if (trackNo  < audioFiles.length && nextTrack) {
      setTrackNo(trackNo + 1);
    }
  };

  const setTrackHidePlayer = () => {
    setNextTrack(true);
    setHidePlayer(true);
    setRecNow(1);
  }

  useEffect(() => {
   
  }, [recNow]);

  const showTracks = (audioFiles, trackNo, recNow) => {
    return (
      <div>
        {/* {audioFiles.map((item, idx) => (
          <li key={idx}>{idx} - {item}</li>
        ))} */}
        Current track: <em id={trackNo}>{trackNo}</em>
        <p>Rec Now: {recNow}</p>
      </div>
  );
  }
  // const {
  //   user: { name }
  // } = isAuthenticated();
  const audioFile = audioFiles[trackNo];
  //const url = `http://localhost:8000/api/playAudio/${audioFile}.wav`;
  const url = `https://english4all.live/api/playAudio/${audioFile}.wav`;
  // const [playing, toggle] = useAudio(url);

  const showText = (trackNo) => {
    return (
      <div>
        {text[trackNo]}
      </div>
    )
  }

  return (
    <Layout
      children
      title="Listening Test"
      description=""
      className="container-fluid noselect"
    >
     
      {/* <button id="play" onClick={toggle}>{playing ? 'Pause' : 'Play'}</button> */}
      {showText(trackNo)}
      <Recorder2 recNow={recNow} />
     
    
      <br />
      {/* <Player2  url={url} finished /> */}
      <br/>
      <AudioPlayer
        src={url}
        // onPlay={e => filesPlayed[trackNo] = 1}
        onEnded={e => setTrackHidePlayer()}
        hidePlayer={hidePlayer}
      /> 
      {showTracks(audioFiles, trackNo, recNow)}
      {/* <button id="inc-btn" onClick={incTrack}>Inc</button> */}
      <button onClick={trackNo < audioFiles.length -1 ? incTrack : null} disabled={false}>Next</button>

    </Layout>
  );
};

export default SpeakingTest;

