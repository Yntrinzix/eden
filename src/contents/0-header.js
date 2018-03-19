import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

class Header extends Component {
  constructor(){     
      super(); 
      this.state = {
      userInput: ''    
      }
  }

static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}


searching = async (e) => {
  e.preventDefault();
  console.log('SEARCHING', this.state.userInput)
  if(this.state.userInput!=''){
      console.log('PASOK DITO SA SERARCHING')
    // const res = await axios.get(`${this.props.api}/search/${query}`)
    // console.log(res)
    this.props.history.replace({
      pathname:`/search`,
        state:{
          search: this.state.userInput,
          searching: true,
        }
      }
    );
  }else{
    this.reDirecting('/song-list')
  }

};
  handleChange = (e) =>{ 
    this.setState({userInput: e.target.value});
  }
reDirecting = link => this.props.history.push({ 
  pathname:link,
        state:{searching: false}
 });

  render(){
    var divStyle = {pointerEvents: 'none', display: 'block', width: '100%', height: '100%'}
    
    return(
        <header className="App-header">
          <div className='headerContent'>
            <div className='icon'><img  src={require('../assets/eden.png')} /></div>
            <div className='search'>
              <form onClick={this.searching}>
                <input onChange= {this.handleChange} type='text' placeholder='search'/>
                <button >
                  <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon" style={divStyle}><g className="style-scope yt-icon">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" className="style-scope yt-icon"></path>
                  </g></svg>
                </button>
              </form>
            </div>
          </div>
          <div className='headerLinks'>
            <div onClick={()=>{this.reDirecting('/song-list')}}>Song Lists </div>
            <div onClick={()=>{this.reDirecting('/short-list')}}>Shortlists</div>
          </div>
        </header>
    )
  }
    
}


export default withRouter(Header);