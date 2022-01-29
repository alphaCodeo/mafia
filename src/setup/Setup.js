import React from 'react';
import AddPlayer from './AddPlayer';
import ChooseRoles from './ChooseRoles';

class Setup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: 0,
      addingPlayer: false,
      players: [],
    };

    this.submitPlayers = this.submitPlayers.bind(this);
    this.submitRoles = this.submitRoles.bind(this);
  }

  submitPlayers(players) {
    this.setState({
      players: players,
      stage: 1,
    });
  }

  submitRoles(roles) {
    this.props.onStart(this.state.players, roles);
  }

  render() {
    switch (this.state.stage) {
      case 0:
        return <AddPlayer onSubmit={this.submitPlayers} />;
        break;
      case 1:
        return <ChooseRoles onSubmit={this.submitRoles}
          players={this.state.players} />;
        break;
    }
  }
}

export default Setup;
