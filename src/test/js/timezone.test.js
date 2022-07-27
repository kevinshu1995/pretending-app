import timezone from '@/js/utils/timezone.js'
import { expect, test } from '@jest/globals'

test('GMT matching!', () => {
    const no_GMT = 'Asia/Urumqi'
    const with_GMT = 'Etc/GMT-6'

    expect(timezone.matchName_without_GMT(no_GMT)).toEqual(
        expect.arrayContaining(['Asia/', 'Asia'])
    )
    expect(timezone.matchName_without_GMT(with_GMT)).toEqual(expect.arrayContaining([]))
})

test('Filter slash in string!', () => {
    const utcName = 'Africa/Abidjan'

    expect(timezone.filtered_slash(utcName)).toBe('Abidjan')
})
