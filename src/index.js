import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import appReducer from './reducers';
import { Provider } from 'react-redux';
import App from './containers/App';
import './index.css';

const store = createStore(appReducer);

function renderApp(firebase) {
    window.store = store;
    ReactDOM.render(
        <Provider store={store}>
            <App firebase={firebase} />
        </Provider>,
        document.getElementById('root')
    );
}

if (typeof window !== 'undefined') {
    renderApp(window.firebase);
}

// That's right, no server-side rendering whatsoever.
