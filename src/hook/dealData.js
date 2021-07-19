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

/**
 * @param {Object} 要被比對的物件
 * @return {Boolean}
 */
function isRepeatByKey(dataArray, obj, key) {
    return R.find(R.propEq(key, obj[key]))(dataArray) === undefined
        ? true
        : false;
}

/**
 *
 * @param {Number} number 要轉換的數字
 * @param {Number} length 最後的長度
 *
 * @returns {String}
 */
function pad_with_zeros(number, length = 2) {
    if (number < 0) throw "Input number should be GREATER than 0.";
    let toString = R.toString(number);
    while (toString.length < length) {
        toString = "0" + toString;
    }
    return toString;
}

export default {
    filterMatchedItems,
    arraySortByKey,
    findKeyByValue,
    pad_with_zeros,
    isRepeatByKey,
};
