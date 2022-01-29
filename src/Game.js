import React from 'react';
//import roles from './roles.json';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div>{this.props.players}</div>
      </div>
    );
  }
}

/* Prosecutor (Town)

Defense Attorney (Town)

Good King (Town)
You are the King

Evil King (uh…not town?)

Suspicious

Not Suspicious

You were roleblocked!

Your target is Immume
You have received a Vest from the Armourer

You have been blackmailed! You will be unable to talk for the next day

You can’t see your target with all this fog in their house! */

export default Game;
