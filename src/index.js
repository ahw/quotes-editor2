import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import { Provider } from 'react-redux';
import App from './containers/App';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import {
    getMode,
    getStoryId,
} from './utils/url';
import './index.css';
import linkStoreWithPath from './firebase-redux/linkStoreWithPath';
import {
    UPDATE_ENTIRE_STORY
} from './actions';

function setupFirebaseStoreBindings(firebase, store, storyId) {
    // The database path you want to bind with
    const storiesPath = '/stories/' + storyId;

    // Action to dispatch when the value in the database changes
    const storyActionCreator = ({ storyText, cssText, storyUserId, error }) => {
        if (error) {
            console.log(error);
            return {
                readAccess: false,
                receivedDataOnce: true,
            };
        }

        return {
            type: UPDATE_ENTIRE_STORY,
            storyText,
            cssText,
            storyUserId,
            receivedDataOnce: true,
        };
    };

    // Portion of the state that should be written to the database
    const storySelector = (state) => {
        const stuffToWrite = {
            storyUserId: firebase.auth().currentUser.uid,
        };
        
        if (state.storyText !== null) {
            stuffToWrite.storyText = state.storyText;
        }
        
        if (state.cssText !== null) {
            stuffToWrite.cssText = state.cssText;
        }
        
        console.log('Writing stuff to the database', stuffToWrite);
        return stuffToWrite;
    }

    // Create a function to bind '/stories' in the database
    // with 'state.{storyId,storyText,cssText}' in the Redux store
    // 
    const linkStory = linkStoreWithPath({
        path: storiesPath,
        actionCreator: storyActionCreator,
        selector: storySelector,
        dbMethod: 'update',
        debug: true,
    });

    // Invoke anywhere in the code to set up the binding
    const unlink = linkStory(firebase.database(), store);
    return unlink;
}


const loggerMiddleware = createLogger();
const initialState = {
    storyId: getStoryId(),
    mode: getMode(),
};

const store = createStore(appReducer, initialState, applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
));


function renderApp(firebase) {
    window.store = store;
    ReactDOM.render(
        <Provider store={store}>
            <App
                firebase={firebase}
                setupFirebaseStoreBindings={setupFirebaseStoreBindings.bind(this, firebase, store)}
            />
        </Provider>,
        document.getElementById('root')
    );
}

if (typeof window !== 'undefined') {
    renderApp(window.firebase);
}

// That's right, no server-side rendering whatsoever.
