import React, { Component } from 'react';
import SongLister from './1-songLister'
import axios from 'axios';
import data from './api.json';

class ShortListRenderer extends Component {

    constructor(){     
        super(); 
        this.state = {
        userApi: data.api,
        songs: []     
      }
      this.getSongs();
    }

    getSongs = async () => {

        let songs = await axios.get(`${this.state.userApi}/shortList`);
        this.setState({
            songs: songs.data.songs
        })
        
        
    }

    toggleShortList=(index, res) => {
        let songCopy =[...this.state.songs];
        songCopy[index] = res.data;
        let newArray = songCopy.filter( el => el.checked === 1);
        this.setState({
            songs: newArray
        })
    }

    
  render() {

    return (
        <div className='wrapper'>
          <SongLister 
              title={'Short List'}
              link={'shortList'}
              songs={this.state.songs}
              toggle={this.toggleShortList}
          />
        </div>
    );
  }
}


export default ShortListRenderer;