import _get from 'lodash/get';

export const LOGIN = 'LOGIN';
export const NEW_STORY = 'NEW_STORY';
export const EDIT = 'EDIT';
export const VIEW_ONLY = 'VIEW_ONLY';

export function viewName(state) {
    const { mode, storyId, user, storyUserId } = state;
    const uid = _get(user, 'uid');

    console.log(`[selectors/viewName mode = ${mode}, storyId = ${storyId}, user.email = ${_get(user, 'email')}, storyUserId = ${storyUserId}`);
    if (storyId === null && user === null) {
        return LOGIN;
    } if (storyId === null) {
        return NEW_STORY;
    } else if (mode === null) {
        return VIEW_ONLY;
    } else if (mode === 'edit' && storyUserId === uid) {
        return EDIT;
    } else if (mode === 'edit' && storyUserId !== uid) {
        return VIEW_ONLY;
    } else {
        return `UNKNOWN storyId = ${storyId}, mode = ${mode}, user = ${_get(user, 'email')}, storyUserId = ${storyUserId}`;
    }
}
