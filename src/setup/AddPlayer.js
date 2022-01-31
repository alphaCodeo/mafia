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
  }

  handleClick() {
    this.setState({adding: true});
  }

  handleSubmit(event) {
    this.setState({
      adding: false,
      players: [...this.state.players,
      event.target.elements.playerName.value],
    });
    event.preventDefault();
  }

  render() {
    let players = [];
    for (let i = 0; i < this.state.players.length; i++) {
      players.push(
        <div className='list-group-item' key={'player' + i}>
          {this.state.players[i]}
        </div>
      );
    }

    return (
      <div className='text-center'>
        <button className='btn btn-primary btn-lg'
          onClick={this.handleClick}>
          Add Player
        </button>

        <div>
          {this.state.players.length} players:
        </div>
        <div className='list-group list-group-horizontal justify-content-center'>
          {players}
        </div>

        {this.state.adding ?
          <form onSubmit={this.handleSubmit}>
            <input name='playerName' className='form-control' type='text'
              placeholder='Player name' />

            <button className='btn btn-primary' type='submit'>
              Add
            </button>
          </form> : null}

        <button className='btn btn-primary btn-lg'
          onClick={() => this.props.onSubmit(this.state.players)}
          disabled={!this.state.players.length}>
          Choose Roles
        </button>
      </div>
    );
  }
}

export default AddPlayer;
