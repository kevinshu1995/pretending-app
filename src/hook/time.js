import * as R from "ramda";
import DealData from "./dealData";
import { useStore } from "vuex";
import { computed } from "vue";

export default () => {
    const now = computed(() => useStore().getters.getNow);

    const dateTimeReg = () =>
        new RegExp(
            /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(([\+|-])(\d{2}):(\d{2})|Z)/
        );

    const ISOStringReg = () =>
        new RegExp(
            /.?(\d{4,5})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z/
        );

    function getISOString() {
        try {
            return now.value.toISOString();
        } catch {
            return "";
        }
    }

    function getISOTimestamp() {
        return Math.floor(now.value / 1000);
    }

    function getUnixtimeByClient() {
        return R.match(ISOStringReg())(getISOString());
    }

    function formateDateTime() {
        const [originData, year, month, date, hour, minute, second, ...rest] = [
            ...getUnixtimeByClient(),
        ];
        return {
            originData,
            year,
            month,
            date,
            hour,
            minute,
            second,
            rest,
        };
    }

    /**
     *
     * @param {String} targetOffset
     * @returns {Object} 回傳相對時間 day & hour
     */
    function relativeWithLocal(targetOffset) {
        const localOffset = R.negate(new Date().getTimezoneOffset()) / 60;
        const localHour = new Date().getHours();

        // * 會超過 24 或小於 0
        const targetHour = localHour + targetOffset - localOffset;
        let day;
        if (targetHour > 23) day = "Tomorrow";
        if (targetHour < 0) day = "Yesterday";
        else day = "Today";
        const offsetHour = () =>
            targetOffset - localOffset > 0
                ? `+${targetOffset - localOffset}`
                : targetOffset - localOffset;
        return {
            day,
            hour: offsetHour(),
        };
    }

    /**
     * @param {Number}
     * @returns {Object}  使用者端相對指定 timeoffset 的當地時間 & 補零
     */
    function getTargetOffsetTime(targetOffset) {
        // * 傳入的 offset
        const offsetAllMinutes = targetOffset * 60;
        const divideMinute = R.divide(R.__, 60);

        const currentTime = {
            hour: formateDateTime().hour || 0,
            minute: formateDateTime().minute || 0,
        };

        const target_minute = R.modulo(
            Number(currentTime.minute) + offsetAllMinutes,
            60
        );

        const target_hour = R.modulo(
            Number(currentTime.hour) +
                divideMinute(
                    Number(currentTime.minute) +
                        offsetAllMinutes -
                        target_minute
                ),
            24
        );

        const deal_negative_time = time =>
            R.cond([
                [R.equals(-0), R.always(0)],
                [R.gt(0), x => time + x],
                [R.T, x => x],
            ]);

        return {
            hour: DealData.pad_with_zeros(deal_negative_time(24)(target_hour)),
            minute: DealData.pad_with_zeros(
                deal_negative_time(60)(target_minute)
            ),
        };
    }
    return {
        formateDateTime,
        relativeWithLocal,
        getTargetOffsetTime,
        now,
    };
};
