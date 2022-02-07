import React from 'react';

import Player from '../Player';

type Props = {
  player: Player;
};

export default function NameHeader(props: Props) {
  return (
    <div className='my-1'>
      {props.player.name}:
    </div>
  );
}
