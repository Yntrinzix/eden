import React, { Component } from 'react';
import axios from 'axios';

class Add extends Component {
  constructor(){
      super();
      this.state = {
          data:{
            title: '',
            embed: '',
            pdf: '',
            artist: '',
            category: '',
          },
          message: '',
          messageClass: '',
          userApi: 'http://localhost:3001/api'
          
    }
  }
  createSong = async(e) =>{
    e.preventDefault();
    let res = await axios.post(`${this.state.userApi}/song`,this.state.data)
    
    if(res.data.message=='Success'){ this.setState({
        data:{
            title: '',
            embed: '',
            pdf: '',
            artist: '',
            category: '',
        },
        message:'Song Successfully Added',
        messageClass:'Data-success'
    })}else if(res.data.message=='Duplicate'){
        this.setState({
            message:'Same Song and Artist already exist',
            messageClass: 'Data-fail'
        })
    }
  }

  change = (e) => {
      const key = e.target.name,
            val = e.target.value;
            
       this.setState(prevState => ({
        data: {
        ...prevState.data,
        [key]: val
    }
}));
       
    }
    

   render(){
    
    
    return(
        <div className='wrapper'>
            
            <form id='add' className='content' onSubmit={this.createSong}>
                <h4>Create New Song</h4>
                <p>* Title</p>
                <input  name='title' onChange={this.change} placeholder='Song Title' required/>
                <p>* Youtube Link</p>
                <input  name='embed' onChange={this.change} placeholder='Youtube (eg https://www.youtube.com/watch?v=pfUssvjj4rs)' required/>
                <p>* PDF Link</p>
                <input  name='pdf' onChange={this.change} placeholder='PDF Chords Link' required/>
                <p>Artist</p>
                <input  name='artist' onChange={this.change} placeholder='Artist'/>
                <p>Category</p>
                <input  name='category' onChange={this.change} placeholder='Category (eg: New Songs)'/>
                <button type='submit'>Submit</button>
                <p className={this.state.messageClass}>{this.state.message}</p>
            </form>
        </div>
    )}
    
}

export default Add;


