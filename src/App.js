import React from 'react';
import moveRover from './moveRover';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roverInput: "",
      roverOutput: ""
    }
  }
  handleSearchChange(event) {
    this.setState({roverInput: event.target.value});
  }
  handleRoverMovement() {
    try {
      this.setState({roverOutput: moveRover(this.state.roverInput)})
      console.log(this.state.roverOutput);
    } catch(err) {
      console.log(err);
      this.setState({roverOutput: err.message})
    }
    
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <label className="instructionsLabel">Rover Instructions</label>
          <textarea className="instructionInputArea" onChange={(event) => this.handleSearchChange(event)}/>
          <input className="submit" type="submit" onClick={() => this.handleRoverMovement()} />
          <h3>Rover Position</h3>
          <div className="outputField">
            {this.state.roverOutput}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
