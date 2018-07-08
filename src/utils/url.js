import _map from 'lodash/map';
import _assign from 'lodash/assign';
import Url from 'url';

export function getUrl(obj) {
    if (!obj) {
        obj = {};
    }

    const { query } = Url.parse(window.location.href, true);
    const result = Url.format({ query: _assign({}, query, obj) });
    return result;
}