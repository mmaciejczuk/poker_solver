import { compareCards } from './services/poker.service.js';
import { messages } from './common/messages.js';

test('Properly compare two poker hands with cards', () => {
    expect(compareCards('33225', '33225')).toBe(messages.tie);
    expect(compareCards('KTQTT', 'AAQQT')).toBe(messages.firstWins);
    expect(compareCards('AKKAA', '222T2')).toBe(messages.secondWins);
    expect(compareCards('A3A46', 'K32KT')).toBe(messages.firstWins);
    expect(compareCards('A3A46', '258AA')).toBe(messages.secondWins);
    expect(compareCards('TA982', '98TA2')).toBe(messages.tie);
    expect(compareCards('33245', '33267')).toBe(messages.secondWins);
    expect(compareCards('33267', '33245')).toBe(messages.firstWins);
    expect(compareCards('33225', '33226')).toBe(messages.secondWins);
    expect(compareCards('32233', 'A4A5A')).toBe(messages.firstWins);
});
