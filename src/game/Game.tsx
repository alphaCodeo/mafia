import React from 'react';

import PlayerAction from './PlayerAction';
import RoleDescription from './RoleDescription';
import ConfirmReady from './ConfirmReady';
import NightSummary from './NightSummary';

import Player from '../Player';

type Props = {
  players: Player[];
};

type State = {
  players: Player[];
  newPlayers: Player[];

  night: number;
  stage: number;
  playerIndex: number;
};

class Game extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      players: this.props.players,
      newPlayers: this.props.players,

      night: 0,
      stage: 0,
      playerIndex: 0,
    };

    this.onReady = this.onReady.bind(this);
    this.onDescriptionDone = this.onDescriptionDone.bind(this);
    this.onActionDone = this.onActionDone.bind(this);
    this.onSummaryDone = this.onSummaryDone.bind(this);
  }

  onReady(): void {
    this.setState({stage: this.state.night ? 1 : -1});
  }

  onDescriptionDone(): void {
    const lastPlayer = (this.state.playerIndex
      === this.state.players.length - 1);

    this.setState({
      playerIndex: lastPlayer ? 0 : this.state.playerIndex + 1,

      night: lastPlayer ? this.state.night + 1 : this.state.night,
      stage: 0,
    });
  }

  onActionDone(newPlayers: Player[]): void {
    const lastPlayer = (this.state.playerIndex
      === this.state.players.length - 1);

    if (lastPlayer) {
      this.setState({
        newPlayers: newPlayers,

        stage: 2,
        playerIndex: 0,
      });
    } else {
      this.setState({
        newPlayers: newPlayers,

        stage: 0,
        playerIndex: this.state.playerIndex + 1,
      });
    }
  }

  onSummaryDone() {
    this.setState({
      players: this.state.newPlayers,

      night: this.state.night + 1,
      stage: 0,
    });
  }

  render() {
    // TODO: shuffle order and implement role priorities
    const currPlayer: Player = this.state.players[this.state.playerIndex];

    switch (this.state.stage) {
      case 0:
      if (!currPlayer.alive) {
        this.onActionDone(this.state.players);
      }

      return (
        <ConfirmReady player={currPlayer}
          onReady={this.onReady} />
        );

      case -1:
      return (
        <RoleDescription player={currPlayer}
          onDone={this.onDescriptionDone} />
        );

      case 1:
      return (
        <PlayerAction onDone={this.onActionDone}
          players={this.state.players}
          newPlayers={this.state.newPlayers}
          playerIndex={this.state.playerIndex} />
        );

      case 2:
      return (
        <NightSummary players={this.state.players}
          night={this.state.night}
          newPlayers={this.state.newPlayers}
          onDone={this.onSummaryDone}/>
      );

      default: break;
    }
  }
}

export default Game;
