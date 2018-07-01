export const UPDATE_USER = 'UPDATE_USER';
export const ADD_CSS_SELECTOR = 'ADD_CSS_SELECTOR';
export const UPDATE_CSS_SELECTOR = 'UDPATE_CSS_SELECTOR';
export const REMOVE_CSS_SELECTOR = 'REMOVE_CSS_SELECTOR';
export const ADD_CSS_DECLARATION = 'ADD_CSS_DECLARATION';
export const REMOVE_CSS_DECLARATION = 'REMOVE_CSS_DECLARATION';
export const UPDATE_CSS_DECLARATION = 'UPDATE_CSS_DECLARATION';

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        user,
    };
}

export function addCssSelector(selector) {
    return {
        type: ADD_CSS_SELECTOR,
        selector,
    };
}

export function updateCssSelector(selector, index) {
    return {
        type: UPDATE_CSS_SELECTOR,
        selector,
        index,
    };
}

export function removeCssSelector(selector, index) {
    return {
        type: REMOVE_CSS_SELECTOR,
        selector,
        index,
    };
}

export function addCssDeclaration(selector, index, property, value) {
    return {
        type: ADD_CSS_DECLARATION,
        selector,
        index,
        property,
        value,
    };
}

export function updateCssDeclaration(selector, index, property, value, oldProperty) {
    return {
        type: UPDATE_CSS_DECLARATION,
        selector,
        index,
        property,
        oldProperty,
        value,
    };
}

export function removeCssDeclaration(selector, index, property) {
    return {
        type: REMOVE_CSS_DECLARATION,
        selector,
        index,
        property,
    };
}
