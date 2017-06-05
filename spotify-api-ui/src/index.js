import React from 'react';
import ReactDOM from 'react-dom';
import SpotifyApp from './app/main/SpotifyApp';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SpotifyApp />, document.getElementById('root'));
registerServiceWorker();
