import React, { Component } from 'react';
import './css/styles.css';
import axios from 'axios';
import {BrowserRouter, Route, IndexRoute ,hashHistory,Link} from 'react-router-dom';
import Header from './contents/0-header';
import SongLister from './contents/1-songLister'

class App extends Component {

constructor(){
    super();
    
    this.state = {
      userApi: 'http://localhost:3001/api',
      songs: []
      
    }
    this.getSongs()
  }

getSongs = async () => {
  let songs = await axios.get(`${this.state.userApi}/songs`);
  this.setState({
    songs: songs.data.songs
  })
  
}

showVideo = (id) => {
  const el = document.querySelector(`#v${id}`);
  if (el.className == 'videoWrapper-active'){ 
    el.classList.add('videoWrapper-inactive');
    el.classList.remove('videoWrapper-active');
  }else{
    el.classList.remove('videoWrapper-inactive');
    el.classList.add('videoWrapper-active');
  }
  
}


toggleShortList=(index, res) => {
  let songCopy =[...this.state.songs];
  songCopy[index] = res.data;
  this.setState({
    songs: songCopy
  })
}


  render() {
    
    
    return (
        <div className="App">
          <Header/>

          <div className='content'>
          <div className='songLists'>
            <h3>Song Lists</h3>
            <SongLister 
              toggle={this.toggleShortList} 
              userApi={this.state.userApi} 
              songs={this.state.songs} 
              onClick={this.showVideo}
            />
          </div>
          
            
          </div>
        </div>
      
    );
  }
}

export default App;
