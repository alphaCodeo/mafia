import React from 'react';

import Roles from '../Roles';

class AssignRoles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO: shuffle roles/assign to each player
      roles: this.props.roles,
      index: 0,
    };

    this.nextPlayer = this.nextPlayer.bind(this);
  }

  nextPlayer() {
    if (this.state.index === this.props.players.length - 1) {
      this.props.onSubmit(this.state.roles);
    }

    this.setState({index: this.state.index + 1});
  }

  render() {
    const i = this.state.index;

    return (
      <div className='container'>
        <div>
          {this.props.players[i]}:
        </div>
        <div>
          You are the {this.state.roles[i]}.
        </div>
        <div>
          {Roles[this.state.roles[i]].description}
        </div>

        <button className='btn btn-primary btn-lg' onClick={this.nextPlayer}>
          Next Player
        </button>
      </div>
    );
  }
}

export default AssignRoles;
