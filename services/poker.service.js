import { messeges } from '../../poker/common/messeges.js'
import { cardWeights } from '../common/card-weights.js'

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
    console.log(firstHand.toLowerCase().split(''))
    if (
        firstHand
            .toLowerCase()
            .split('')
            .every((i) => deck.includes(i)) ||
        secondHand
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

export function compareCards(firstHand, secondHand) {
    console.log(firstHand)
    console.log(secondHand)
    areCardsCorrect(firstHand, secondHand)

    firstHand = firstHand.toLowerCase()
    secondHand = secondHand.toLowerCase()

    const firstHandOccurencies = getMostFrequentCard(firstHand)
    const secondHandOccurencies = getMostFrequentCard(secondHand)

    // Jeśli ma więcej powtórzeń to bezapelacyjnie wygrywa
    if (firstHandOccurencies[0] > secondHandOccurencies[0]) {
        console.log('weszło w pierwszy wygrywa')
        console.log(messeges.firstWins)
        return messeges.firstWins
    } else if (firstHandOccurencies[0] < secondHandOccurencies[0]) {
        console.log('weszło w drugi wygrywa')
        console.log(messeges.secondWins)
        return messeges.secondWins
    }

    // Jeśli mają taki sam max powtórzeń - sprawdz kolejne kroki
    else {
        // Jeśli === 1 tzn ze kazda karta jest inna
        if (firstHandOccurencies[0] === 1) {
            console.log('weszlo w kazda karta inna == brak par')
            // dodatkowo - posortuj i sprawdź czy nie są takie same => wtedy remis
            if (sortCardsAlphabetically(firstHand) === sortCardsAlphabetically(secondHand)) {
                console.log('weszlo w remis')
                console.log(messeges.tie)
                return
            } else {
                console.log('weszlo w wybierz zwyciezce')
                // zsumuj wagi kart i wybierz zwycięzcę
                return countCardsWeight(firstHand) > countCardsWeight(secondHand) ? messeges.firstWins : messeges.secondWins
            }
        }
        // Jeśli co najmniej jedna para - dwa przypadki,
        // - sprawdz wagi i jeśli równe usun
        // - sprawdz wagi i daj potencjalną wygrana bool, usun i sprawdz czy kolejne karty maja pary
        if (firstHandOccurencies[0] > 1) {
            // czy figura z parami jest większa
            if (cardWeights[firstHandOccurencies[1]] === cardWeights[secondHandOccurencies[1]]) {
                console.log('weszlo w taka sama pare')
                const restFirst = removeCards(firstHand, firstHandOccurencies[1])
                const restSecond = removeCards(secondHand, secondHandOccurencies[1])
                const firstRestOccurencies = getMostFrequentCard(restFirst)
                const secondRestOccurencies = getMostFrequentCard(restSecond)

                // jeśli nie ma juz wiecej par sprawdz ich wagi i wyłoń zwycięzcę
                if (firstRestOccurencies[0] === 1 && secondRestOccurencies[0] === 1) return countCardsWeight(restFirst) > countCardsWeight(restSecond) ? messeges.firstWins : messeges.secondWins
                else {
                    console.log('weszlo w dwa razy dwie pary albo w fulla')
                    return
                }
                console.log(getMostFrequentCard(restFirst))
                console.log(getMostFrequentCard(restSecond))
                // po usunięciu sprawdz czy pozostałe karty mają powtórzenia i wyłoń zwycięzcę...
                // ... TODO
            } else {
                console.log('weszlo w takie same ilosci ale rozne nominały')
                return cardWeights[firstHandOccurencies[1]] > cardWeights[secondHandOccurencies[1]] ? console.log(messeges.firstWins) : console.log(messeges.secondWins)
            }
        }
    }
}

export default {
    getMostFrequentCard,
    removeCards,
    countCardsWeight,
    sortCardsAlphabetically,
    compareCards,
}
