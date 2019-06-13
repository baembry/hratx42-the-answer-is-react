import React from 'react';
import PropTypes from 'prop-types';
import Categories from './Categories'
import Clue from './Clue';

const Gameboard = ({categories, currentQuestion, handleSelectClue, showClue, answeredQuestions, showAnswer}) => {
  return (
    <div data-testid="gameboard" id={showClue || showAnswer ? 'question' : 'gameboard'}>

      {showClue || showAnswer ? <Clue clueObject={currentQuestion} showAnswer={showAnswer} showClue={showClue}/> : <Categories categories={categories} handleSelectClue={handleSelectClue} answeredQuestions={answeredQuestions}/>}
 
    </div>
  );
};

Gameboard.propTypes = {
  currentQuestion: PropTypes.object,
  selectQuestion: PropTypes.func,
  categories: PropTypes.array,
  answeredQuestions: PropTypes.array
};

export default Gameboard;
