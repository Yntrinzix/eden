import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Link} from 'react-router-dom';

class SongLister extends Component {

    shortlisted = (arg) => {
        if(arg ==0){
            return (
                <div>+ <span>add to Shortlist</span></div>
            )
        }else{
            return (
                <div>- <span>remove to Shortlist</span></div>
            )
        }
    }
    shortListSong = async (id, checked) => {
        let value;
        let index = this.props.songs.findIndex(x => x._id==id);
        checked===1? value=0: value=1;
        console.log(`${this.props.userApi}/song-shortlist/${id}/${value}`);
        let res = await axios.put(`${this.props.userApi}/song-shortlist/${id}/${value}`);
        this.props.toggle(index, res);
        
        

    }

    isRenderingQ = (contents) => 
    {
        if(contents.length === 0){
            return(
                <div> Loading..... </div>
            )
        }else{
            return(
                <div>
                    {contents.map((song)=>{
                    
                    return (
                            
                            <div className='song' key={song._id} id={`a${song._id}`} >
                                <div className='songTop' >
                                    <div className='songLeft' onClick={()=>this.props.onClick(song._id)}>       
                                        <div  className='title' >
                                        {song.title} 
                                        </div>
                                        <div className='artist'>
                                        {song.artist}
                                        </div>
                                    </div>
                                    <div className='shortLister' onClick={()=>{this.shortListSong(song._id, song.checked)}}>
                                        {this.shortlisted(song.checked)}
                                    </div>
                                </div>
                                <div id={`v${song._id}`} className='videoWrapper-inactive'>
                                    
                                        <iframe src={song.embed} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                                    
                                </div>
                                
                            </div>
                                
                            
                        );
                    })}
                </div>
            )
             
        }
    }

    render() {
        var divStyle = {pointerEvents: 'none', display: 'block', width: '100%', height: '100%'}
        return( 
           <div>{this.isRenderingQ(this.props.songs)}</div>
        )
    };

}

export default SongLister;