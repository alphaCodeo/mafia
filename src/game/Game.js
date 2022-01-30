import React from 'react';

import AssignRoles from './AssignRoles';
import Night from './Night';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: 0,
      roles: [],
    };

    this.onAssign = this.onAssign.bind(this);
  }

  onAssign(roles) {
    this.setState({
      stage: this.state.stage + 1,
      roles: roles,
    });
  }

  render() {
    switch (this.state.stage) {
      case 0:
        return (
          <AssignRoles onSubmit={this.onAssign} 
            players={this.props.players}
            roles={this.props.roles} />
        );
      case 1:
        return (
          <Night players={this.props.players}
            roles={this.state.roles} />
        );
    }
  }
}

export default Game;
