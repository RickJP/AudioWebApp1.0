import React from 'react';
import {API} from '../config';
import Layout from '../core/Layout';
import axios from 'axios';

class GetRecordings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotRecordings: false,
      numOfHooksToMake: 0,
      showGetAllFiles: false
    };

    this.getAllFiles = () => {
      const recEl = document.querySelector('.recordings').children;
      for (let i = 0; i < recEl.length; i++) {
       recEl[i].children[0] && recEl[i].children[0].click();
      }
    };

    this.makeHooks = () => {
      const recordingsEl = document.querySelector('.recordings');
      for (let i = 0; i< this.state.numOfHooksToMake; i++) {
        const newLi = document.createElement('li');
        newLi.classList.add(`sList${i}`);
        recordingsEl.appendChild(newLi);
        // console.log(recordingsEl);
      }
    };

    this.getAudioList = () => {
      const getAudioListUrl = `${API}/audio/audiolist`;
      const getAudioFilesUrl = `${API}/audio/audiofiles/`;
      const recordingsDir = 'data/recordings/';
      const fName = [];



      axios.get(getAudioListUrl).then(res => {
        this.setState({gotRecordings: true});
        //console.log('GetFileList:  '+ res.data);

        this.setState({numOfHooksToMake: Math.floor(res.data.length)});
        this.makeHooks();
        let idx = 0;
        res.data.forEach(s => {
          if (s.split(recordingsDir)[1].includes('mp3')) {
            fName.push(s.split(recordingsDir)[1].split('/'));
          }
        });
        res.data
          .filter(r => r.includes('mp3'))
          .sort((a, b) => b - a)
          .map(r =>
            this.getFile(
              // Full url for the audio download link
              getAudioFilesUrl + r.split(recordingsDir)[1],
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
          // downloadLink.title = fileUrl;
          downloadLink.classList.add(`d-link${idx}`);

          // Set the text content of the download link
          downloadLink.textContent = linkName;
          downloadLink.download = linkName;

          // let hookEl = document.createElement('div');
          // hookEl.classList.add(`hook${idx}`);
          // document.body.appendChild(hookEl);

          console.log('IDX: ' + idx);
          let hook = document.querySelector(`.sList${idx}`);
          // Attach the link to the DOM
          hook.appendChild(downloadLink);

          // const newEl = document.createElement('li');
          // newEl.classList.add(`.sList${idx + 1}`);
          // let prevHook = document.querySelector(`.sList${idx}`);
          // newEl.appendChild(prevHook);
        });
        this.setState({showGetAllFiles: true});
    };
  }

  getAllFilesNow() {
    console.log('GET ALL FILES NOW');
    axios.get(`${API}/audio/audiofilenames`)
    .then(res => {
      console.log(res);
    })

  }

  // getSizeofallfiles() {
  //   axios.get(`${API}/audio/sizeofallfiles`)
  //   .then(res => {
  //     console.log(res);
  //   })
  // }

  render() {
    return (
      <Layout className="container-fluid recordings-area">
        <div className="row">
        
          <div className="col">
            <button
              className="btn get-list-btn"
              onClick={!this.state.gotRecordings ? this.getAudioList : null}
            >
              Get List
            </button>
            {/* {getAllFilesNow()} */}
            <div className="card mb-0 mt-4 recordings-card">
              <h3 className="card-header">Recordings</h3> 
              <ul className="list-group">
                <FileLinks></FileLinks>
              </ul>
              {this.state.showGetAllFiles ? <button
              onClick={this.getAllFiles}>Get All Files</button> 
            : null}
              
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
        <ul className="recordings">
        </ul>
      </div>
    );
  }
}

export default GetRecordings;

