import React, {Component, useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link, Redirect} from 'react-router-dom';
import styles from './styles/style.css';
//import Mic from './Mic';
//import AudioRecorder from 'react-audio-recorder';

// import WebAudioRecorder from './js/WebAudioRecorder.min';
// import WebAudioRecorderMp3  from './js/WebAudioRecorderMp3.min';
// import app from 'app';


const RecordAudio = () => {
  
  const [showUl, setShowUl] = useState(false);

  // useEffect(() => {
  //   setShowUl(false);
  // },[])
  
  return (
    <Layout
    children
      title="Dashboard"
      description=""
      className="container-fluid"
    >
 
      
    </Layout>

  );
};

export default RecordAudio;
