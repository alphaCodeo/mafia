import React from 'react';

type Props = {
  onDone: () => void;
};

export default function DoneButton(props: Props) {
  return (
    <button className='btn btn-primary btn-lg my-1'
      onClick={() => {props.onDone()}}>
      Done
    </button>
  );
}
