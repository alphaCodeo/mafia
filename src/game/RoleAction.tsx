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
  selection: string;
};

class RoleAction extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      inputIndex: 0,
      players: this.props.players,
      selection: '',
    };

    this.radioSelect = this.radioSelect.bind(this);
    this.performAction = this.performAction.bind(this);
    this.onDone = this.onDone.bind(this);
  }

  radioSelect(event: React.ChangeEvent) {
    this.setState({selection: (event.currentTarget as HTMLFormElement).value});
  }

  performAction(event: React.FormEvent): void {
    event.preventDefault();

    let i: number;
    for (i = 0; i < this.state.players.length; i++) {
      if (this.state.players[i].name === this.state.selection) {
        break;
      }
    }

    const currPlayer: Player = this.props.players[this.props.playerIndex];
    const action = Roles[currPlayer.role].action(this.state.players, [i]);

    if (action !== undefined) {
      this.setState({
        inputIndex: this.state.inputIndex + 1,
        players: action,
      });
      return;
    }

    this.setState({inputIndex: this.state.inputIndex + 1});
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
        let form = [];
          for (let i = 0; i < this.props.players.length; i++) {
            const name = this.props.players[i].name;

            form.push(
              <div className='form-check d-flex justify-content-center' key={'form' + i}>
                <input value={name} className='form-check-input' type='radio'
                  onChange={this.radioSelect} name='choice'
                  key={'radio' + i} />
                <label className='form-check-label' htmlFor={name}
                  key={'label' + i}>{name}</label>
              </div>
            );
          }

          actionDisplay = (
            <form onSubmit={this.performAction}>
              {form}
              <input className='btn btn-primary' type='submit' value='Done' />
            </form>
          );
          break;

        case Input.Boolean:
        actionDisplay = (
          <form onSubmit={this.performAction}>
            <input value='yes' className='form-check-input' type='radio'
              onChange={this.radioSelect} name='choice' />
            <label className='form-check-label' htmlFor='yes'>Yes</label>
            <input value='no' className='form-check-input' type='radio'
              onChange={this.radioSelect} name='choice' />
            <label className='form-check-label' htmlFor='no'>No</label>

            <input className='btn btn-primary' type='submit' value='Done' />
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

        <button className='btn btn-primary btn-lg'
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
