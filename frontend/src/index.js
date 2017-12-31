import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let root=document.createElement('div');
root.className='root';
document.body.appendChild(root);
ReactDOM.render(React.createElement(App), root);
