import React from 'react';
import {API} from '../config';
import Layout from '../core/Layout';
import axios from 'axios';

class GetRecordings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotRecordings: false,
    };

    this.getAudioList = () => {
      const getAudioListUrl = `${API}/audio/getaudiolist`;
      const getAudioFilesUrl = `${API}/audio/getaudiofiles/`;
      const fName = [];

      axios.get(getAudioListUrl).then(res => {
        this.setState({gotRecordings: true});
        //console.log('GetFileList:  '+ res.data);

        let idx = 0;
        res.data.forEach(s => {
          if (s.split('data/uploads/')[1].includes('mp3')) {
            fName.push(s.split('data/uploads/')[1].split('/'));
          }
        });
        res.data
          .filter(r => r.includes('mp3'))
          .sort((a, b) => b - a)
          .map(r =>
            this.getFile(
              // Full url for the audio download link
              getAudioFilesUrl + r.split('data/uploads/')[1],
              // Join the student name & file name for the link text
              fName[idx][0],
              //  + '___' + fName[idx][1],
              // Increment the index for the tag hook
              idx++
            )
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

          // Set the title and classnames of the link
          downloadLink.title = fileUrl;
          downloadLink.classList.add(`d-link${idx}`);

          // Set the text content of the download link
          downloadLink.textContent = linkName;

          // let hookEl = document.createElement('div');
          // hookEl.classList.add(`hook${idx}`);
          // document.body.appendChild(hookEl);

          let hook = document.querySelector(`.sList${idx}`);
          // Attach the link to the DOM
          hook.appendChild(downloadLink);

          // const newEl = document.createElement('li');
          // newEl.classList.add(`.sList${idx + 1}`);
          // let prevHook = document.querySelector(`.sList${idx}`);
          // newEl.appendChild(prevHook);
        });
    };
  }

  render() {
    return (
      <Layout className="container-fluid">
        <div className="row">
          <div className="col-5">
            <button className="btn get-list-btn"
              onClick={!this.state.gotRecordings ? this.getAudioList : null}
            >
              Get List
            </button>
            <div className="card mb-0 mt-3">
              <h3 className="card-header">Recordings</h3>
              <ul className="list-group">
                <FileLinks></FileLinks>
              </ul>
            </div>
          </div>
        </div>
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
            <ul className="list-group ml-4">  
              <li className="sList0"></li>
              <li className="sList1"></li>
              <li className="sList2"></li>
              <li className="sList3"></li>
              <li className="sList4"></li>
              <li className="sList5"></li>
              <li className="sList6"></li>
              <li className="sList7"></li>
              <li className="sList8"></li>
              <li className="sList9"></li>
              <li className="sList10"></li>
              <li className="sList11"></li>
              <li className="sList12"></li>
              <li className="sList13"></li>
            </ul>
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
