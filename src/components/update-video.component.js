import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class UpdateVideo extends React.Component {

	 constructor(props) {
			super(props);
		this.state = {
		  open: false,
		  video: [],
		  details: [],
		  name:'',
		  nameUpdate:'',
		  user:'',
		  url:'',
		  id:0,
		  value: '',
		  descritpionUpdate:'',
		};
		this.onChange = this.onChange.bind(this)
	 }
   
   
	  onChange (event) {
		this.setState({
		  value: event.target.value
		})
	  }
    handleOpen = (el) => {
		this.setState({name:el[0].name});
		this.setState({description:el[0].details.description});
		this.setState({open: true});
    };
  
    handleClose = () => {
      this.setState({open: false});
    };

    handleSubmit = () => {
		let url = "http://localhost:8080/api/videos?page=0";      
		fetch(url)
		.then((response) => response.json())
		.then((responseJson) => {
		
		  for (var i=0; i < responseJson.data.length; i++) {
			   console.log("l'id est ",responseJson.data[i].name)
			 if(responseJson.data[i].name === this.state.name){
				 console.log("l'id est ",responseJson.data[i]._id);
				 this.setState({id:responseJson.data[i]._id});
				 this.setState({url:responseJson.data[i].url});
				 this.setState({user:responseJson.data[i].user});
			 }
		  }  
		    if(this.state.nameUpdate === ''){
				 this.setState({nameUpdate:this.state.name});
			}
			if(this.state.descritpionUpdate === ''){
				 this.setState({descritpionUpdate:this.state.description});
			}
			
			fetch('http://localhost:8080/api/videos/'+this.state.id, {
			method: 'PUT',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  name: this.state.nameUpdate,
			  details: {description:this.state.descritpionUpdate},
			  user:this.state.user,
			  url: this.state.url,
				
			})
		  })
		  console.log("je suis dans le if ", this.state.name);
		})
		.catch((error) => {
		  console.error(error);
		}); 
		this.setState({open: false});
		window.location.reload();
    }  

    render() {
      const actions = [ 
       
        <FlatButton
          label="Annuler"
          primary={true}
          onClick={this.handleClose}
        />,
        <FlatButton
        label="Ok"
        primary={true}
        onClick={this.handleSubmit}
      />,
      ];
  
      return (
        <div>         
          <Dialog
            title="Modifier la vidéo"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}        
          >
		  <label data-reactid=".1.0.0">Nom </label>
		  <TextField id="name"
			  defaultValue={this.state.name}
			  onChange={e => this.setState({ nameUpdate: e.target.value })}
			  hintText="Nom"/>
		  <div>
		  <label data-reactid=".1.0.0">Description </label>
		  <TextField id="description"
			  defaultValue={this.state.description}
			  onChange={e => this.setState({ descritpionUpdate: e.target.value })}
			  hintText="Description"/>
		  </div>                  
          </Dialog>
        </div>
      );
    }
  }
