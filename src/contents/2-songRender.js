import React, { Component } from 'react';
import SongLister from './1-songLister'
import axios from 'axios';
import data from './api.json';

class SongRender extends Component {

    constructor(){     
        super(); 
        this.state = {
        userApi: data.api,
        songs: [],
        searching: false     
      }
  
    }

    componentWillMount() {
      console.log('troolala')
      //console.log(this.props.location.state)
      console.log(this.props.location)
      if(this.props.location.state===undefined){
        console.log('phols')
        this.getSongs();
        
      } else {
        const {search } = this.props.location.state;
        if(this.props.location.state.searching){this.searchResult(search);}
        else{this.getSongs();}
      }
      
      
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.location.state) {
        const { searching, search } = nextProps.location.state;
        searching ? this.searchResult(search) : this.getSongs();
      }
      
    }

    
    searchResult = async(datus) => {
        let songs = await axios.get(`${this.state.userApi}/search/${datus}`);
        this.setState({
            songs: songs.data,
        })
       
    }

    getSongs = async () => {
      console.log('natatawag')
        let songs = await axios.get(`${this.state.userApi}/songs`);
        this.setState({
            songs: songs.data.songs
        })
        console.log(this.state.songs)
       
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
          <div className='wrapper'>
          <SongLister 
              title={'Song Lists'}
              link={'songs'}
              songs={this.state.songs}
              toggle={this.toggleShortList}
          />
          </div>
    );
  }
}


export default SongRender;
