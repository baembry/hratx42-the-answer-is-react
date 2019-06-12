import React from 'react';
import PropTypes from 'prop-types';

const Category = props => {
  return (
    <div className={'category'} data-testid="category">
      {/* display category */}
      {/* display clues for each category */}
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
