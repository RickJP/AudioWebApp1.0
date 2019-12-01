import React, { Component } from 'react';
// import ms from 'pretty-ms';

import Layout from '../core/Layout';


class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {
      time: 0,
      start: 0,
      isOn: false
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      isOn: true
    });
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }
  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({time: 0})
  }
  render() {
    let start = (this.state.time == 0) ?
      <button onClick={this.startTimer}>START</button> :
      null
    let stop = (this.state.isOn) ?
      <button onClick={this.stopTimer}>STOP</button> :
      null
    let reset = (this.state.time != 0 && !this.state.isOn) ?
      <button onClick={this.resetTimer}>RESET</button> :
      null
    let resume = (this.state.time != 0 && !this.state.isOn) ?
      <button onClick={this.startTimer}>RESUME</button> :
      null
    return(
      <Layout
      title="Speaking Test 2"
      description=""
      className="container-fluid noselect"
    > 
       <div className="container w-20"></div>
      <div className="container m-5 vw-20">
      <div className="card" style={{width: 200}}>
        <h3>timer: {this.state.time}</h3>
        {start}
        {resume}
        {stop}
        {reset}
      </div>
      </div>
    </Layout>
     
    )
  }
}
export default Timer;