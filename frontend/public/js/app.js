//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var recorder; 						//WebAudioRecorder object
var input; 							//MediaStreamAudioSourceNode  we'll be recording
var encodingType; 					//holds selected encoding for resulting audio (file)
var encodeAfterRecord = true;       // when to encode

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext; //new audio context to help us record

//var encodingTypeSelect = document.getElementById("encodingTypeSelect");
var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var uploadButton = document.getElementById("uploadButton");
uploadButton.style.visibility = "hidden";

//add events to those 2 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);


function startRecording() {
	console.log("startRecording() called");

    var constraints = { audio: true, video:false }

	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		
		audioContext = new AudioContext();
		gumStream = stream;

		input = audioContext.createMediaStreamSource(stream);

		recorder = new WebAudioRecorder(input, {
		  workerDir: "js/", // must end with slash
		  encoding: "mp3",
		  numChannels:2, //2 is the default, mp3 encoding supports only 2
		  onEncoderLoading: function(recorder, encoding) {  
		  },
		  onEncoderLoaded: function(recorder, encoding) {
		  }
		});

		recorder.onComplete = function(recorder, blob) { 
			createUploadLink(blob);
		}

		recorder.setOptions({
		  timeLimit:120,
		  encodeAfterRecord:encodeAfterRecord,
	      //ogg: {quality: 0.5},
	      mp3: {bitRate: 160}
	    });

		//start the recording process
		recorder.startRecording();

		 //__log("Recording started");

	}).catch(function(err) {
	  	//enable the record button if getUSerMedia() fails
    	recordButton.disabled = false;
    	stopButton.disabled = true;

	});

	//disable the record button
    recordButton.disabled = true;
    stopButton.disabled = false;
}

function stopRecording() {
	//console.log("stopRecording() called");
	
	//stop microphone access
	gumStream.getAudioTracks()[0].stop();

	//disable the stop button
	stopButton.disabled = true;
	recordButton.disabled = false;
	
	//tell the recorder to finish the recording (stop recording + encode the recorded audio)
	recorder.finishRecording();

	//__log('Recording stopped');

}


function createUploadLink(blob) {
	
	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = document.createElement('a');

	//name of .wav file to use during upload and download (without extendion)
	var filename = new Date().toISOString();

	//upload link
	//var upload = document.createElement('a');
  uploadButton.href="#";
  uploadButton.innerHTML = "UPLOAD";
  
	uploadButton.addEventListener("click", function(event){
    console.log('clicked');
		  var xhr=new XMLHttpRequest();
		  xhr.onload=function(e) {
		      if(this.readyState === 4) {
		          console.log("Server returned: ",e.target.responseText);
		      }
		  };
		  var fd=new FormData();
		  fd.append("soundBlob",blob, filename + '.mp3');
		  xhr.open("POST","http://localhost:8000/api/upload",true);
		  xhr.send(fd);
	});

  uploadButton.style.visibility = "visible";

}


function __log(e, data) {
	log.innerHTML += "\n" + e + " " + (data || '');
}
