import React from 'react';

import AddPlayer from './AddPlayer';
import ChooseRoles from './ChooseRoles';

import Player from '../Player';

type Props = {
  onStart: (players: Player[]) => void;
};

type State = {
  stage: number;
  players: string[];
};

class Setup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      stage: 0,
      players: [],
    };

    this.submitPlayers = this.submitPlayers.bind(this);
    this.submitRoles = this.submitRoles.bind(this);
  }

  submitPlayers(players: string[]): void {
    this.setState({
      players: players,
      stage: 1,
    });
  }

  submitRoles(roles: string[]): void {
    // TODO: shuffle roles/assign to each player
    let players: Player[] = [];

    for (let i = 0; i < roles.length; i++) {
      players.push({
        name: this.state.players[i],
        role: roles[i],
        alive: true,
      } as Player);
    }

    this.props.onStart(players);
  }

  render() {
    switch (this.state.stage) {
      case 0:
      return (
        <AddPlayer onSubmit={this.submitPlayers} />
        );
      case 1:
      return (
        <ChooseRoles onSubmit={this.submitRoles}
          players={this.state.players} />
        );
      default:
      break;
    }
  }
}

export default Setup;
