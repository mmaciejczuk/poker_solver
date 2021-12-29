import { messages } from '../common/messages.js';
import { cardWeights } from '../common/card-weights.js';

export function removeCards(cards, cardToRemove) {
    return cards.split(cardToRemove).join('');
}

export function countCardsWeight(cards) {
    return cards
        .split('')
        .map((card) => cardWeights[card])
        .reduce((a, b) => a + b, 0);
}

export function areCardsCorrect(firstHand, secondHand) {
    const deck = Object.keys(cardWeights);
    if (!firstHand || !secondHand) throw new Error('The program takes two arguments.');
    else if (
        !firstHand
            .toLowerCase()
            .split('')
            .every((i) => deck.includes(i))
        || !secondHand
            .toLowerCase()
            .split('')
            .every((i) => deck.includes(i))
        || firstHand.length !== 5
        || secondHand.length !== 5
    ) throw new Error('Invalid format of arguments.');
}

export function sortCardsAlphabetically(cards) {
    return cards.split('').sort().join('');
}

export function generateResult(message) {
    console.log(message);
    return message;
}

export function getMostFrequentCard(str) {
    let maxChar = '';
    let quantity = 0;
    str.split('').forEach((char) => {
        if (str.split(char).length > quantity) {
            quantity = str.split(char).length - 1;
            maxChar = char;
        }
    });
    return [quantity, maxChar];
}

// eslint-disable-next-line consistent-return
export function compareCards(firstHand, secondHand) {
    areCardsCorrect(firstHand, secondHand);

    const firstHandToLower = firstHand.toLowerCase();
    const secondHandToLower = secondHand.toLowerCase();

    const firstHandOccurencies = getMostFrequentCard(firstHandToLower);
    const secondHandOccurencies = getMostFrequentCard(secondHandToLower);

    if (sortCardsAlphabetically(firstHandToLower) === sortCardsAlphabetically(secondHandToLower)) {
        return generateResult(messages.tie);
    }
    if (firstHandOccurencies[0] > secondHandOccurencies[0]) {
        return generateResult(messages.firstWins);
    }
    if (firstHandOccurencies[0] < secondHandOccurencies[0]) {
        return generateResult(messages.secondWins);
    }
    const restFirst = removeCards(firstHandToLower, firstHandOccurencies[1]);
    const restSecond = removeCards(secondHandToLower, secondHandOccurencies[1]);
    const firstRestOccurencies = getMostFrequentCard(restFirst);
    const secondRestOccurencies = getMostFrequentCard(restSecond);
    const firstPairsWeight = cardWeights[firstHandOccurencies[1]];
    const secondPairsWeight = cardWeights[secondHandOccurencies[1]];

    if (firstPairsWeight === secondPairsWeight) {
        if (firstRestOccurencies[0] === 1 && secondRestOccurencies[0] === 1) {
            return countCardsWeight(restFirst) > countCardsWeight(restSecond) ? generateResult(messages.firstWins) : generateResult(messages.secondWins);
        }
        if (countCardsWeight(firstRestOccurencies[1]) === countCardsWeight(secondRestOccurencies[1])) {
            return countCardsWeight(restFirst) > countCardsWeight(restSecond) ? generateResult(messages.firstWins) : generateResult(messages.secondWins);
        }
    } else {
        if (firstRestOccurencies[0] === secondRestOccurencies[0]) return firstPairsWeight > secondPairsWeight ? generateResult(messages.firstWins) : generateResult(messages.secondWins);
        return firstRestOccurencies[0] > secondRestOccurencies[0] ? generateResult(messages.firstWins) : generateResult(messages.secondWins);
    }
}

export default {
    compareCards,
};
