import { combineReducers } from 'redux';
import {
    UPDATE_CSS_TEXT,
} from '../actions';

const initialState = {
    user: null,
    storyId: null,
    storyText: "",
    cssText: "",
    serverHasLatest: null,
};

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
});
