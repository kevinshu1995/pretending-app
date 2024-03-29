import * as R from 'ramda'
import DealData from './dealData.js'
import timezones from 'timezones.json'

function getTimezones() {
    const tz = timezones
    function fn() {
        return tz
    }
    return fn()
}

/**
 *
 * @param {String} utcName
 * @returns {Array}
 * * Note that this function will return an empty array when there are no matches.
 */
function matchName_without_GMT(utcNameString) {
    const no_GMT_regexp = /(.+)\/(?!GMT)/
    return R.match(no_GMT_regexp, utcNameString)
}

function isNotIncludeGMT(utcNameString) {
    return R.length(matchName_without_GMT(utcNameString)) !== 0
}

/**
 *
 * * 用來調整名稱格式
 *
 * @param {String} utcName
 * @returns {String | null} { `${Area}, ${Continent || Country}` } or {null}
 *
 */
function filtered_slash(utcName) {
    return R.compose(R.join(''), R.drop(1), R.split('/'))(utcName)
}

/**
 * Get a timezone list restructured and not included GMT in utc
 * @returns {Array}
 */
function getTimezoneName() {
    const tz = getTimezones()
    const groupNames = (accumulator, zone) => {
        const restructure = (areaNameString) => {
            return {
                name: filtered_slash(areaNameString),
                zoneAbbr: zone.abbr,
                zone: zone,
            }
        }
        return accumulator.concat(
            R.compose(R.map(restructure), R.filter(isNotIncludeGMT))(zone.utc)
        )
    }
    return R.reduce(groupNames, [], tz)
}

function getSortedTimezoneByName() {
    return DealData.arraySortByKey(getTimezoneName(), 'name')
}

function findZoneByAbbr(abbr) {
    const tz = getTimezones()
    return DealData.findKeyByValue(tz, 'abbr', abbr)
}

export default {
    timezones,
    getSortedTimezoneByName,
    findZoneByAbbr,
    // * only for test below
    matchName_without_GMT,
    filtered_slash,
}
