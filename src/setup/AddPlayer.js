import React from 'react';

class AddPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adding: false,
      players: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.props.onSubmit(players);
  }

  handleClick() {
    this.setState({adding: true});
  }

  handleSubmit(event) {
    this.setState({
      adding: false,
      players: [...this.state.players,
      event.target.elements.name.value],
    });
    event.preventDefault();
  }

  render() {
    let display = [
      <button id='addPlayer'
        onClick={this.handleClick}>
        Add Player
      </button>,
      <div>{this.state.players.length} players:</div>,
      <div>{this.state.players}</div>,
    ];

    if (this.state.adding) {
      display.push(
        <form onSubmit={this.handleSubmit}>
          <input name='name' placeholder='Player name' />
          <input type='submit' className='submit-button' value='Add' />
        </form>
      );
    }
    /*<div>
        {this.state.addingPlayer ?
          <AddPlayer onSubmit={this.playerSubmit} /> : null}*/
    display.push(
      <button onClick={() => this.props.onSubmit(this.state.players)}>
        Choose Roles
      </button>
    );

    return display;
  }
}

export default AddPlayer;
