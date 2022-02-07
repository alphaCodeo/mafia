import React from 'react';

import NameHeader from './NameHeader';
import DoneButton from './DoneButton';

import Player from '../Player';
import Roles from '../Roles';

type Props = {
  player: Player;
  onDone: () => void;
};

export default function RoleDescription(props: Props) {
  return (
    <div className='container text-center'>
      <NameHeader player={props.player} />

      <div>
        You are the {props.player.role}.
      </div>
      <div>
        {Roles[props.player.role].description}
      </div>

      <DoneButton onDone={props.onDone} />
    </div>
  );
}
