import { compareCards } from '../poker/services/poker.service'
import { messeges } from '../poker/common/messeges'

test('Properly compare two poker hands with cards', () => {
    expect(compareCards('KTQTT', 'AAQQT')).toBe(messeges.firstWins)
    expect(compareCards('AKKAA', '222T2')).toBe(messeges.secondWins)
    expect(compareCards('A3A46', 'K32KT')).toBe(messeges.firstWins)
    expect(compareCards('A3A46', '258AA')).toBe(messeges.secondWins)
    expect(compareCards('TA982', '98TA2')).toBe(messeges.tie)
    expect(compareCards('32233', 'A4A5A')).toBe(messeges.firstWins)
})

test('Throws an error when wrong number of arguments', () => {})

test('Throws an error when wrong format of the arguments', () => {})
