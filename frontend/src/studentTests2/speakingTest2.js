import React, {useState} from 'react';
import Layout from '../core/Layout';
import './styles/styles.css';
import Recorder from './recorder';
import AudioPlayer from 'react-h5-audio-player';
import server from '../helper/currentServer.js';
import {useCookies} from 'react-cookie';

const SpeakingTest2 = () => {
  // Get userId from localStorage
  const retreivedItem = localStorage.getItem('jwt');
  const user_Id = JSON.parse(retreivedItem).user._id;

  const [trackNo, setTrackNo] = useState(0);
  const [userId, setUserId] = useState(user_Id);
  //const [cookies, setCookie, removeCookie] = useCookies(['t']);

  const [test] = useState({
    audioFiles: ['Instructions', 'Set1', 'Set2'],
    tasks: [`Tセット１ (２語)`, `Tセット2 (２語)`, `Tセット3 (3 語)`],
  });
  console.log(test.audioFiles[0]);
  // Setup audio file name references
  const [audioFiles] = useState([
    'Instructions',
    'Set1',
    'Set2',
    // 'Set3',
    // 'Set4',
    // 'Set5',
    // 'Set6',
    // 'Set7',
    // 'Set8',
    // 'Set9',
    // 'Set10'
  ]);
  // Initialize the text to be displayed for each task
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
  const [hidePlayer, setHidePlayer] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [completionMsg, setCompletionMsg] = useState('');
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  // Increments the track number & checks for test completion
  const incTrack = () => {
    if (trackNo < audioFiles.length) {
      setTrackNo(trackNo + 1);
    }
    if (trackNo === audioFiles.length - 1) {
      setShowComponent(false);
      setCompletionMsg(
        'You have now completed this test. Thank you for participating.'
      );
    }
  };

  // Hides the audio player & displays the 'next button' component
  // Also disables the button initially while playing
  const manageComponents = () => {
    setHidePlayer(true);
    setShowComponent(true);
    setNextBtnDisabled(false);
  };

  // Displays user message 'Please Listen'
  const displayUserMsg = (msg = '') => {
    if (!nextBtnDisabled && trackNo !== 0 && trackNo !== audioFiles.length) {
      msg = 'Listen';
    } else if (trackNo !== 0 && trackNo !== audioFiles.length) {
      msg = 'Speak Now';
      setTimeout(() => {
        setNextBtnDisabled(false);
      }, 3000);
    }
    const ref = document.querySelector('.user-msg');
    ref.innerText = msg;
  };

  const insertAfter = (el, referenceNode) => {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
  };

  const audioFile = audioFiles[trackNo];
  const fileExt = '.wav';
  const url = `${server()}/api/audio/playAudio/${audioFile}${fileExt}`;

  const showTasks = trackNo => (<div>{tasks[trackNo]}</div>);

  let player;
  if (trackNo !== audioFiles.length) {
    player = (
      <AudioPlayer
        src={url}
        onPlay={e => {
          setNextBtnDisabled(true);
          displayUserMsg();
        }}
        onEnded={e => (trackNo === 0 ? manageComponents() : displayUserMsg())}
        hidePlayer={hidePlayer}
      />
    );
  } else {
    player = '';
    console.log('FINISHED');
    displayUserMsg();

    const btnHook = document.querySelector('.user-msg');
    const finishBtn = document.createElement('button');
    finishBtn.innerText = 'Press to Finish';
    insertAfter(finishBtn, btnHook);
  }

  return (
    <Layout
      children
      title="Speaking Test 2"
      description=""
      className="container-fluid noselect"
    >
      {showTasks(trackNo)}
      {completionMsg}

      
      <Recorder trackNo={trackNo} userId={userId} audioFiles={audioFiles} />



      <br /> <br />
      {player}
      <br />
      <p className="user-msg"></p>
      <button
        className="next-task-btn"
        style={showComponent ? {} : {display: 'none'}}
        onClick={trackNo < audioFiles.length ? incTrack : null}
        disabled={nextBtnDisabled}
      >
        {trackNo === 0 ? 'スタート' : '次へ'}
      </button>
    </Layout>
  );
};

export default SpeakingTest2;
