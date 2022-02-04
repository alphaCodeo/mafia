import React from 'react';

class AddPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adding: false,
      players: [],
      validName: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.validateName = this.validateName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    this.setState({
      adding: true,
      validName: false,
    });
  }

  validateName(event) {
    const value = event.target.value;

    if (value.length > 0 && !this.state.players.includes(value)) {
      this.setState({validName: true});
      return;
    }

    this.setState({validName: false});
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
      <div className='container text-center'>
        <button className='btn btn-primary btn-lg my-1'
          onClick={this.handleClick}>
          Add Player
        </button>

        <div className='my-1'>
          {this.state.players.length} players:

          <div className='list-group list-group-horizontal justify-content-center'>
            {players}
          </div>
        </div>

        {this.state.adding ?
          <form onSubmit={this.handleSubmit}>
            <input id='playerName' className='form-control' type='text'
              placeholder='Player name'
              onChange={this.validateName} />

            <button className='btn btn-primary my-1' type='submit'
              disabled={!this.state.validName}>
              Add
            </button>
          </form> : null}

        <button className='btn btn-primary btn-lg my-1'
          onClick={() => this.props.onSubmit(this.state.players)}
          disabled={!this.state.players.length}>
          Choose Roles
        </button>
      </div>
    );
  }
}

export default AddPlayer;
