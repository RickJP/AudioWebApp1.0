import React from 'react';
import {API} from '../config';
import Layout from '../core/Layout';
import axios from 'axios';

class GetRecordings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotRecordings: false
    };
    
    this.getAudioList = () => {
      const getAudioListUrl = `${API}/audio/getaudiolist`;
      const getAudioFilesUrl = `${API}/audio/getaudiofiles/`;
      const fName = [];

      axios.get(getAudioListUrl).then(res => {
        this.setState({ gotRecordings: true });
        //console.log('GetFileList:  '+ res.data);

        let idx = 0;
        res.data.forEach (s => {
          if (s.split('data/uploads/')[1].includes('mp3')) {
            fName.push(s.split('data/uploads/')[1].split('/'));
          }
        });
        res.data
          .filter(r => r.includes('mp3'))
          .sort((a, b) => b - a)
          .map(r => 
             (this.getFile(
               // Full url for the audio download link
               getAudioFilesUrl + r.split('data/uploads/')[1],
               // Join the student name & file name for the link text
               fName[idx][0] + '___' + fName[idx][1],
               // Increment the index for the tag hook
               idx++))     
           );
      });    
    };


    this.downloadBlob = (blob, filename) => {
      // Create an object URL for the blob object
      const url = URL.createObjectURL(blob);
      // Create a new anchor element
      const a = document.createElement('a');
      // Set the href and download attributes for the anchor element
      // You can optionally set other attributes like `title`, etc
      // Especially, if the anchor element will be attached to the DOM
      a.href = url;
      a.download = filename || 'download';

      return a;
    };

    this.getFile = (fileUrl, linkName, idx) => {
      // console.log('GetFile Before Fetch  '+ fileUrl + linkName + idx);
      fetch(fileUrl)
        .then(res => res.blob())
        .then(blob => {
          const downloadLink = this.downloadBlob(blob);
          // console.log('GetFileBlob:  '+ blob);

          // Set the title and classnames of the link
          downloadLink.title = fileUrl;
          downloadLink.classList.add(`btn-link${idx}`, `d-link${idx}`);

          // Set the text content of the download link
          downloadLink.textContent = linkName;

          const fLinks = document.querySelector(`.d-link${idx}`);
          // Attach the link to the DOM
          fLinks.appendChild(downloadLink);
        });
    };
  }

  render() {
    return (
      <Layout className="container-fluid">
        <button onClick={!this.state.gotRecordings ? this.getAudioList : null}>Get List</button>
        <FileLinks></FileLinks>
      </Layout>
    );
  }
}

class FileLinks extends GetRecordings {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>  
        <ul>
          <br/>
          <h2>RECORDINGS</h2>
          <a className="d-link0"></a>
          <br />
          <a className="d-link1"></a>
          <br />
          <a className="d-link2"></a>
          <br />
          <a className="d-link3"></a>
          <br />
          <a className="d-link4"></a>
          <br />
          <a className="d-link5"></a>
          <br />
          <a className="d-link6"></a>
          <br />
          <a className="d-link7"></a>
          <br />
          <a className="d-link8"></a>
          <br />
          <a className="d-link9"></a>
          <br />
          <a className="d-link10"></a>
          <br />
          <a className="d-link11"></a>
          <br />
        </ul>
      </div>
    );
  }
}

export default GetRecordings;


// this.getFile = (fileUrl, idx) => {
//   axios.get(fileUrl, {responseType: 'arraybuffer'})
//     .then(res => res.blob())
//     .then(blob => {
//       const downloadLink = this.downloadBlob(blob);

//       // Set the title and classnames of the link
//       downloadLink.title = fileUrl;
//       downloadLink.classList.add(`btn-link${idx}`, `d-link${idx}`);

//       // Set the text content of the download link
//       downloadLink.textContent = fileUrl;

//       const fLinks = document.querySelector(`.d-link${idx}`);

//       console.log(fLinks);
//       // Attach the link to the DOM
//       fLinks.appendChild(downloadLink);
//     });
// };