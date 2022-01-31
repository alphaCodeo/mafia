import React from 'react';

import Roles from '../Roles';

class ChooseRoles extends React.Component {
  constructor(props) {
    super(props);

    this.roleNames = [];
    let selected = {};

    for (const i in Roles) {
      this.roleNames.push(Roles[i].name);
      selected[Roles[i].name] = false;
    }

    this.state = {
      selected: selected,
    };

    this.onSelect = this.onSelect.bind(this);
    this.countSelection = this.countSelection.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  onSelect(event) {
    const role = event.target.id;
    const newSelected = Object.assign({}, this.state.selected);

    newSelected[role] = !newSelected[role];

    this.setState({selected: newSelected});
  }

  countSelection() {
    const values = Object.values(this.state.selected);
    let count = 0;

    for (let i = 0; i < values.length; i++) {
      count += values[i];
    }

    return count;
  }

  startGame() {
    const roleList = Object.keys(this.state.selected)
      .filter((e) => this.state.selected[e])

    this.props.onSubmit(roleList);
  }

  render() {
    const roleList = this.roleNames.map((name, i) => (
      <div className='card' key={'card' + i}>
        <div className='card-body form-check' key={'form' + i}>
          <label htmlFor={name} className='form-check-label card-title'
            key={'label' + i}>
            {name}
          </label>
          <input id={name} className='form-check-input card-text'
            type='checkbox' key={'input' + i}
            onClick={this.onSelect} onChange={this.onSelect}
            checked={this.state.selected[name]} 
            disabled={this.state.selected[name] ? false
            : (this.countSelection() >= this.props.players.length)} />
        </div>
      </div>
    ));

    return (
      <div className='container'>
        <div>
          {this.props.players.length} players
        </div>

        <form className='form-check' onSubmit={this.startGame}>
          {roleList}

          <button className='btn btn-primary btn-lg' type='submit'
            disabled={!this.countSelection()}>
            Start Game
          </button>
        </form>
      </div>
    );
  }
}

export default ChooseRoles;
