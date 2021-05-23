import React from 'react';
import ReactDOM from 'react-dom';

const text = process.env.TEXT;
console.log(process.env.NODE_ENV);

ReactDOM.render(<div> {text} ! </div>, document.getElementById('root'));
