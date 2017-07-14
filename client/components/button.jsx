import React from 'react'; // import react module

// create our Button component as a functional component
const Button = (props) => {
  return (
    <input
      type="button"
      className={
        `${props.className} i-btn ${props.type === 'action' ?
          'button action-button' :
          'button input-button'}`
      }
      onClick={props.handleClick}
      value={props.label}
    />
  );
}

// describe our expected props types
Button.propTypes = {
  type: React.PropTypes.string.isRequired,
  handleClick: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  className: React.PropTypes.string
}

// export our button component.
export default Button;
