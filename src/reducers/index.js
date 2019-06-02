import { combineReducers } from 'redux';
import {
    UPDATE_STORY_ID,
    UPDATE_CSS_TEXT,
} from '../actions';
import {
    getUrl,
    pushUrlOntoHistory,
} from '../utils/url';

const defaultState = {
    user: null,
    storyId: null,
    storyText: null,
    storyUserId: null,
    cssText: null,
    mode: null,
    receivedDataOnce: false,
};

function storyUserId(state = defaultState.storyUserId, action) {
    return action.storyUserId || state;
}

function mode(state = defaultState.mode, action) {
    return action.mode || state;
}

function receivedDataOnce(state = defaultState.receivedDataOnce, action) {
    return action.receivedDataOnce || state;
}

function user(state = defaultState.user, action) {
    // If a user was provided, return it; otherwise just return the default null
    return action.user || state;
}

function storyId(state = defaultState.storyId, action) {
    if (action.type === UPDATE_STORY_ID) {
        const { storyId } = action;
        pushUrlOntoHistory({ storyId }, null, getUrl({ id: storyId }));
        return action.storyId;
    }

    return state;
}

function storyText(state = defaultState.storyText, action) {
    return action.storyText || state;
}

function cssText(state = defaultState.cssText, action) {
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
