import { combineReducers } from 'redux';
import {
    UPDATE_CSS_TEXT,
} from '../actions';

const initialState = {
    user: null,
    storyId: null,
    storyText: null,
    storyUserId: null,
    cssText: null,
    mode: null,
    receivedDataOnce: false,
};

function storyUserId(state = initialState.storyUserId, action) {
    return action.storyUserId || state;
}

function mode(state = initialState.mode, action) {
    return action.mode || state;
}

function receivedDataOnce(state = initialState.receivedDataOnce, action) {
    return action.receivedDataOnce || state;
}

function user(state = initialState.user, action) {
    // If a user was provided, return it; otherwise just return the default null
    return action.user || state;
}

function storyId(state = initialState.storyId, action) {
    return action.storyId || state;
}

function storyText(state = initialState.storyText, action) {
    return action.storyText || state;
}

function cssText(state = initialState.cssText, action) {
    return typeof action.cssText !== 'undefined' ? action.cssText : state;
}

export default combineReducers({
    user,
    storyId,
    storyText,
    cssText,
    mode,
    receivedDataOnce,
    storyUserId,
});
