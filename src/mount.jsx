import React from 'react';
import MainComponent from './components/MainComponent.jsx';

const mountNode = document.getElementById('react-mount-node');

React.render(<MainComponent />, mountNode);