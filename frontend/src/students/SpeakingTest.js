import React, {Component, useState, useEffect} from 'react';
import Layout from '../core/Layout';
import './styles/style.css';

import Recorder from './TheRecorder';

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
  const url = 'http://english4all.live/api/playAudio';
  const [playing, toggle] = useAudio(url);

  return (
    <Layout
      children
      title="Listening Test"
      description=""
      className="container-fluid"
    >
       
      <button id="play" onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
      <br/>
      <Recorder />

    </Layout>
  );
};

export default SpeakingTest;
