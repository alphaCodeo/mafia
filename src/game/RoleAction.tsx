import React from 'react';

import Roles from '../Roles';
import Player from '../Player';
import Input from '../Input';

type Props = {
  onDone: (players?: Player[]) => void;
  players: Player[];
  playerIndex: number;
};

type State = {
  inputIndex: number;
  players: Player[];

  playerInput: (number | boolean)[];

  radioChecked: boolean;
};

class RoleAction extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      inputIndex: 0,
      players: this.props.players,
      playerInput: [],
      radioChecked: false,
    };

    this.submitInput = this.submitInput.bind(this);
    this.onDone = this.onDone.bind(this);
  }

  submitInput(event: React.FormEvent): void {
    event.preventDefault();

    const currPlayer: Player = this.props.players[this.props.playerIndex];
    const currPlayerInput: Input[] = Roles[currPlayer.role].input;

    const rawValue = (event.target as HTMLFormElement).choice.value;
    let value: number | boolean = 0;

    if (currPlayerInput[this.state.inputIndex] === Input.Boolean) {
      value = rawValue === 'yes';
    } else {
      for (let i = 0; i < this.state.players.length; i++) {
        if (this.state.players[i].name === rawValue) {
          value = i;
        }
      }
    }

    if (this.state.inputIndex === currPlayerInput.length - 1) {
      const action = Roles[currPlayer.role].action(this.state.players,
        [...this.state.playerInput, value]);

      if (action !== undefined) {
        this.setState({
          inputIndex: this.state.inputIndex + 1,
          players: action,
        });

        return;
      }

      this.setState({
        inputIndex: 0,
        playerInput: [],
        radioChecked: false,
      });

      return;
    }

    this.setState({
      inputIndex: this.state.inputIndex + 1,
      playerInput: [...this.state.playerInput, value],
      radioChecked: false,
    });
  }

  onDone(): void {
    const currPlayer: Player = this.props.players[this.props.playerIndex];

    if (!Roles[currPlayer.role].input.length) {
      this.props.onDone();
      return;
    }

    this.props.onDone(this.state.players);
  }

  render() {
    const currPlayer: Player = this.props.players[this.props.playerIndex];

    let actionDisplay;

    if (!Roles[currPlayer.role].input.length) {
      actionDisplay = <div>You have no actions to perform.</div>;
    } else {
      switch (Roles[currPlayer.role].input[this.state.inputIndex]) {
        case Input.Player:
        let select: React.ReactElement[] = [];
          const livePlayers = this.state.players
            .filter(player => player.alive
              && (player.name !== currPlayer.name));

          livePlayers.forEach((player, i) => {
            const name = player.name;

            select.push(
              <option value={name} key={'option' + i}>{name}</option>
            );
          });

          actionDisplay = (
            <form onSubmit={this.submitInput}>
              <select className='form-select my-1' name='choice'>
                {select}
              </select>

              <input className='btn btn-primary my-1' type='submit'
                value='Done' />
            </form>
          );

          break;

        case Input.Boolean:
        actionDisplay = (
          <form onSubmit={this.submitInput}>
            <div className='btn-group m-1'>
              <input className='btn-check' type='radio' value='yes'
                onChange={() => {this.setState({radioChecked: true})}}
                name='choice' id='yes' />

              <label className='btn btn-outline-primary' htmlFor='yes'>
                Yes
              </label>

              <input className='btn-check' type='radio' value='no'
                onChange={() => {this.setState({radioChecked: true})}}
                name='choice' id='no'/>

              <label className='btn btn-outline-primary' htmlFor='no'>
                No
              </label>
            </div>

            <input className='btn btn-primary my-1' type='submit' value='Done'
              disabled={!this.state.radioChecked} />
          </form>
        );
          break;

        case undefined:
        actionDisplay = <div>You have finished your actions.</div>;
          break;

        default: break;
      }
    }

    return (
      <div className='container text-center'>
        <div>{currPlayer.name}:</div>

        {actionDisplay}

        <button className='btn btn-primary btn-lg my-1'
          onClick={this.onDone}
          disabled={!(this.state.inputIndex
        >= Roles[currPlayer.role].input.length)}>
          Done
        </button>
      </div>
    );
  }
}

export default RoleAction;
