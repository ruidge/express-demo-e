//var React = require('react');
//var ReactDOM = require('react-dom');
//var Index = require('./index.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root.jsx';

let attachElement = document.getElementById('react-app');

ReactDOM.render(<Root/>, attachElement); // 实例化根组件，并启动应用