import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Response extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userResponse: ''
    }
    this.recordResponse = this.recordResponse.bind(this);
  }
  recordResponse(newText) {
    this.setState({ userResponse: newText });
  }
  submitResponse(event) {
    // this function should fire when the user fills the response and hits 'enter'
    if(event.keyCode === 13){
      this.props.handleSubmit(this.state.userResponse);
      event.target.value = '';
    }
      // Is the user response correct? 
      // yes/no? What should happen?
  }
  render(){
    return (
      <div id={'response'} data-testid="response">
        <input
          type='text'
          placeholder='Answers go here!'
          // handle data change
          onChange={(event) => this.recordResponse(event.target.value)}
          // handle when 'enter' is hit
          onKeyDown={(event) => this.submitResponse(event)}
        >
        </input>
      </div>
    )
  }
}

Response.propTypes = {
  recordResponse: PropTypes.func,
  submitResponse: PropTypes.func,
}