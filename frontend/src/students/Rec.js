import React, {Component, useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link, Redirect} from 'react-router-dom';
import styles from './styles/style.css';
// import WebAudioRecorder from './js/WebAudioRecorder.min';
// import WebAudioRecorderMp3  from './js/WebAudioRecorderMp3.min';
// import app from './js/app';


const Rec = () => {
  const [showUl, setShowUl] = useState(false);

  console.log(showUl);
  return (
    <Layout children title="Rec" description="" className="container-fluid">
      <div id="controls">
        <button id="recordButton">Record</button>
        <button id="stopButton" disabled>
          Stop
        </button>
      </div>
      <button id="uploadButton"></button>

      {/* <script src="js/WebAudioRecorder.min.js"></script>
      <script src="js/app.js"></script> */}
    </Layout>
  );
};

export default Rec;
