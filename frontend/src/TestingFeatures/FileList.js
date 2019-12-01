import React, { Component } from 'react';
import DragAndDrop from './DragAndDrop';

import Layout from '../core/Layout';

class FileList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      files: [
        'nice.pdf',
        'verycool.jpg',
        'amazing.png'
      ]
    };

    this.handleDrop = (files) => {
      let fileList = this.state.files;
      for (var i = 0; i < files.length; i++) {
        if (!files[i].name) return;
        fileList.push(files[i].name);
      }
      this.setState({files: fileList});
    };
  }

  render() {
    return (
      <Layout
      title="Speaking Test 2"
      description=""
      className="container-fluid noselect"
    > 
       <div className="container w-20"></div>
      <DragAndDrop handleDrop={this.handleDrop}>
        <div style={{ height: 300, width: 250 }}>
          {this.state.files.map((f, i) => 
            <div key={i}>{f}</div>  
          )}
        </div>
      </DragAndDrop>
    </Layout>
     
    )
  }
}

export default FileList;