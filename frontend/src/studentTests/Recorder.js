import React, {Component } from 'react';
import RecorderJS from 'recorder-js';
import axios from 'axios';
import { isAuthenticated } from "../auth";
import {getAudioStream, exportBuffer} from './audio';
import moment from 'moment';
import slugify from 'slugify';
import server from '../helper/currentServer.js';

class Recorder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stream: null,
      recording: false,
      recorder: null,
    };
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);  
  }

  async componentDidUpdate() {    
  }

  async componentWillReceiveProps({ trackNo }) {
    const {recording} = this.state;

    if ( !recording && trackNo === 1) {
      console.log('STARTED RECORDING....');
      this.startRecord();
    } 
    if (recording && trackNo === 11) {
      console.log('...STOPPED!');
      this.stopRecord();  
    } 
  }

  async componentWillUnmount() {
  }

  async componentDidMount() {
    let stream;

    try {
      stream = await getAudioStream();
    } catch (error) {
      // Users browser doesn't support audio.
      // Add your handler here.
      console.log(error);
    }

    this.setState({stream});
  }  

  startRecord() {
    
    const {stream} = this.state;
    const audioContext = new (window.AudioContext)();
    const recorder = new RecorderJS(audioContext);
    recorder.init(stream);

    this.setState(
      {
        recorder,
        recording: true,
      },
      () => {
        recorder.start();
      }
    );
  }

  createUserSlug = () => {
    const {
      user: { name}
    } = isAuthenticated();
    return slugify(name, {
      replacement: '-',    // replace spaces with replacement
      remove: null,        // regex to remove characters
      lower: true,         // result in lower case
    });
  }

  createDateTimeStamp = () => {
    return moment().format("YYYY_MM_ddd_hh-mm-ss-a");
  };


  async stopRecord() {
    const {recorder} = this.state;
    const {buffer} = await recorder.stop();
    const audio = exportBuffer(buffer[0]);

    const userSlug = this.createUserSlug();
    const dtStamp = this.createDateTimeStamp();

    let data = new FormData();
    data.append('soundBlob', audio);
   
    let config = {
      header : {
        'Content-Type' : 'multipart/form-data'
      }
    };

    const url = `${server()}/api/upload/${userSlug}/${dtStamp}`; 
    
    axios.post(url, data, config).then(response => {
      console.log('response', response);
    }).catch(error => {
      console.log('error', error);
    });
  }

  render() {
    const { stream} = this.state;

    if (!stream) {
      return null;
    }

    return (
      <div>
      </div>
    )
    }
}

export default Recorder;

