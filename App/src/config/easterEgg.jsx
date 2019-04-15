import React from 'react';
import gif0 from '../assets/00.gif';
import gif1 from '../assets/01.gif';
import gif2 from '../assets/02.gif';

const EASTEREGGS = [
  (
    <img
      key="Egg0"
      title="Egg number 0"
      alt="Egg number 0"
      src={gif0}
      frameBorder="0"
      className="giphy-embed"
      allowFullScreen
    />
  ), (
    <img
      key="Egg1"
      title="Egg number 1"
      alt="Egg number 1"
      src={gif1}
      frameBorder="0"
      className="giphy-embed"
      allowFullScreen
    />
  ), (
    <img
      key="Egg2"
      title="Egg number 2"
      alt="Egg number 2"
      src={gif2}
      frameBorder="0"
      className="giphy-embed"
      allowFullScreen
    />
  )
];

export default EASTEREGGS;
