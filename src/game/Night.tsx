import React from 'react';

import RoleAction from './RoleAction';
import Player from './Player';

type Props = {
  players: string[];
  roles: string[];
};

type State = {
  players: Player[];
  roles: string[];
  index: number;
  stage: number;
};

class Night extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let players: Player[] = [];
    for (let i = 0; i < this.props.players.length; i++) {
      players.push({
        name: this.props.players[i],
        role: this.props.roles[i],
        alive: true,
      } as Player);
    }

    this.state = {
      players: players,
      roles: Array.from(this.props.roles),
      index: 0,
      stage: 0,
    };

    this.onReady = this.onReady.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  onReady() {
    this.setState({stage: 1});
  }

  onFinish(players?: Player[]) {
    if (players === undefined) {
      this.setState({
        index: this.state.index + 1,
        stage: 0,
      });
      return;
    }

    this.setState({
      players: players,
      index: this.state.index + 1,
      stage: 0,
    });
  }

  render() {
    // TODO: shuffle order and implement role priorities
    switch (this.state.stage) {
      case 0:
        return (
          <div className='container'>
            <div>{this.state.players[this.state.index].name}:</div>

            <button className='btn btn-primary btn-lg'
              onClick={this.onReady}>Ready</button>
          </div>
        );
      case 1:
        return (
          <RoleAction onFinish={this.onFinish}
            players={this.state.players}
            index={this.state.index} />
        );
    }
  }
}

export default Night;
