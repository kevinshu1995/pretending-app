import * as R from "ramda";
import unixtime from "./api/unixtime";

const dateTimeReg = () =>
    new RegExp(
        /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(([\+|-])(\d{2}):(\d{2})|Z)/
    );

async function get_currentDateTime_unixTimestamp() {
    try {
        const { data } = await unixtime.get_currentDateTime_unixTimestamp();
        return data.UnixTimeStamp;
    } catch (error) {
        return `get_currentDateTime_unixTimestamp -- ${error}`;
    }
}

async function getDateTimeString(stampAndTimezone) {
    try {
        const { data } =
            await unixtime.post_unixTimestampToDateTimeWithTimezone(
                stampAndTimezone
            );
        return data.Datetime;
    } catch (error) {
        return `getDateTimeString -- ${error}`;
    }
}

async function formateDateTime(stampAndTimezone = {}) {
    if (typeof stampAndTimezone !== "object")
        throw "stampAndTimezone's datatype is wrong";
    try {
        stampAndTimezone.UnixTimeStamp =
            stampAndTimezone.UnixTimeStamp ||
            (await get_currentDateTime_unixTimestamp());

        const dateTime = await getDateTimeString(stampAndTimezone);
        const [originData, year, month, date, hour, minute, second, ...offset] =
            [...dateTime.match(dateTimeReg())];

        return {
            originData,
            year,
            month,
            date,
            hour,
            minute,
            second,
            offset,
        };
    } catch (error) {
        return `formateDateTime -- ${error}`;
    } finally {
    }
}

export default {
    get_currentDateTime_unixTimestamp,
    getDateTimeString,
    formateDateTime,
};
