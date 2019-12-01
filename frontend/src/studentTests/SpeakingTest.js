/* eslint-disable no-undef */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import Recorder from './Recorder';
import AudioPlayer from 'react-h5-audio-player';
import server from '../helper/currentServer.js';

import Layout from '../core/Layout';
import './styles/styles.css';
import {testMaterials} from './testMaterials';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const SpeakingTest = (props) => {
  // Get userId from localStorage
  const retreivedItem = localStorage.getItem('jwt');
  const user_Id = JSON.parse(retreivedItem).user._id;

  let taskNo = !props.location.state ? 1 : props.location.state.taskNo;

  const [trackNo, setTrackNo] = useState(0);
  const [userId] = useState(user_Id);
  // console.log('UserId from SpeakingTest   '+userId);
  const [hidePlayer, setHidePlayer] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [completionMsg, setCompletionMsg] = useState('');
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [FAIcon, setFAIcon] = useState('check');
  const [FAIconSize] = useState('4x');

  
  const testAudio = testMaterials[taskNo][0].audioFiles;
  const testLength = testMaterials[taskNo][0].audioFiles.length;
  const testTasks = testMaterials[taskNo][0].tasks;

  const [completedTest, setCompletedTest] = useState(false);
  const [clickedToFinish, setClickedToFinish] = useState(false);

  const listenIcon = 'headphones';
  const speakIcon = 'comment';

  const testCompletionMsg = 'You have now completed this test. Thank you for participating.';

  const audioFile = testMaterials[taskNo][0].audioFiles[trackNo];
  const fileExt = '.wav';
  const url = `${server()}/api/audio/playAudio/${taskNo}/${audioFile}${fileExt}`;
  // console.log('URL: '+ url);
  // Increments the track number & checks for test completion
  const incTrack = () => {
    if (trackNo < testLength) {
      setTrackNo(trackNo + 1);
    }
    if (trackNo === testLength - 1) {
      setShowComponent(false);
      setCompletionMsg(
        testCompletionMsg
      );
    }
  };

  // Hides the audio player & displays the 'next button' component
  // Also disables the button initially while playing
  const setupTestStart = () => {
    setHidePlayer(true);
    setShowComponent(true);
    setNextBtnDisabled(false);
  };

  // Displays user message 'Please Listen'
  const displayUserMsg = () => {
    if (!nextBtnDisabled && trackNo !== 0 && trackNo !== testLength) {
      setFAIcon(listenIcon);
    } else if (trackNo !== 0 && trackNo !== testLength) {
      setFAIcon(speakIcon);
      setTimeout(() => {
        setNextBtnDisabled(false);
      }, 3000);
    }
  };

  const insertAfter = (el, referenceNode) => {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
  };

  const showTasks = trackNo => (<div>{testTasks[trackNo]}</div>);

  const addButtonAfter = (hook, msg= '') => {
    const btnHook = document.querySelector(hook);
    const newBtn = document.createElement('button');
    newBtn.innerText = msg;
    newBtn.addEventListener('click', () => {setClickedToFinish(true)});
    insertAfter(newBtn, btnHook);
  }

  const clearIcon = (icon) => {
    // uses the check icon (could be any other) to set a blank icon
    // the check icon is set to transparent in css
    if (FAIcon !== 'check') setFAIcon(icon);
  }

  let player;
  
  if (trackNo !== testLength) {
    player = (
      <AudioPlayer
        src={url}
        onPlay={() => {
          setNextBtnDisabled(true);
          displayUserMsg();
        }}
        onEnded={() => (trackNo === 0 ? setupTestStart() : displayUserMsg())}
        hidePlayer={hidePlayer}
      />
    );
  } else if (!completedTest){
    displayUserMsg();
    clearIcon('check');
    addButtonAfter('.user-msg', 'Click to Finish');
    setCompletedTest(true);
  }

  const redirectTo = (route) => {
    if (clickedToFinish) {
      return <Redirect to={route} />
    }
  }

  return (
    <Layout
      title="Speaking Test 2"
      description=""
      className="container-fluid noselect"
    > 
      <div className="container w-20">
       
      {showTasks(trackNo)}
      {completionMsg}
      <Recorder trackNo={trackNo} userId={userId} audioFiles={testAudio} />
      
      {player}
      <br />
      <FontAwesomeIcon
        icon={FAIcon}
        size={FAIconSize}
        style={{color: 'green'}}

      />
      <p className="user-msg"></p>
      <button
        className="next-task-btn"
        style={showComponent ? {} : {display: 'none'}}
        onClick={trackNo < testLength ? incTrack : null}
        disabled={nextBtnDisabled}
      >
        {trackNo === 0 ? 'スタート' : '次へ'}
      </button>
      {redirectTo('/')}
      </div>
     
    </Layout>
  );
};

// SpeakingTest.propTypes = {
//   location: PropTypes.object
// }

export default SpeakingTest;
