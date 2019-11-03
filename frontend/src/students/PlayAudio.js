import React, {Component, useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link, Redirect} from 'react-router-dom';
import styles from './styles/style.css';

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  return [playing, toggle];
};

const PlayAudio = ({url}) => {
  const url2 = 'https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3';
  const [playing, toggle] = useAudio(url2);

  return (
    <Layout
      children
      title="Dashboard"
      description=""
      className="container-fluid"
    >
       
      <button onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
    </Layout>
  );
};

export default PlayAudio;
