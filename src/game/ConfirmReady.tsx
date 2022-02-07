import React from 'react';

import NameHeader from './NameHeader';

import Player from '../Player';

type Props = {
  player: Player;
  onReady: () => void;
};

export default function Game(props: Props) {
  return (
    <div className='text-center'>
      <NameHeader player={props.player} />

      <button className='btn btn-primary btn-lg my-1'
        onClick={props.onReady}>
        Ready
      </button>
    </div>
  );
}
