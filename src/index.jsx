import React from 'react';
import ReactDOM from 'react-dom'; //ブラウザに特化

import App from './components/App.jsx'

// containerクラスが付いているエレメントの中にAppを描画する
ReactDOM.render(<App />, document.querySelector('.container'));


