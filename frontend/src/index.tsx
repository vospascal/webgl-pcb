import React from 'react';
import ReactDOM from 'react-dom';
import {getPropertyKeyCaseInsensitive} from '~/utils/getPropertyKeyCaseInsensitive';

const text = process.env.TEXT;
console.log(process.env.NODE_ENV)

const abc = {
  A: 'd',
  B: 'e'
}

console.log(getPropertyKeyCaseInsensitive(abc, 'b'));
ReactDOM.render( 
  <div> {text} !</div>, 
  document.getElementById('root')
);