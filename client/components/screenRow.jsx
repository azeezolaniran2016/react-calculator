import React from 'react';

// Screen row component is written as a functional component
// it receives and displays (in an input field) a props (property) of value from
// it's parent component
const ScreenRow = (props) => {
  return (
    <div className="row">
      <input className={`${props.className} col-xs-12`} type="text" readOnly value={props.value}/>
    </div>
  )
}

// we describe the props (property) that the parent element is required to pass
// into this component
ScreenRow.propTypes = {
  value: React.PropTypes.string.isRequired,
  className: React.PropTypes.string
}

export default ScreenRow;
