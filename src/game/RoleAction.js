import React from 'react';

import Roles from '../Roles';

class RoleAction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: Array.from(this.props.players),
      roles: Array.from(this.props.roles),
      index: 0,
      stage: 0,
      choice: null,
    };

    this.setStateAsync = this.setStateAsync.bind(this);
    this.onReady = this.onReady.bind(this);
    this.getChoice = this.getChoice.bind(this);
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  /*async getChoice() {
    // TODO: return user's choice
    await this.setStateAsync({choosing: true});
    this.setState({choosing: false});
    return this.state.choice;
  }*/

  onReady() {
    // TODO: clean up
    //if (!this.state.roles[this.state.index].action) {
      this.setState({stage: this.state.stage + 1});
      /*return;
    }

    this.setState({
      ...Roles[this.state.roles[this.state.index]]
        .action(this.state, this.getChoice),
      stage: this.state.stage + 1,
    });*/
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
      /*let form = [];

      for (let i = 0; i < this.state.players.length; i++) {
        const name = this.state.players[i];
        form.push(
          <input key={i} type='radio' id={name} name='victim' />,
          <label for={name}>{name}</label>
        );
      }

      display.push(
        <form onSubmit={() => {}}>
          {form}
          <input type='submit' value='Done' />
        </form>
      );*/
    }
  }

  componentDidUpdate() {
  }
}

export default RoleAction;
