import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import PDF from './svg/pdf'
import Plus from './svg/add'
import Remove from './svg/remove'
import data from './api.json';

class SongLister extends Component {
    constructor(){     
        super(); 
        this.state = {
        userApi: data.api,
        songs: [],
        stat: 'Loading',
        songClass: 'song'    
        }
    }


    componentWillReceiveProps(nextProps) {
 
        this.setState({
            songs: nextProps.songs
        })
        if (this.state.songs.length ===0){
            this.setState({
                stat: 'Nothing Listed'
            })
        }
    }


    shortlisted = (arg) => {
        if(arg ===0){
            return (
                <div className='svgIcons'><Plus /></div>
            )
        }else{
            return (
                <div className='svgIcons'><Remove /></div>
            )
        }
    }

    shortListSong = async (id, checked) => {
        let value;
        let index = this.state.songs.findIndex(x => x._id===id);
        checked===1? value=0: value=1;
        
        let res = await axios.put(`${this.state.userApi}/song-shortlist/${id}/${value}`);
        this.props.toggle(index, res);
        
    }

    toggleShortList=(index, res) => {
        let songCopy =[...this.state.songs];
        songCopy[index] = res.data;
        this.setState({
            songs: songCopy
        })
    }

    showVideo = (id) => {
        const el = document.querySelector(`#v${id}`);
        if (el.className === 'videoWrapper-active'){ 
            el.classList.add('videoWrapper-inactive');
            el.classList.remove('videoWrapper-active');
        }else{
            el.classList.remove('videoWrapper-inactive');
            el.classList.add('videoWrapper-active');
        }
        
    }

    isRenderingQ = (contents) => 
    {
        if(contents.length === 0){
            if(this.state.stat=='Loading'){
                return(
                    <div className="loader">
                        <svg>
                            <defs>
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2" result="gooey" />
                                <feComposite in="SourceGraphic" in2="gooey" operator="atop"/>
                            </filter>
                            </defs>
                        </svg>
                    </div>
                )
            }
            
        }else{
            return(
                <div>
                    {contents.map((song)=>{
                        
                    return (
                            
                            <div 
                                className={this.state.songClass}
                                key={song._id} 
                                id={`a${song._id}`} 
                                >
                                <div className='songTop' >
                                    <div className='songLeft' onClick={()=>this.showVideo(song._id)}>       
                                        <div  className='title' >
                                        {song.title} 
                                        </div>
                                        <div className='artist'>
                                        {song.artist}
                                        </div>
                                    </div>
                                    <div className='shortLister' >
                                        <div className='songIcons'>
                                            <div onClick={()=>window.open(song.pdf)} className='svgIcons'><PDF /></div>
                                            
                                            <div onClick={()=>{this.shortListSong(song._id, song.checked)}}>
                                                {this.shortlisted(song.checked)}
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div id={`v${song._id}`} className='videoWrapper-inactive'>
                                    
                                        <iframe src={`https://www.youtube.com/embed/${song.embed}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                                    
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
    
        <div className='content'>
            <div className='innerContent'>
                <div className='songLists'>
                    <h3>{this.props.title}</h3>
                    <div>{this.isRenderingQ(this.state.songs)}</div>
                </div>
            </div>
        </div> 
        )
    };

}

export default SongLister;