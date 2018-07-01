import { combineReducers } from 'redux';
import {
    ADD_CSS_SELECTOR,
    UPDATE_CSS_SELECTOR,
    REMOVE_CSS_SELECTOR,
    ADD_CSS_DECLARATION,
    UPDATE_CSS_DECLARATION,
    REMOVE_CSS_DECLARATION,
} from '../actions';

const initialState = {
    user: null,
    storyId: null,
    storyText: null,
    cssRules: [], // Array of [ { selector: '.selector#value', declarations: { 'background-color': 'red' } } ]
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

function assertValidCssSelectorIndex(cssRules, selector, index) {
    const rule = cssRules[index];
    if (typeof rule === 'undefined') {
        console.warn(`Expected cssRule[${index}] to be defined, but it isn't. Not updating.`);
        return false;
    } else if (rule.selector !== selector) {
        console.warn(`Expected cssRule[${index}] to have selector ${selector}. Instead got ${rule.selector}. Not updating.`);
        return false;
    }
    
    return true;
}

function cssRules(state = initialState.cssRules, { type, selector, index, property, oldProperty = property, value }) {
    switch (type) {
        case ADD_CSS_SELECTOR: {
            return [...state, { selector, declarations: {} }];
        }
        case UPDATE_CSS_SELECTOR: {
            return [
                ...state.slice(0, index),
                {
                    selector,
                    declarations: Object.assign({}, state[index].declarations)
                },
                ...state.slice(index + 1)
            ];
        }
        case REMOVE_CSS_SELECTOR: {
            // Assume index >= 0
            return [...state.slice(0, index), ...state.slice(index + 1)];
        }
        case ADD_CSS_DECLARATION:
        case UPDATE_CSS_DECLARATION: {
            const rule = state[index]; // rule looks like { selector: String, declarations: [] }
            const declarationsCopy = Object.assign({}, rule.declarations);
            delete declarationsCopy[oldProperty];

            if (assertValidCssSelectorIndex(state, selector, index)) {
                return [
                    ...state.slice(0, index),
                    {
                        selector,
                        declarations: Object.assign({}, declarationsCopy, {
                            [property]: value,
                        }),
                    },
                    ...state.slice(index + 1)
                ];
            } else {
                return state;
            }
        }
        case REMOVE_CSS_DECLARATION: {
            const rule = state[index]; // rule maps selector -> property -> value
            const declarationsCopy = Object.assign({}, rule.declarations);
            delete declarationsCopy[property];

            if (assertValidCssSelectorIndex(state, selector, index)) {
                return [
                    ...state.slice(0, index),
                    {
                        selector,
                        declarations: declarationsCopy,
                    },
                    ...state.slice(index + 1)
                ];
            } else {
                return state;
            }
        }
        default:
            return state;
    }
}

export default combineReducers({
    user,
    storyId,
    storyText,
    cssRules,
});
