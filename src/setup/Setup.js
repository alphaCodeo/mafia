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

    this.setPlayers = this.setPlayers.bind(this);
  }

  setPlayers(players) {
    this.setState({
      players: players,
      stage: 1,
    });
  }

  render() {
    switch (this.state.stage) {
      case 0:
        return <AddPlayer onSubmit={this.setPlayers} />;
        break;
      case 1:
        return <ChooseRoles />;
        break;
    }
  }
}

export default Setup;
