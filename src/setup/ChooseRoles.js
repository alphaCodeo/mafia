import React from 'react';
import roles from './roles.json';

class ChooseRoles extends React.Component {
  constructor(props) {
    super(props);

    let selected = {};

    for (let i = 0; i < roles.length; i++) {
      selected[roles[i].name] = false;
    }

    this.state = {
      selected: selected,
    };

    this.onSelect = this.onSelect.bind(this);
    this.countSelection = this.countSelection .bind(this);
    this.startGame = this.startGame.bind(this);
  }

  onSelect(event) {
    const role = event.target.id;
    const newSelected = Object.assign({}, this.state.selected);

    newSelected[role] = !newSelected[role];

    this.setState({selected: newSelected});
  }

  countSelection(name) {
    if (this.state.selected[name]) {
      return false;
    }

    const values = Object.values(this.state.selected);
    let count = 0;

    for (let i = 0; i < values.length; i++) {
      if (values[i]) {
        count++;
        if (count >= this.props.players.length) {
          return true;
        }
      }
    }

    return false;
  }

  startGame() {
  }

  render() {
    let display = [];

    const roleList = roles.map((e, i) => (
      <div key={i}>
        <label for={e.name}>{e.name}</label><br />
        <input type="radio" id={e.name} onClick={this.onSelect} 
          onChange={this.onSelect} checked={this.state.selected[e.name]} 
          disabled={this.countSelection(e.name)} />
      </div>
    ));

    display.push(
      <form onSubmit={this.startGame}>
        {roleList}
        <input type="submit" value="Start Game" />
      </form>
    );

    display.push(
      <div>{this.props.players}</div>
    );

    return display;
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

export default ChooseRoles;
