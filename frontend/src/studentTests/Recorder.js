/* eslint-disable no-console */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MicRecorder from 'mic-recorder-to-mp3';
import {sendAudio} from './sendAudio';

const Mp3Recorder = new MicRecorder({
  bitRate: 160,
  encoder: 'mp3', // default is mp3, can be wav as well
  sampleRate: 44100, // default is 44100, it can also be set to 16000 and 8000.
});

class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    };

    // console.log('CLASS NO ' + props.classNo );
    // console.log('Student NO ' + props.studentNo );
    // console.log('User ID ' + props.userId );
    

    this.start = () => {
      if (this.state.isBlocked) {
        console.log('Permission Denied');
      } else {
        Mp3Recorder.start()
          .then(() => {

            console.log('STARTED RECORDING....');
          })
          .catch(e => console.error(e));
      }
    };
    
    this.stopAndSendAudio = () => {
      Mp3Recorder.stop()
        .getMp3()
        // buffer, audio    buffer unused
        .then(([buffer, audio]) => {
          // console.log('BUFFER => ' + buffer + 'AUDIO => ' + audio);
          console.log('...STOPPED! Recording ');
          
          const user_Id = props.userId;
          console.log('UserId from StopAndSave  '+props.userId);
      
          let data = new FormData();
          data.append('soundBlob', audio);
          
          sendAudio(user_Id,props.classNo, props.studentNo, data);
    
        })
        .catch(e => console.log(e));
    };

    this.stop= () => {
      Mp3Recorder.stop()
        .getMp3()
        // buffer, audio    buffer unused
        .then(() => {
          this.setState({isRecording: false});
          console.log('Stopped audio without saving');
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

  componentWillUnmount() {
    // if (this.state.isRecording) {
    //   this.stop();
    // }
    
    // let {isRecording} = this.state;
    // console.log('willUnmount');
    // console.log(this.props);
    // console.log('recording > '+isRecording);
    // if (isRecording) {
    //   console.log('Still recording');
    //   this.stop();
    //   console.log('recording > '+isRecording);
    // } 
  }

  // UNSAFE_componentWillReceiveProps({trackNo, audioFiles}) {
  //   let {isRecording} = this.state;

  //   if (!isRecording && trackNo === 1) {
  //     this.setState({isRecording: true});
  //     this.start();
  //   }
  //   if (isRecording && trackNo === audioFiles.length) {
  //     this.setState({isRecording: false});
  //     this.stopAndSendAudio();
  //   }
  // }

  componentDidUpdate({trackNo, audioFiles}) {
    let {isRecording} = this.state;

    if (!isRecording && trackNo === 1) {
      this.setState({isRecording: true});
      this.start();
    }
    if (isRecording && trackNo === audioFiles.length) {
      this.setState({isRecording: false});
      this.stopAndSendAudio();
    }
  }

  render() {
    return (<div></div>);
  }
}

Recorder.propTypes = {
  isRecording: PropTypes.bool,
  blobURL: PropTypes.string,
  isBlocked: PropTypes.bool,
  recording: PropTypes.bool,
  trackNo: PropTypes.number,
  audioFiles: PropTypes.array,
}

export default Recorder;
