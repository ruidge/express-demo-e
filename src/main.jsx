import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root.jsx';

let attachElement = document.getElementById('react-app');

ReactDOM.render(<Root phrase="ES6 ruidge"/>, attachElement); // 实例化根组件，并启动应用