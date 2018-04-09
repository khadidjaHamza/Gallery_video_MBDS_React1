import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class VideoDialog extends React.Component {

    //Declare global variable
    state = {
      open: false,
      video: [],
      details: {description:''}
    };

    handleOpen = (el) => {

        this.setState({video:[]});
	    this.setState({details:{description:''}});
        this.setState({video:el});
	    this.setState({description :el.details.description});
        
      this.setState({open: true});
    };

    handleClose = () => {
      this.setState({open: false});
    };

    render() {
      const actions = [
        <FlatButton
          label="OK"
          primary={true}
          onClick={this.handleClose}
        />,
      ]; 
      return (
        <div>       
          <Dialog
            title={this.state.video.name}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >    
            {this.state.details.description}
				<iframe width="560" height="315" src={this.state.video.url} title="Main"
				frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
			</iframe>
          </Dialog>
        </div>
      );
    }
  }