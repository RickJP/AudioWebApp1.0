import React, {Component} from 'react';
import RecorderJS from 'recorder-js';
import axios from 'axios';

import {getAudioStream, exportBuffer} from './audio';

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

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
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

  async stopRecord() {
    const {recorder} = this.state;

    const {buffer} = await recorder.stop();
    const audio = exportBuffer(buffer[0]);

    // Process the audio here.
    console.log(audio);

    let data = new FormData();
    data.append('soundBlob', audio, 'test' + '.wav');
    // http.request('POST', 'http://localhost:8000/api/upload', true);
    // http.send(fd);
    const url = 'http://localhost:8000/api/upload';
    let config = {
      header : {
        'Content-Type' : 'multipart/form-data'
      }
    }

    axios.post(url, data, config).then(response => {
      console.log('response', response)
    }).catch(error => {
      console.log('error', error)
    })

    this.setState({
      recording: false,
    });
  }

  render() {
    const {recording, stream} = this.state;

    // Don't show record button if their browser doesn't support it.
    if (!stream) {
      return null;
    }

    return (
      <button
        onClick={() => {
          recording ? this.stopRecord() : this.startRecord();
        }}
      >
        {recording ? 'Stop' : 'Start'}
      </button>
    );
  }
}

export default Recorder;
