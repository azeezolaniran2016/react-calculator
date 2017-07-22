import React from 'react'; // Import react module
import ScreenRow from './screenRow';

// Create our screen component as a functional component.
// It would display two screen rows, 1 for questions and the other for the answer
// The value would be passed down from it's parent component as a prop
const Screen = (props) => {
  return (
    <div className="screen row">
      <ScreenRow className='input-screen' value={props.question}/>
      <ScreenRow className='output-screen' value={props.answer}/>
    </div>
  );
}

// Define our props expected from the parent component
Screen.propTypes = {
  question: React.PropTypes.string.isRequired,
  answer: React.PropTypes.string.isRequired
}

// export our component
export default Screen;
