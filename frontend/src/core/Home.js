import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {Link} from 'react-router-dom';
import axios from 'axios';
import server from '../helper/currentServer.js';

import './styles/styles.css';

const Home = () => {
  const [showDetails] = useState(1);
  const [gotMaterials, setGotMaterials] = useState(false);
  const [audioFiles, setAudioFiles] = useState([]);
  const [tasks, setTasks] = useState([]);

  // eslint-disable-next-line no-undef
  localStorage.removeItem('uName');

  useEffect(() => {
    const url = `${server()}allTestMaterials`;
    axios
      .get(url)
      .then(res => {
        return res.data;
      })
      .then(materials => {
        setGotMaterials(true);
        for (let key in materials) {
          const audioFiles = materials[key].fileNames;
          const tasks = materials[key].tasks;

          setAudioFiles(prev => [...prev, audioFiles]);
          setTasks(prev2 => [...prev2, tasks]);
        }
      })
      .catch(err => {
        return err;
      });
  }, []);


  return (
    <Layout
      title="Home"
      description="From Temple University"
      className="container-fluid"
      showDetails={showDetails}
      jumboHeight={150}
      stopAtTrackNo={3}
    >
      <div className="container-test">
        <div className="tasks-wrapper wrapper">
          <div className="tasks-card card p-0 ">
            <Link
              to={{
                pathname: '/user/test',
                state: {taskNo: 1, audioFiles, tasks},
              }}
              style={
                !gotMaterials
                  ? {pointerEvents: 'none'} && {backgroundColor: 'gray'}
                  : null
              }
              className="task-btn"
            >
              TASK ONE
            </Link>
          </div>

          <div className="tasks-card card p-0 pt-4">
            <Link
              to={{pathname: '/user/test', 
              state: {taskNo: 2, audioFiles, tasks},
            }}
              style={
                !gotMaterials
                  ? {pointerEvents: 'none'} && {backgroundColor: 'gray'}
                  : null
              }
              className="task-btn"
            >
              TASK TWO
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;