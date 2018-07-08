export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_CSS_TEXT = 'UPDATE_CSS_TEXT';
export const UPDATE_STORY_TEXT = 'UPDATE_STORY_TEXT';
export const UPDATE_STORY_ID = 'UPDATE_STORY_ID';
export const UPDATE_ENTIRE_STORY = 'UPDATE_ENTIRE_STORY';
export const UPDATE_MODE = 'UPDATE_MODE';

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        user,
    };
}

export function updateMode(mode) {
    return {
        type: UPDATE_MODE,
        mode,
    };
}

export function updateCssText(cssText) {
    return {
        type: UPDATE_CSS_TEXT,
        cssText,
    };
}

export function updateStoryId(storyId) {
    return {
        type: UPDATE_STORY_ID,
        storyId,
        storyUserId: storyId,
    };
}

export function updateStoryText(storyText) {
    return {
        type: UPDATE_STORY_TEXT,
        storyText: storyText,
    };
}