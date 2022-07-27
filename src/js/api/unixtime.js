import axios from './axios'

const unixTimeBaseUrl = 'https://showcase.api.linx.twenty57.net/UnixTime'

const get_currentDateTime_unixTimestamp = () => {
    return axios('get', `${unixTimeBaseUrl}/tounixtimestamp?datetime=now`)
}

const post_unixTimestampToDateTimeWithTimezone = (unixTimestampAndTimezone) => {
    return axios('post', `${unixTimeBaseUrl}/fromunixtimestamp`, unixTimestampAndTimezone)
}

export default {
    get_currentDateTime_unixTimestamp,
    post_unixTimestampToDateTimeWithTimezone,
}
