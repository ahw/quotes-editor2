import _get from 'lodash/get';
import _assign from 'lodash/assign';
import Url from 'url';

export function getUrl(obj, { merge = true } = {}) {
    if (!obj) {
        obj = {};
    }

    const { query } = Url.parse(window.location.href, true);
    const result = Url.format({ query: _assign({}, merge ? query : {}, obj) });
    console.log(`Returning url ${result}`);
    return result;
}

export function getQueryParam(param, defaultValue) {
    const { query } = Url.parse(window.location.href, true);
    return _get(query, param, defaultValue);
}

export function getStoryId() {
    return getQueryParam('id', null);
}

export function getMode() {
    return getQueryParam('mode', null);
}

export function pushUrlOntoHistory(stateObject, title, url) {
    if (window.history && window.history.pushState) {
        window.history.pushState(stateObject, title, url);
    }
}
