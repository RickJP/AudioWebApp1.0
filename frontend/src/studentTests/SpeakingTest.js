import React, {useState} from 'react';
import Layout from '../core/Layout';
import './styles/style.css';
import Recorder from './Recorder';
import AudioPlayer from 'react-h5-audio-player';
import server from '../helper/currentServer.js';

const SpeakingTest = () => {
  const [trackNo, setTrackNo] = useState(0);
  const [audioFiles] = useState([
    'Instructions',
    'Set1',
    'Set2',
    'Set3',
    'Set4',
    'Set5',
    'Set6',
    'Set7',
    'Set8',
    'Set9',
    'Set10'
  ]);
  const [hidePlayer, setHidePlayer] = useState(false);
  const [tasks] = useState([
    `このタスクでは、関係のない10組の日本語の言葉を聞きます。（２語の組を２回、３語の組を２回、４語の組を２回、５語の組を２回、６語の組を２回聞きます。）各組の語を覚えて、聞いた順番どおりにそれらの語を使って、各語につき１文ずつ、作ってください。各組の語を聞いた後に文を作るように、音源でも指示が出ます。できるだけ素早く文法的にも意味的にも正しい文をそれぞれの語につき１文作ってください。10秒しかありません。また、毎回異なる動詞や文法を使うようにしてください。各組の各語につき１文です。タスクでの発話は録音されます。ご参加いただきありがとうございます。
  `,
    `Tセット１ (２語)`,
    `Tセット2 (２語)`,
    `Tセット3 (3 語)`,
    `Tセット4 (3 語)`,
    `Tセット5 (4 語)`,
    `Tセット6 (4 語)`,
    `Tセット7 (5 語)`,
    `Tセット8 (5 語)`,
    `Tセット9 (6 語)`,
    `Tセット10 (6 語)`,
  ]);
  const [showComponent, setShowComponent] = useState(false);
  const [completionMsg, setCompletionMsg] = useState('');
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const incTrack = () => {
    if (trackNo < audioFiles.length) {
      setTrackNo(trackNo + 1);
    }
    if (trackNo === audioFiles.length - 1) {
      setShowComponent(false);
      setCompletionMsg('You have now completed this test. Thank you for participating.');
    }
    console.log('incTrack trackNo = ' + trackNo)
  };

  const manageComponents = () => {
    setHidePlayer(true);
    setShowComponent(true);
    setNextBtnDisabled(false);
  };

  const showTracks = () => {
    return (
      <div>
        {/* {audioFiles.map((item, idx) => (
          <li key={idx}>{idx} - {item}</li>
        ))} */}
        Current track: <em id={trackNo}>{trackNo}</em>
      </div>
    );
  };

  const audioFile = audioFiles[trackNo];
  const fileExt = '.wav'
  const url = `${server()}/api/playAudio/${audioFile}${fileExt}`;
 
  const showTasks = trackNo => {
    return <div>{tasks[trackNo]}</div>;
  };

  let player;
  if (trackNo !== 11) {
    player = <AudioPlayer
        src={url}
        onPlay={e => {setNextBtnDisabled(true)}}
        onEnded={e => (trackNo === 0 ? manageComponents() : setNextBtnDisabled(false))}
        hidePlayer={hidePlayer}
      />
  } else {
    player = '';
  }

  return (
    <Layout
      children
      title="Listening Test"
      description=""
      className="container-fluid noselect"
    >
      {showTasks(trackNo)}
      {completionMsg}
      <Recorder trackNo={trackNo} />
      <br /> <br />
      {player}
      <br />
      <button
        style={showComponent ? {} : {display: 'none'}}
        onClick={trackNo < audioFiles.length ? incTrack : null}
        disabled={nextBtnDisabled}
      >
        {trackNo === 0 ? 'Start' : 'Next'}
      </button>
    </Layout>
  );
};

export default SpeakingTest;

