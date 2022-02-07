import React from 'react';

import DoneButton from './DoneButton';

import Player from '../Player';
import Roles from '../Roles';

type Props = {
  players: Player[];
  newPlayers: Player[];

  night: number;

  onDone: () => void;
};

export default function NightSummary(props: Props) {
  const livePlayers = props.newPlayers.filter(player => player.alive);
  const sameAffil = livePlayers.filter(player => (
    Roles[player.role].affiliation === Roles[livePlayers[0].role].affiliation
  ));

  if (sameAffil.length === livePlayers.length) {
    return (
      <div className='alert alert-secondary text-center my-1'>
        The {Roles[livePlayers[0].role].affiliation} wins.
      </div>
    );
  }

  let newDeaths: string[] = [];

  props.newPlayers.forEach((player, i) => {
    if (props.players[i].alive !== player.alive) {
      newDeaths.push(player.name);
    }
  });

  return (
    <div className='container text-center'>
      <div>
        End of night {props.night}:
      </div>

      <div className='alert alert-secondary my-1'>
        {newDeaths.length ? newDeaths.join(', ')
          : 'No one'} died last night. Discuss.
        </div>

        <DoneButton onDone={props.onDone} />
      </div>
  );
}
