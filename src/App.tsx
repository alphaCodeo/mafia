import React from 'react';

import Setup from './setup/Setup';
import Game from './game/Game';

import Player from './Player';

type Props = {};

type State = {
  stage: number;
  players: Player[];
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      stage: 0,
      players: [],
    };

    this.startGame = this.startGame.bind(this);
  }

  startGame(players: Player[]): void {
    this.setState({
      stage: 1,
      players: players,
    });
  }

  render() {
    /*return <Game players={[{
      name: 'vil',
      role: 'Villager',
      alive: true,
    } as Player, {
      name: 'maf',
      role: 'Mafioso',
      alive: true,
    } as Player, {
      name: 'sher',
      role: 'Sheriff',
      alive: true,
    }]} />;*/
    switch (this.state.stage) {
      case 0:
      return (
        <Setup onStart={this.startGame} />
        );

      case 1:
      return (
        <Game players={this.state.players} />
        );

      default: break;
    }
  }
}

export default App;
