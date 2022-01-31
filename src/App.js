import React from 'react';

import Setup from './setup/Setup';
import Game from './game/Game';

import Roles from './Roles';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: 0,
      players: [],
      roles: [],
    };

    this.startGame = this.startGame.bind(this);
  }

  startGame(players, roles) {
    this.setState({
      stage: 1,
      players: players,
      roles: roles,
    });
  }

  render() {
    return <Game players={['1', '2']} roles={['Villager', 'Mafioso']} />;
    //return <Game players={[...Array(Object.keys(Roles).length).keys()]} roles={Object.keys(Roles)} />;
    switch (this.state.stage) {
      case 0:
        return (
          <Setup onStart={this.startGame} />
        );
      case 1:
        return (
          <Game players={this.state.players} roles={this.state.roles} />
        );
      default:
        break;
    }
  }
}

export default App;
