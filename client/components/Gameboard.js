import React from 'react';
import PropTypes from 'prop-types';
import Categories from './Categories'
import Clue from './Clue';

const Gameboard = ({categories, currentQuestion, handleSelectClue, showClue, answeredQuestions}) => {
  return (
    <div data-testid="gameboard" id={showClue ? 'question' : 'gameboard'}>

      {showClue ? <Clue clueObject={currentQuestion} showClue={showClue}/> : <Categories categories={categories} handleSelectClue={handleSelectClue} answeredQuestions={answeredQuestions}/>}
 
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
