import React from 'react';
import PropTypes from 'prop-types';

const Clue = props => {
  // show $ value of clue OR
  // the Clue question itself OR
  // empty screen if it was already answered
  
  var getClue = () => {
    if (props.answeredQuestions.includes(props.clueObject.id)){
      return (<div className='clueValue'></div>)
    } else {
      return (<div className='clueValue' onClick={() => props.handleSelectClue(props.clueObject)}>
      ${props.clueObject.value}
    </div>)
    }
  }

  
  if (props.showClue) {
  
     return (<div onClick={() => props.handleSelectClue(props.clueObject)}>
     {props.clueObject.question}
   </div>);
  } else {
    return getClue();
  }
};

Clue.propTypes = {
  selected: PropTypes.bool,
  selectQuestion: PropTypes.func,
  answered: PropTypes.bool,
  clueObject: PropTypes.object
};

export default Clue;
