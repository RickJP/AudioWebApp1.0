import React from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import {createUserSlug, createDateTimeStamp} from './prepareAudio';
import server from '../helper/currentServer.js';
import axios from 'axios';

const Mp3Recorder = new MicRecorder({bitRate: 128});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
      stream: null,
      recording: false,
      recorder: null,
    };

    this.userId = props.userId;

    this.start = () => {
      if (this.state.isBlocked) {
        console.log('Permission Denied');
      } else {
        Mp3Recorder.start()
          .then(() => {
            this.setState({isRecording: true});
          })
          .catch(e => console.error(e));
      }
    };
    

    this.stop = () => {
      Mp3Recorder.stop()
        .getMp3()
        .then(([buffer, audio]) => {
          //const blobURL = URL.createObjectURL(audio);
          this.setState({isRecording: false});
          //console.log(blobURL);

          const userSlug = createUserSlug();
          const dtStamp = createDateTimeStamp();

          let data = new FormData();
          data.append('soundBlob', audio);

          let config = {
            header: {
              'Content-Type': 'multipart/form-data',
            },
          };
          const user_Id = this.userId;

          const url = `${server()}/api/audio/upload/${user_Id}/${userSlug}/${dtStamp}`;

          console.log(audio);
          console.log(url);
          axios
            .post(url, data, config)
            .then(response => {
              console.log('response', response);
            })
            .catch(error => {
              console.log('error', error);
            });
        })
        .catch(e => console.log(e));
    };
  }

  componentDidMount() {




    navigator.mediaDevices.getUserMedia(
      {audio: true},
      () => {
        console.log('Permission Granted');
        this.setState({isBlocked: false});
      },
      () => {
        console.log('Permission Denied');
        this.setState({isBlocked: true});
      }
    );
  }

  async componentWillReceiveProps({trackNo, audioFiles}) {
    let {recording} = this.state;

    if (!recording && trackNo === 1) {
      this.setState({recording: true});
      console.log('STARTED RECORDING....');
      this.start();
    }
    if (recording && trackNo === audioFiles.length) {
      console.log('...STOPPED! Recording ');
      this.setState({recording: false});
      this.stop();
    }
  }

  render() {
    return (<div className="App"></div>);
  }
}

export default App;
