import React, { Component } from 'react';
import './App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardActions, CardHeader, CardTitle,CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

/**************/
import Video from'./components/video.component';
import AddVideo from'./components/add-video.component';
import UpdateVideo from'./components/update-video.component';
	
class App extends Component {


	constructor(props) {
		super(props);
		this.loadData;
		this.state = {
		  videos : [],
		  open: false,
		  page : 0,
		  selected: 1,
		  input: "",
		  hobbyWasDeleted: false,
		  video: [],
		  details: {description:''},
		  name:'',
		  user:'MBDS yasmine onload',
		  url:'',
		  description:'',
		};
		this.deleteVideo = this.deleteVideo.bind(this);
		this.loadData = this.loadData.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.prevPage = this.prevPage.bind(this);
	}
	//init BD onLoad de l'application
	componentDidMount() {
		var i = 0;
	let url = "http://localhost:8080/api/videos?page=0";     
		fetch(url)
		.then((response) => response.json())
		.then((responseJson) => {
			if(responseJson.data.length === 0){
				for( i = 0; i < 5 ; i++){
					var playlistId = "lddC2134TIw",
				APIKey = "AIzaSyCdbvB1DZza-hKkoQRLk5SXcpJJBywix1k",
				baseURL = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=",
				urlAccess = "https://www.youtube.com/embed/";
				
				fetch(baseURL + playlistId + "&key=" + APIKey)
				.then(resp => resp.json())
				.then((resp) => {
				 this.setState({description: resp.items[0].snippet.localized.description});
				 this.setState({name: resp.items[0].snippet.localized.title});
				 this.setState({video: resp.items});
				 this.setState({url:urlAccess + playlistId});
				
				/// set dans la base de donnée
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
						  url: this.state.url,
						})
					  })
					});
				}
				
				}
		})
		.catch((error) => {
		  console.error(error);
		});
	
	}
	componentDidUpdate(prevProps, prevState) {
  // only update chart if the data has changed
  console.log("componentDidUpdate",this.state);
  if (prevProps.data !== this.props.data) {
	  
window.location.reload();
  }
}
	//affichage les videos 
	loadData(i) {
		let url = "http://localhost:8080/api/videos?page="+i;     
		fetch(url)
		.then((response) => response.json())
		.then((responseJson) => {
		  let data = [];
		  for (var i=0; i < responseJson.data.length; i++) {
			 data.push(responseJson.data[i]);
		  }
		  this.setState({
			  video: data,
			  videos:data,
			  input : ""
		  });
		})
		.catch((error) => {
		  console.error(error);
		});      
	}
	  prevPage() {
		  this.state.page--;
		if(this.state.page <= 0){
			document.querySelector("#btnPrev").style = "click:none;";
			document.querySelector("#btnPrev").style.color='#000'
			document.querySelector("#btnPrev").disabled = true; 			
			document.querySelector("#btnNext").disabled = false;
			this.page=0;
			this.loadData(0);
		}else {
			this.loadData(this.state.page);
		}
	  }

	  nextPage() {
		  this.state.page++;
		//this.setState({page:this.state.page + 1});
		if(this.state.page > 0 && this.state.page < 2){
			document.querySelector("#btnNext").style = "";
			document.querySelector("#btnPrev").style.color='#fff'
			document.querySelector("#btnPrev").disabled = false;
			this.loadData(this.state.page);
		}
		if(this.state.page >= 1){
			document.querySelector("#btnNext").style = "click:none;";
			document.querySelector("#btnNext").style.color='#000'
			document.querySelector("#btnNext").disabled = true; 
		}	      
	  }
	  
	deleteVideo = (el) => {
		for( var i = 0 ; i < this.state.video.length ; i++ ){
			if(this.state.video[i].name === el){
				fetch('http://localhost:8080/api/videos/'+this.state.video[i]._id, {
					method: 'delete'
				   });
				this.loadData(0);
			}
		}
    };
	videoForm = (el) => {
    this._video.handleOpen(el);
    };
	
	addVideo = (el) => {
		this._addVideo.handleOpen(el);
	};
	updateVideo = (el) => {
      this._updateVideo.handleOpen(el);
	  console.log("lje");
	  this.loadData(0);
    };
	
  render() {
	
    return (
	
		<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)} >
			<div>
				<div className="App">
		   <AppBar
			  title="Galerie MBDS"
			  iconClassNameRight="muidocs-icon-navigation-expand-more"
			/> 
		 
			<div className="content" >     
			<div style={styles.cardList}>
			 <RaisedButton style={styles.buttonAct} label="Ajouter une vidéo" onClick={this.addVideo}  />
			  <RaisedButton style={styles.marginLeft} label="Afficher les videos" onClick={this.loadData}  />
			</div>
			 
			<div style={styles.cardList} >
			{this.state.videos.map((el, index) => (
				<div key={index} >
					<Card style={styles.card} onLoad={this.loadData}
						  key={index} >
						<CardHeader
						  title={el.name}
						  subtitle=""
						  avatar="images/logo_mbds.jpg"            
						>
						</CardHeader> 
						  <img onClick={(e) => this.videoForm(el, e)} src="images/youtub.jpg" alt=""  />
						 <CardTitle title={el.name} subtitle="" />
						<CardText>
						  {el.details.description}
						</CardText>
						<CardActions>
						  <FlatButton
							label="Modifier"
							primary={true}
							onClick={(el) => this.updateVideo(this.state.video, el)}
						  />,
						  <FlatButton label="Supprimer" 
									  primary={true}
									  onClick={(e) => this.deleteVideo(el.name, e)}/>
						</CardActions>
					</Card>
				</div>	 
			))}
			
			  </div>
			</div>
		  </div>
		
		  <div style={styles.buttonPagination} >
			 <button id="btnPrev"  className="btn btn-default btn-primary" onClick={this.prevPage}>Previous </button>
			 <button id="btnNext" className="btn btn-default btn-primary " onClick={this.nextPage}>Next </button>   
		  </div>
		  <Video ref={(video) => { this._video = video; }}></Video>
		  <AddVideo ref={(addVideo) => { this._addVideo = addVideo }}></AddVideo>
		  <UpdateVideo ref={(updateVideo) => { this._updateVideo = updateVideo; }}></UpdateVideo>
		</div>
	</MuiThemeProvider>
    );
  }
}

/**
 * App style css
 */
const styles = {
  cardList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card : {
    width: 430,
    height: 650,
	marginLeft:'0px',
	marginTop: '5px',
  },
  cardTitle: {
	 fontSize: 90
  },
  hide : {
    display: 'none',
  },
  buttonAct:{
    width: '200px',
    display:'block',
    marginTop:'5px',
	marginLeft:'10px'
  },
  buttonPagination: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
	 marginTop:'50px',
  },
  marginLeft:{
    marginLeft:'800px',
	width: '200px',
    display:'block',
    marginTop:'5px',
  }
};

export default App;
