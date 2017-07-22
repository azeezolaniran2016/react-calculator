import React from 'react'; // import react module
import Screen from './screen'; // Import our screen component from this directory
import Button from './button'; // Import our button component from this directory

// create a class which extends react component
class Frame extends React.Component {
  constructor() {
    super();
    // set our default state
    this.state = {
      question: '',
      answer: ''
    }
    // Bind our handleClick method (sets 'this' explicitly to refer to this componenent)
    // We did this because 'this' would refer to the source of the click events
    this.handleClick = this.handleClick.bind(this);
  }

  // Render function to creat component to be rendered on the DOM.
  // This method must return a single parent element as you can see here. 
  // The component is wrapped around () to make it a single expression.
  render() {
    return (
      <div className="row">
        <div className=" frame col-xs-8 col-xs-offset-2">
          <div className="calculator-title row">
            R_N Calculator
          </div>
          <Screen question={this.state.question} answer={this.state.answer}/>
          <div className="btn-row row">
            <Button className='col-xs-2 btn-primary' label={'1'} handleClick={this.handleClick} type='input' />
            <Button className='col-xs-2 btn-primary' label={'2'} handleClick={this.handleClick} type='input' />
            <Button className='col-xs-2 btn-primary' label={'3'} handleClick={this.handleClick} type='input' />
            <Button className='col-xs-2 btn-primary' label={'4'} handleClick={this.handleClick} type='input' />
            <Button className='col-xs-2 btn-info' label={'-'} handleClick={this.handleClick} type='action' />
            <Button className='col-xs-2 btn-info' label={'+'} handleClick={this.handleClick} type='action' />
          </div>
          <div className="btn-row row">
            <Button className='col-xs-2 btn-primary' label={'5'} handleClick={this.handleClick} type='input' />
            <Button className='col-xs-2 btn-primary' label={'6'} handleClick={this.handleClick} type='input' />
            <Button className='col-xs-2 btn-primary' label={'7'} handleClick={this.handleClick} type='input' />
            <Button className='col-xs-2 btn-primary' label={'8'} handleClick={this.handleClick} type='input' />
            <Button className='col-xs-2 btn-info' label={'*'} handleClick={this.handleClick} type='action' />
            <Button className='col-xs-2 btn-info' label={'/'} handleClick={this.handleClick} type='action' />
          </div>
          <div className="btn-row row">
            <Button className='col-xs-2 btn-primary' label={'9'} handleClick={this.handleClick} type='input' />
            <Button className='col-xs-2 btn-primary' label={'.'} handleClick={this.handleClick} type='input' />
            <Button className='col-xs-2 btn-primary' label={'0'} handleClick={this.handleClick} type='input' />
            <Button className='col-xs-3 btn-warning' label={'cls'} handleClick={this.handleClick} type='action' />
            <Button className='col-xs-3 btn-success'label={'='} handleClick={this.handleClick} type='action' />
          </div>
        </div>
      </div>
    );
  }

  // our method to handle all click events from our buttons
  handleClick(event){
    const value = event.target.value; // get the value from the target element (button)
    switch (value) {
      case '=': { // if it's an equal sign, use the eval module to evaluate the question
        // convert the answer (in number) to String
        const answer = eval(this.state.question).toString();
        // update answer in our state.
        this.setState({ answer });
        break;
      }
      case 'cls': {
        // if it's the Cls sign, just clean our question and answer in the state
        this.setState({ question: '', answer: '' });
        break;
      }
      case '*':
      case '+':
      case '-':
      case '/': {
        this.setState({ question: this.state.question += ` ${value} ` });
        break;
      }
      default: {
        // for every other commmand, update the answer in the state
        this.setState({ question: this.state.question += value})
        break;
      }
    }
  }
}

// export our frame component. To be used in our client/index.js file
export default Frame;
