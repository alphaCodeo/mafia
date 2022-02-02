import React from 'react';

import RoleAction from './RoleAction';
import Player from '../Player';

import Roles from '../Roles';

type Props = {
  players: Player[];
};

type State = {
  players: Player[];
  playerIndex: number;
  stage: number;
  night: number;
};

class Game extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      players: this.props.players,
      playerIndex: 0,
      stage: 0,
      night: 0,
    };

    this.onReady = this.onReady.bind(this);
    this.onDone = this.onDone.bind(this);
  }

  onReady() {
    if (!this.state.night) {
      this.setState({stage: -1});
      return;
    }

    this.setState({stage: 1});
  }

  onDone(players?: Player[]) {
    let newIndex: number;

    if (this.state.playerIndex === this.state.players.length - 1) {
      newIndex = 0;
    } else{
      newIndex = this.state.playerIndex + 1;
    }

    if (players === undefined) {
      this.setState({
        playerIndex: newIndex,
        stage: 0,
        night: newIndex ? this.state.night : this.state.night + 1,
      });
      return;
    }

    this.setState({
      players: players,
      playerIndex: newIndex,
      stage: 0,
      night: newIndex ? this.state.night : this.state.night + 1,
    });
  }

  render() {
    // TODO: shuffle order and implement role priorities
    const currPlayer: Player = this.state.players[this.state.playerIndex];

    if (!currPlayer.alive) {
      this.onDone();
    }

    switch (this.state.stage) {
      case 0:
      return (
        <div className='container text-center'>
          <div>{currPlayer.name}:</div>

          <button className='btn btn-primary btn-lg'
            onClick={this.onReady}>Ready</button>
        </div>
      );

      case -1:
      return (
        <div className='container text-center'>
          <div>{currPlayer.name}:</div>
          <div>
            You are the {currPlayer.role}.
          </div>
          <div>
            {Roles[currPlayer.role].description}
          </div>

          <button className='btn btn-primary btn-lg'
            onClick={() => {this.onDone()}}>Done</button>
        </div>
      );

      case 1:
      return (
        <RoleAction onDone={this.onDone}
          players={this.state.players}
          playerIndex={this.state.playerIndex} />
      );

      default: break;
    }
  }
}

export default Game;
