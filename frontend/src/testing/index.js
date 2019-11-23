import React, {Component} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';

class Testing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: ['Set1','Set2','Set3','Set4','Set5','Set6','Set7','Set8'],
      count: 0
    };
    this.getPhotos = () => {
      fetch('https://picsum.photos/id/6/100')
        .then(response => response.blob())
        .then(blob => {
          // Create a new FileReader innstance
          const reader = new FileReader();

          // Add a listener to handle successful reading of the blob
          reader.addEventListener('load', () => {
            const image = new Image();

            // Set the src attribute of the image to be the resulting data URL
            // obtained after reading the content of the blob
            image.src = reader.result;

            document.body.appendChild(image);
          });

          // Start reading the content of the blob
          // The result should be a base64 data URL
          reader.readAsDataURL(blob);
        });
    };

    function downloadBlob(blob, filename) {
      // Create an object URL for the blob object
      const url = URL.createObjectURL(blob);

      // Create a new anchor element
      const a = document.createElement('a');

      // Set the href and download attributes for the anchor element
      // You can optionally set other attributes like `title`, etc
      // Especially, if the anchor element will be attached to the DOM
      a.href = url;
      a.download = filename || 'download';

      // Click handler that releases the object URL after the element has been clicked
      // This is required for one-off downloads of the blob content
      // const clickHandler = () => {
      //   // setTimeout(() => {
      //   //   URL.revokeObjectURL(url);
      //   //   this.removeEventListener('click', clickHandler);
      //   // }, 150);
      // };

      // Add the click event listener on the anchor element
      // Comment out this line if you don't want a one-off download of the blob content
      

      // Programmatically trigger a click on the anchor element
      // Useful if you want the download to happen automatically
      // Without attaching the anchor element to the DOM
      // Comment out this line if you don't want an automatic download of the blob content

      // a.click();

      // Return the anchor element
      // Useful if you want a reference to the element
      // in order to attach it to the DOM or use it in some other way
      return a;
    }

    this.incrementFileCount = () => {
      this.setState({ count: this.state.count + 1});
    };


    this.getFile = (file, idx) => {
      fetch(`http://localhost:8000/api/audio/playAudio/${file}.wav`)
        .then(res => res.blob())
        .then(blob => {     
          const downloadLink = downloadBlob(blob);

          // Set the title and classnames of the link
          downloadLink.title = file;
          downloadLink.classList.add(`btn-link${idx}`, `download-link${idx}`);

          // Set the text content of the download link
          downloadLink.textContent = file;

          
          const fLinks = document.querySelector(`.download-link${idx}`);
          
          
          console.log(fLinks);
          // Attach the link to the DOM
          fLinks.appendChild(downloadLink);

        
        });
    };

  }

  
  render() {
    return (
      <Layout title="Dashboard" description={``} className="container-fluid">
        {/* <div className="card row">{this.getPhotos()}</div> */}
        <FileLinks></FileLinks>
      </Layout>
    );
  }
}

class FileLinks extends Testing{
  render() {
    const list = this.state.files.map((file, idx) => {
      return <li key={file}>{this.getFile(file, idx + 1)}</li>
    });

    return (
      <div>
        <div className="fLinks"></div>
        {/* <div className="card">{this.getFile('Set1')}</div> */}
        <ul>
          <a className="download-link0"></a>
          <br/>
          <a className="download-link1"></a>
          <br/>
          <a className="download-link2"></a>
          <br/>
          <a className="download-link3"></a>
          <br/>
          <a className="download-link4"></a>
          <br/>
          <a className="download-link5"></a>
          <br/>
          <a className="download-link6"></a>
          <br/>
          <a className="download-link7"></a>
          <br/>
          <a className="download-link8"></a>
        {list}
        </ul>
        
      </div>
    );
  }
}

export default Testing;
