import React, { Component } from 'react';
import './css/styles.css';
import axios from 'axios';
import {BrowserRouter, Route} from 'react-router-dom';
import SongRender from './contents/2-songRender';
import ShortListRenderer from './contents/3-shortListRenderer';
import Header from './contents/0-header';
import Add from './contents/formAdd';
import wave from './contents/animations/wave';
import data from './contents/api.json';

class App extends Component {

constructor(){
    super();
    
    this.state = {
      userApi: data.api,
      songs: [],
      path: '/'
      
    }
    this.getSongs()
  }

getSongs = async () => {
  let songs = await axios.get(`${this.state.userApi}/songs`);
  this.setState({
    songs: songs.data.songs
  })
  
}

pRender = () => {

}
//Content Links///



pathSongList = () => this.setState({path: SongRender})
pathShortList = () => this.setState({path: ShortListRenderer})

//////////////////

  render() {
    
    
    return (
      <div className='parent'>
        <div className='contentP'>
          <BrowserRouter>
            <div className="App">
                
                <Header api={this.state.userApi}/>
                
                <Route path='/' exact component={SongRender} />
                <Route path='/song-list' component={SongRender} />
                <Route path='/search' component={SongRender} />
                <Route path='/short-list' component={ShortListRenderer} />
                <Route path='/addNew' component={Add} />
                <canvas id="canvas"/>
            </div>
            
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
