import React from 'react';
import PropTypes from 'prop-types';
import Clue from './Clue.js'

const Category = props => {
  return (
    <div className={'category'} data-testid={props.category.title}>
      <div className="categoryTitle">{props.category.title}</div>
      {props.category.clues.map(clue => <Clue key={clue.id} clueObject={clue} handleSelectClue={props.handleSelectClue} answeredQuestions={props.answeredQuestions}/>)}
    </div>
  );
};

Category.propTypes = {
  title: PropTypes.string,
  selectQuestion: PropTypes.func,
  currentQuestion: PropTypes.object,
  answeredQuestions: PropTypes.array
};

export default Category;
