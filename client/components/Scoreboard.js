import React from 'react';
import PropTypes from 'prop-types';

const Scoreboard = ({scores}) => {
  /*
    Scoreboard will live inside of App and the 'score' value of the answered question will need to be added to or subtracted
    from the score of the current quiz session.

    I don't think it needs to be an actual board. An <h1> tag with a big number will allow them to visibly practice state/prop
    passing.
  */
  return (
    <div className="scoreboard__container">
      {
        scores.map( (score, index) => (
        <div key={index} className={'scoreboard'} data-testid="scoreboard">
          Player {index}: ${score}
        </div>)
      )}
    </div>)
};

Scoreboard.propTypes = {
  score: PropTypes.number,
}

export default Scoreboard;
