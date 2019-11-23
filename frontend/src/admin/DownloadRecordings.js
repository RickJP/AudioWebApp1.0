import React from 'react';

class DownloadFile extends React.Component {
	
	constructor(props) {
    super(props);
    
    this.downloadEmployeeData = () => {
      this.fetch('http://localhost:8080/employees/download')
        .then(response => {
          response.blob().then(blob => {
            let url = this.window.URL.createObjectURL(blob);
            let a = this.document.createElement('a');
            a.href = url;
            a.download = 'employees.json';
            a.click();
          });
          //window.location.href = response.url;
      });
    };
	}
	
	
	
	render() {
		return (
			<div id="container">
				<h1>Download File using React App</h1>
				<h3>Download Employee Data using Button</h3>
				<button onClick={this.downloadEmployeeData}>Download</button>
				<p/>
				<h3>Download Employee Data using Link</h3>
				<a href="#" onClick={this.downloadEmployeeData}>Download</a>
			</div>
		)
	}

}

export default DownloadFile;