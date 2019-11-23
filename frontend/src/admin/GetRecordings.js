import React from 'react';
import {API} from '../config';
import Layout from '../core/Layout';

class DownloadFile extends React.Component {
  constructor(props) {
    super(props);

    // axios.get(`${API}/users`).then(res => {
    //   const students = res.data;
    //   this.setState({students});
    // });

    this.downloadEmployeeData = () => {
      this.fetch(`${API}/audio/playAudio/`).then(response => {
        response.blob().then(blob => {
          let url = this.window.URL.createObjectURL(blob);
          let a = this.document.createElement('a');
          a.href = url;
          a.download = 'Set1.wav';
          a.click();
        });
        //window.location.href = response.url;
      });
    };
  }

  render() {
    return (
      <Layout className="container-fluid">
        <div id="container">
          <button onClick={this.downloadEmployeeData}>Download</button>
          <a href="#" onClick={this.downloadEmployeeData}>
            Download
          </a>
        </div>
      </Layout>
    );
  }
}

export default DownloadFile;
