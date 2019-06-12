import React, { Component } from 'react';
import { categories } from '../../testdata';
import Gameboard from './Gameboard.js';
import Scoreboard from './Scoreboard.js';
import Response from './Response.js';
// import http from '../lib/httpService.js';
const axios = require('axios');


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      currentQuestion: {},
      answeredQuestions: [],//array of id's
      score: 0,
      showClue: false
    };
    this.handleSelectClue=this.handleSelectClue.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
    componentDidMount() {
    axios.get('http://jservice.io/api/categories?count=5' )
    .then(
      (response) => {
        response.data.forEach(category =>{
          axios.get('http://jservice.io/api/category?id=' + category.id).then(
            (response)=>{
              let category = response.data
              let categories = [...this.state.categories]
              categories.push(category);
              this.setState({categories})
            }
          )
        });
      })
  }
  
  handleSelectClue(clueObject){
    this.setState({currentQuestion: clueObject, showClue: true})
  }
  handleSubmit(answer){
    console.log(this.state.currentQuestion.answer + "   " + answer)
    let score = this.state.score;
    var answeredQuestions = [...this.state.answeredQuestions];
    answeredQuestions.push(this.state.currentQuestion.id);
    if(answer.toLowerCase() === this.state.currentQuestion.answer.toLowerCase()){
      score += this.state.currentQuestion.value;
      this.setState({score, showClue: false, answeredQuestions})
      
    } else {
      score -= this.state.currentQuestion.value;
      this.setState({score, showClue: false, answeredQuestions})
    }

  }
  render() {
    return (
      <div id={'app'}>
        <Gameboard currentQuestion={this.state.currentQuestion} 
          categories={this.state.categories} 
          handleSelectClue={this.handleSelectClue} 
          showClue={this.state.showClue}
          answeredQuestions={this.state.answeredQuestions}/>
        <Scoreboard score={this.state.score}/>
        {this.state.showClue && <Response handleSubmit={this.handleSubmit}/>}
      </div>
    );
  }
}
