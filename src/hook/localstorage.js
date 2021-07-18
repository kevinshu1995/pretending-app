function set(key, payload) {
    window.localStorage.setItem(key, JSON.stringify(payload));
}

function get(key) {
    const result = window.localStorage.getItem(key);
    return JSON.parse(result) === null ? [] : JSON.parse(result);
}

export default {
    set,
    get,
};
