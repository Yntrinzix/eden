import React, { Component } from 'react';
import './css/styles.css';
import axios from 'axios';

class App extends Component {

constructor(){
    super();
    this.state = {
      userApi: 'http://localhost:3001/api',
      songs: []
      
    }
  }

getSongs = async () => {
  let songs = await axios.get(`${this.state.userApi}/songs`);
  this.setState({
    songs: songs.data.songs
  })
}

  render() {
    this.getSongs()
    var divStyle = {pointerEvents: 'none', display: 'block', width: '100%', height: '100%'}
    return (
      <div className="App">
        <header className="App-header">
          <div className='headerContent'>
            <div className='icon'><img  src={require('./assets/eden.jpg')} /></div>
            <div className='search'>
              <form className='formSearch'>
                <input type='text' placeholder='search'/>
                <button>
                  <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon" style={divStyle}><g className="style-scope yt-icon">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" className="style-scope yt-icon"></path>
                  </g></svg>

                </button>
              </form>
            </div>
          </div>
        </header>

        <div className='content'>
          {this.state.songs.map((song)=>{
         return (
          <div className='song' key={song._id} id={song._id}>

            <div  className='title' >
              {song.title}
            </div>
            <div className='artist'>
              {song.artist}
            </div>


          </div>
         );
       })}
        </div>
      </div>
    );
  }
}

export default App;
