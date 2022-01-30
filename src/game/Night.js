import React from 'react';

import RoleAction from './RoleAction';

import Roles from '../Roles';

class Night extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: Array.from(this.props.players),
      roles: Array.from(this.props.roles),
      index: 0,
      stage: 0,
      choice: null,
    };

    this.onReady = this.onReady.bind(this);
  }

  onReady() {
    this.setState({stage: this.state.stage + 1});
  }

  render() {
    // TODO: shuffle order and implement role priorities
    const i = this.state.index;

    switch (this.state.stage) {
      case 0:
        return (
          <>
            <div>{this.state.players[i]}:</div>
            <button onClick={this.onReady}>Ready</button>
          </>
        );
      case 1:
        return (
          <RoleAction />
        );
    }
  }
}

export default Night;
