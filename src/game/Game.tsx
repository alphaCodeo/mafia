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
  newDeaths: string[];
  //newDeaths: Player[];
};

class Game extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      players: this.props.players,
      playerIndex: 0,
      stage: 0,
      night: 0,
      newDeaths: [],
    };

    this.onReady = this.onReady.bind(this);
    this.onDone = this.onDone.bind(this);
    this.nightSummary = this.nightSummary.bind(this);
  }

  onReady(): void {
    if (!this.state.night) {
      this.setState({stage: -1});
      return;
    }

    this.setState({stage: 1});
  }

  onDone(players?: Player[]): void {
    let newState = {} as State;

    if (this.state.stage === 2) {
      this.setState({stage: 0});
      return;
    }

    if (this.state.playerIndex === this.state.players.length - 1) {
      newState.playerIndex = 0;
      newState.stage = (this.state.stage === -1) ? 0 : 2;
      newState.night = this.state.night + 1;
    } else {
      newState.playerIndex = this.state.playerIndex + 1;
      newState.stage = 0;
    }

    if (players !== undefined) {
      newState.newDeaths = [];
      this.state.players.forEach((player, i) => {
        if (player.alive !== players[i].alive) {
          newState.newDeaths.push(players[i].name);
        }
      });

      newState.players = players;
    }

    this.setState(newState);
  }

  nightSummary(): React.ReactElement {
    const livePlayers = this.state.players.filter(player => player.alive);
    const sameAffil = livePlayers.filter(player => (
      Roles[player.role].affiliation === Roles[livePlayers[0].role].affiliation
    ));

    if (sameAffil.length === livePlayers.length) {
      return (
        <div className='alert alert-secondary text-center'>
          The {Roles[livePlayers[0].role].affiliation} wins.
        </div>
      );
    }

    return (
      <div className='container text-center'>
        <div>
          End of night {this.state.night}:
        </div>

        <div className='alert alert-secondary my-1'>
          {this.state.newDeaths.length ? this.state.newDeaths.join(', ')
            : 'No one'} died last night. Discuss.
          </div>

          <button className='btn btn-primary btn-lg my-1'
            onClick={() => {this.onDone()}}>Done</button>
        </div>
      );
  }

  render() {
    // TODO: shuffle order and implement role priorities
    const currPlayer: Player = this.state.players[this.state.playerIndex];

    if (this.state.stage !== 2 && !currPlayer.alive) {
      this.onDone();
    }

    switch (this.state.stage) {
      case 0:
      return (
        <div className='container text-center'>
          <div>{currPlayer.name}:</div>

          <button className='btn btn-primary btn-lg my-2'
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

          <button className='btn btn-primary btn-lg my-2'
            onClick={() => {this.onDone()}}>Done</button>
        </div>
      );

      case 1:
      return (
        <RoleAction onDone={this.onDone}
          players={this.state.players}
          playerIndex={this.state.playerIndex} />
        );

      case 2:
      return this.nightSummary();

      default: break;
    }
  }
}

export default Game;
