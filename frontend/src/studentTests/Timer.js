import React, { Component } from 'react';
import ms from 'pretty-ms';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isOn: false,
      start: 0
    };

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  startTimer() {
    console.log("start");
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    });
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1000);
  }

  stopTimer() {
    console.log("stop");
    this.setState({ isOn: false });
    clearInterval(this.timer);
  }

  resetTimer() {
    this.state({time: 0, isOn: false});
  }

  render() {
    console.log("reset");
    let start = (this.state.time === 0) ?
    <button onClick={this.startTimer}>Start</button> : null
  
    let stop = (this.state.time === 0 || !this.state.isOn) ?
    null : 
    <button onClick={this.stopTimer}>Stop</button>

    let result = (this.state.time === 0 || this.state.isOn) ?
    null :
    <button onClick={this.resultTimer}></button>

  return (
    <div>
      <h3>Timer: {ms(this.state.time)}</h3>
      {start}
      {resume}
      {stop}
      {reset}
    </div>
  )
 }
}

module.exports = Timer
