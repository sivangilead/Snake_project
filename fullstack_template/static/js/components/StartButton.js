import React from 'react';

export default function StartButton(props) {
  return (
    <div className="startBut">
      <button
        onClick={() => {
          props.startGame();
        }}>
        Start Game
      </button>
    </div>
  );
}
