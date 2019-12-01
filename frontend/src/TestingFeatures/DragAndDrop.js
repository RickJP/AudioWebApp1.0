import React, { Component} from 'react';

class DragAndDrop extends Component {


  constructor(props) {
    super(props);
    this.dropRef = React.createRef();

     this.state = {
    dragging: false
  };

  this.handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  this.handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true });
    }
  };
  
  this.handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if(this.dragCounter > 0) return;
    this.setState({ dragging: false });
  };
  
  this.handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({dragging: false});
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files); 
        e.dataTransfer.clearData();
        this.dragCounter = 0;
      }
    }
  }
  
  componentDidMount() {
    this.dragCounter = 0;
    let div = this.dropRef.current;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);
  }

  componentWillUnmount() {
    let div = this.dropRef.current;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);
  }

  render() {
    return (
      <div style={{ display: 'inline-block', position: 'relative'}}
      ref={this.dropRef}
      >
        {this.state.dragging &&
          <div style={{
            border: 'dashed grey 4px',
            backgroundColor: 'rgba(255,255,255,.8)',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999
          }}
          >
            <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
            fontSize: 36
          }}
          >
            <div>Drop here!</div>
         </div>   
         </div>   
        }
        {this.props.children}
      </div>
    )
  }
}

export default DragAndDrop;

