import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class AddVideoDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      video: [],
      details: {description:''},
      name:'',
      user:'MBDS dans le add',
      url:'https://www.youtube.com/embed/',
	  idUrl:'',
      description:'',
    };
  }
  
    handleOpen = (el) => {
	  this.setState({video:el});
	  this.setState({details:el.details});
      this.setState({open: true});
    };
  
    handleClose = (e) => {
      this.setState({open: false});
    };

    handleSubmit  = (e) => {
		console.log("ajout");
		e.preventDefault();
		this.setState({
			name: e.target.value
		})
      fetch('http://localhost:8080/api/addvideo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
		
        body: JSON.stringify({
          name: this.state.name,
          details: {description:this.state.description},
          user:this.state.user,
          url: this.state.url + this.state.idUrl,
        })
      })
	  console.log("ajout");
	  this.setState({open: false});
    }  

    render() {
      const actions = [      
        <FlatButton
          label="Ajouter"
          primary={true}
          onClick={this.handleSubmit}
        />
      ];
  
      return (
        <div>         
          <Dialog
            title="Ajouter une vidéo"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}        
          >
           <div>
		    <label data-reactid=".1.0.0">Nom </label>
		  <TextField id="name"
			  defaultValue={this.state.name}
			  onChange={e => this.setState({ name: e.target.value })}
			  hintText="Nom"/>
		  <div>
		  <label data-reactid=".1.0.0">Description </label>
		  <TextField id="description"
			  defaultValue={this.state.description}
			  onChange={e => this.setState({ description: e.target.value })}
			  hintText="Description"/>
		  </div> 
		  <label data-reactid=".1.0.0">Url </label>
		  <TextField id="idUrl"
			  defaultValue={this.state.idUrl}
			  onChange={e => this.setState({ idUrl: e.target.value })}
			  hintText="id de l'url"/>
		  </div> 
          </Dialog>
		  
        </div>
      );
    }
  }