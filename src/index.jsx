import React from 'react';
import ReactDOM from 'react-dom'; //ブラウザに特化
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';
import reducer from './reducers/'

const store = createStore(
	reducer,
composeWithDevTools(applyMiddleware(thunk)),
);


ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.querySelector('.container'),
);