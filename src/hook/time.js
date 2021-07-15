import * as R from "ramda";

const timeZoneOffset = now => now.getTimezoneOffset() / 60;

const getHour = now => now.getHours();

const getMinute = now => now.getMinutes();

const decimal_to_sexagesimalScale = value => (Number(value) / 10) * 60;

const toString = value => String(value);

function isInt(number) {
    return (typeof n === "number" && number % 1 === 0) || number % 1 === -0;
}

function dealTimeZoneOffset(now) {
    const _timeZoneOffset = timeZoneOffset(now);
    if (isInt(_timeZoneOffset)) {
        return {
            hours: _timeZoneOffset,
            extraMinutes: 0,
        };
    } else {
        splitHour(_timeZoneOffset);
    }
}

function splitHour(value) {
    const _toString = toString(value);
    // TODO 考慮負值
    const [hours, minutes] = R.split(".", _toString);
    return {
        hours: Number(hours),
        extraMinutes: decimal_to_sexagesimalScale(minutes),
    };
}

const timeOffset_0 = () => {
    const now = new Date();
    const getTimeZoneOffset = dealTimeZoneOffset(now);
    return {
        hours: getHour(now) + getTimeZoneOffset.hours,
        minutes: getMinute(now) + getTimeZoneOffset.extraMinutes,
    };
};

export default {
    now: new Date(),
    now_timeOffset_0: timeOffset_0,
};
