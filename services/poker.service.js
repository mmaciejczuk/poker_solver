import { messages } from '../common/messages.js'
import { cardWeights } from '../common/card-weights.js'

export function removeCards(cards, cardToRemove) {
    return cards.split(cardToRemove).join('')
}

export function countCardsWeight(cards) {
    return cards
        .split('')
        .map((card) => {
            return cardWeights[card]
        })
        .reduce((a, b) => a + b, 0)
}

export function areCardsCorrect(firstHand, secondHand) {
    let deck = Object.keys(cardWeights)
    if (!firstHand || !secondHand) throw new Error('The program takes two arguments.')
    if (
        !firstHand
            .toLowerCase()
            .split('')
            .every((i) => deck.includes(i)) ||
        !secondHand
            .toLowerCase()
            .split('')
            .every((i) => deck.includes(i)) ||
        firstHand.length !== 5 ||
        secondHand.length !== 5
    )
        throw new Error('Invalid format of arguments.')
    else return
}

export function sortCardsAlphabetically(cards) {
    return cards.split('').sort().join('')
}

export function generateResult(message) {
    console.log(message)
    return message
}

export function getMostFrequentCard(str) {
    let maxChar = ''
    let quantity = 0
    str.split('').forEach(function (char) {
        if (str.split(char).length > quantity) {
            quantity = str.split(char).length - 1
            maxChar = char
        }
    })
    return [quantity, maxChar]
}

export function compareCards(firstHand, secondHand) {
    areCardsCorrect(firstHand, secondHand)

    firstHand = firstHand.toLowerCase()
    secondHand = secondHand.toLowerCase()

    const firstHandOccurencies = getMostFrequentCard(firstHand)
    const secondHandOccurencies = getMostFrequentCard(secondHand)

    if (sortCardsAlphabetically(firstHand) === sortCardsAlphabetically(secondHand)) {
        return generateResult(messages.tie)
    } else if (firstHandOccurencies[0] > secondHandOccurencies[0]) {
        return generateResult(messages.firstWins)
    } else if (firstHandOccurencies[0] < secondHandOccurencies[0]) {
        return generateResult(messages.secondWins)
    } else {
        const restFirst = removeCards(firstHand, firstHandOccurencies[1])
        const restSecond = removeCards(secondHand, secondHandOccurencies[1])
        const firstRestOccurencies = getMostFrequentCard(restFirst)
        const secondRestOccurencies = getMostFrequentCard(restSecond)
        const firstPairsWeight = cardWeights[firstHandOccurencies[1]]
        const secondPairsWeight = cardWeights[secondHandOccurencies[1]]

        if (firstPairsWeight === secondPairsWeight) {
            if (firstRestOccurencies[0] === 1 && secondRestOccurencies[0] === 1) {
                return countCardsWeight(restFirst) > countCardsWeight(restSecond) ? generateResult(messages.firstWins) : generateResult(messages.secondWins)
            } else if (countCardsWeight(firstRestOccurencies[1]) === countCardsWeight(secondRestOccurencies[1])) {
                const firsthandWeight = countCardsWeight(removeCards(restFirst, firstRestOccurencies[1]))
                const secondHandWeight = countCardsWeight(removeCards(restSecond, secondRestOccurencies[1]))
                return firsthandWeight > secondHandWeight ? generateResult(messages.firstWins) : generateResult(messages.secondWins)
            }
        } else {
            if (firstRestOccurencies[0] === secondRestOccurencies[0]) return firstPairsWeight > secondPairsWeight ? generateResult(messages.firstWins) : generateResult(messages.secondWins)
            else return firstRestOccurencies[0] > secondRestOccurencies[0] ? generateResult(messages.firstWins) : generateResult(messages.secondWins)
        }
    }
}

export default {
    compareCards,
}
