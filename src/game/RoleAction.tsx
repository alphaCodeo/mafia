import React from 'react';

import Roles from '../Roles';
import Player from '../Player';

type Props = {
  onFinish: (players?: Player[]) => void;
  players: Player[];
  playerIndex: number;
};

type State = { };

class RoleAction extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { };

    this.onFinish = this.onFinish.bind(this);
  }

  onFinish() {
    let form = [];
    const currPlayer: Player = this.props.players[this.props.playerIndex];
    const action: Player[] | undefined
      = Roles[currPlayer.role].action(this.props.players, () => 1);

    if (action !== undefined) {
      for (let i = 0; i < this.props.players.length; i++) {
        const name = this.props.players[i].name;
        form.push(
          <input key={'radio' + i} type='radio' id={name} name='victim' />,
          <label key={'label' + i} htmlFor={name}>{name}</label>
        );
      }
    }

    return (
      <form onSubmit={() => {this.props.onFinish(action)}}>
        {form}
        <input type='submit' value='Done' />
      </form>
    );
  }

  render() {
    const currPlayer: Player = this.props.players[this.props.playerIndex];

    return (
      <>
        <div>{currPlayer.name}:</div>
        <div>{Roles[currPlayer.role].display}</div>
        {this.onFinish()}
      </>
    );
  }
}

export default RoleAction;
