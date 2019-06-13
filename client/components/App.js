import React, { Component } from 'react';
// import { categories } from '../../testdata';
import Gameboard from './Gameboard.js';
import Scoreboard from './Scoreboard.js';
import Response from './Response.js';

const axios = require('axios');


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      currentQuestion: {},
      answeredQuestions: [],//array of id's
      scores: [],
      buzzers: [],
      activePlayer: null,
      showClue: false,
      showAnswer: false,
      timer: null,
      showClueInterval: 4000,
      showAnswerInterval: 2000,
      ineligiblePlayers: []
    };
    this.handleSelectClue=this.handleSelectClue.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
    componentDidMount() {
      window.addEventListener('keypress', (event) => {console.log(event); this.buzzer(event)})
      this.getNumberOfPlayers();
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

  getNumberOfPlayers(){
    const numberOfPlayers = 4;
    //To Do: uncomment
      // const numberOfPlayers = window.prompt("How many players?")
    let scores = [...this.state.scores];
    scores.length = numberOfPlayers;
    scores = scores.fill(0);
    this.setState({scores}, this.assignBuzzerKeys)  
  }

  assignBuzzerKeys(){
    // alert("buzzers are: Player 1: q, player 2: space, player 3: quotation mark, player 4: =")
    let buzzers = [113, 32, 39, 61];
    // let buzzers = [...this.state.buzzers]
    // this.state.scores.forEach((score, index)=>{
    //   let buzzer = window.prompt(`Player ${index} pick a buzzer character.`);
    //   buzzers.push(buzzer);
    // })
    this.setState({buzzers});
  }

  buzzer(event){
    //do nothing if a player is already active              
    if(this.state.activePlayer !== null) {
      return;
    }
    let timer = this.state.timer;
    clearTimeout(timer);
    this.startClueTimer(4000);
    let player = null;
    if(event.keyCode === 113){// q key
      player = 0

    }
    if(event.keyCode === 32){// space bar
      player = 1
    }
    if(event.keyCode === 39){// " key
      player = 2
    }
    if(event.keyCode === 61){//+ key
      player = 3
    }
    if(!this.state.ineligiblePlayers.includes(player)){
      this.setState({activePlayer: player})}
    
  }

  handleSelectClue(clueObject){
    this.startClueTimer(this.state.showClueInterval);
    this.setState({currentQuestion: clueObject, showClue: true, ineligiblePlayers: []})
  }

  startClueTimer(interval){
    let timer = this.state.timer;
    clearTimeout(timer);
    timer = setTimeout( 
      () => {
        if(this.state.activePlayer !== null){
          console.log("Too late! You lose")
          this.answerIs(false);
        } else {
          console.log("No one got it right")
          this.setState({showAnswer: true, showClue: false, activePlayer: null}, this.startAnswerTimer())
        }
      }, 
      interval)
    this.setState({timer}); 
  }

  startAnswerTimer(){
    let timer = this.state.timer;
    clearTimeout(timer);
    timer = setTimeout( 
      () => this.setState({showAnswer: false, showClue: false}), 
      this.state.showAnswerInterval)
    this.setState({timer}); 
  }

  answerIs(correct){
    let scores = [...this.state.scores];
    let activePlayer = this.state.activePlayer;
    var answeredQuestions = [...this.state.answeredQuestions];
    answeredQuestions.push(this.state.currentQuestion.id);
    let ineligiblePlayers = [...this.state.ineligiblePlayers];

    if(correct){
      scores[activePlayer] += this.state.currentQuestion.value;
      this.setState({scores, showClue: false, answeredQuestions, activePlayer: null, ineligiblePlayers: []})
    } else {
      scores[activePlayer] -= this.state.currentQuestion.value;
      let showClue = true;
      ineligiblePlayers.push(activePlayer);
      if(ineligiblePlayers.length === this.state.scores.length){
        showClue = false;
        ineligiblePlayers = [];
      }
      this.setState({scores, showClue, answeredQuestions, activePlayer: null, ineligiblePlayers}, this.startClueTimer(4000)); 
    }
  }


  handleSubmit(answer){
    console.log(this.state.currentQuestion.answer + "   " + answer)
    const timer = this.state.timer;
    clearTimeout(timer);
    if(answer.toLowerCase() === this.state.currentQuestion.answer.toLowerCase()){
      this.answerIs(true)
    } else {
      this.answerIs(false)
    }
  }
  // renderContent(){
    
  //   if(this.state.scores.length === 0){
  //     return <Intro />
  //   } else {
  //     return (
  //       <>
  //       <Gameboard currentQuestion={this.state.currentQuestion} 
  //         categories={this.state.categories} 
  //         handleSelectClue={this.handleSelectClue} 
  //         showClue={this.state.showClue}
  //         answeredQuestions={this.state.answeredQuestions}/>
  //       <Scoreboard score={this.state.score}/>
  //       </>
  //     )
  //   }
  // }
  render() {
    return (
      <div id={'app'}>
        {this.state.buzzers.length === 0 ? <div>Loading...</div> : (
        <>
          <Gameboard currentQuestion={this.state.currentQuestion} 
            categories={this.state.categories} 
            handleSelectClue={this.handleSelectClue} 
            showClue={this.state.showClue}
            showAnswer={this.state.showAnswer}
            answeredQuestions={this.state.answeredQuestions}/>
          <Scoreboard scores={this.state.scores}/>
        </>
        )}
        {this.state.activePlayer !== null && <Response handleSubmit={this.handleSubmit} activePlayer={this.state.activePlayer}/>}
      </div>
    );
  }
}
