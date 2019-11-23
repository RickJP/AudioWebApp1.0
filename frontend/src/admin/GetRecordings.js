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
