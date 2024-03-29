import dealData from '@/js/utils/dealData.js'
import { expect, test } from '@jest/globals'

test('Sort array by name!', () => {
    const arrayInput = [
        {
            name: 'John',
        },
        {
            name: 'Alice',
        },
    ]
    const expectReturn = [
        {
            name: 'Alice',
        },
        {
            name: 'John',
        },
    ]
    expect(dealData.arraySortByKey(arrayInput, 'name')).toMatchObject(expectReturn)
})

test('Find object by specific key!', () => {
    const arrayInput = [
        {
            zoneAbbr: 'TAT',
        },
        {
            zoneAbbr: 'CAST',
        },
        {
            zoneAbbr: 'QQ',
        },
    ]
    const expectReturn = {
        zoneAbbr: 'CAST',
    }
    expect(dealData.findKeyByValue(arrayInput, 'zoneAbbr', 'CAST')).toMatchObject(expectReturn)
})
