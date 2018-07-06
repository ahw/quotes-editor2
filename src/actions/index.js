export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_CSS_TEXT = 'UPDATE_CSS_TEXT';
export const UPDATE_STORY_TEXT = 'UPDATE_STORY_TEXT';
export const UPDATE_STORY_ID = 'UPDATE_STORY_ID';

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        user,
    };
}

function writeUserData(storyId, cssText, storyText) {
    window.firebase.database().ref('stories/' + storyId).set({
        storyId,
        cssText,
        storyText,
    });
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
    };
}

export function updateStoryText(storyText) {
    return {
        type: UPDATE_STORY_TEXT,
        storyText: storyText,
    };
}