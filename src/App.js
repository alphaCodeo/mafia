import React, { useState } from 'react';
import Setup from './setup/Setup';
import Game from './Game';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: 0,
      players: [],
    };

    this.start = this.start.bind(this);
  }

  start(players) {
    this.setState({stage: 1, players: players});
  }

  render() {
    switch (this.state.stage) {
      case 0:
        return <Setup onStart={this.start} />;
        break;
      case 1:
        return <Game players={this.state.players} />;
        break;
    }
  }
}

export default App;
