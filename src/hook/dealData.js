import * as R from "ramda";

/**
 *  * 搜尋時取用的功能
 *  @param {Array} list
 *  @param {String} keyword
 */
function filterMatchedItems(list, keyword = "", filterKeys = []) {
    if (keyword === "") return list;
    const isMatched = object => {
        const isFound = key =>
            new RegExp(R.toLower(keyword)).test(R.toLower(object[key]));
        return R.find(isFound)(filterKeys) !== undefined ? true : false;
    };
    return R.filter(isMatched, list);
}

function arraySortByKey(targetArray, key) {
    return R.sortBy(R.compose(R.toLower, R.prop(key)))(targetArray);
}

function findKeyByValue(dataArray, keyToFind, inputValue) {
    return R.find(R.propEq(keyToFind, inputValue))(dataArray);
}

export default { filterMatchedItems, arraySortByKey, findKeyByValue };
