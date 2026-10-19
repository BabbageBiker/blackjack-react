"use strict";
// models, deck class for game
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = exports.Card = exports.CardValue = exports.CardSuit = void 0;
// card suits for representing cards
var CardSuit;
(function (CardSuit) {
    CardSuit[CardSuit["Hearts"] = 0] = "Hearts";
    CardSuit[CardSuit["Diamonds"] = 1] = "Diamonds";
    CardSuit[CardSuit["Spades"] = 2] = "Spades";
    CardSuit[CardSuit["Clubs"] = 3] = "Clubs";
})(CardSuit || (exports.CardSuit = CardSuit = {}));
// what each rank of card is valued at (for representing cards/logic)
var CardValue;
(function (CardValue) {
    CardValue[CardValue["Ace"] = 1] = "Ace";
    CardValue[CardValue["Two"] = 2] = "Two";
    CardValue[CardValue["Three"] = 3] = "Three";
    CardValue[CardValue["Four"] = 4] = "Four";
    CardValue[CardValue["Five"] = 5] = "Five";
    CardValue[CardValue["Six"] = 6] = "Six";
    CardValue[CardValue["Seven"] = 7] = "Seven";
    CardValue[CardValue["Eight"] = 8] = "Eight";
    CardValue[CardValue["Nine"] = 9] = "Nine";
    CardValue[CardValue["Ten"] = 10] = "Ten";
    CardValue[CardValue["Jack"] = 10] = "Jack";
    CardValue[CardValue["Queen"] = 10] = "Queen";
    CardValue[CardValue["King"] = 10] = "King";
})(CardValue || (exports.CardValue = CardValue = {}));
// Card class for representing cards, based off of enum's
class Card {
    constructor(cardValue, cardSuit) {
        this.cardValue = cardValue;
        this.cardSuit = cardSuit;
    }
    // display(represent) card
    get displayCardValue() {
        return `${CardValue[this.cardValue]} of ${CardSuit[this.cardSuit]}`;
    }
    // get the value of a card, 
    // ace initially 1 (handle ace case in GameBoardComponents)
    get value() {
        if ([CardValue.Jack, CardValue.Queen, CardValue.King].includes(this.cardValue)) {
            return 10; // face cards = 10
            // else num card = num (ace initially treated as 1)
        }
        else {
            return this.cardValue;
        }
    }
}
exports.Card = Card;
// Deck class for handling the deck of cards(initalizing, shuffling)
class Deck {
    constructor() {
        this.deckCards = []; // initially empty
        this.initalizeDeckStart();
    }
    initalizeDeckStart() {
        Object.values(CardSuit).filter(v => !isNaN(Number(v))).forEach(suit => {
            Object.values(CardValue).filter(v => !isNaN(Number(v))).forEach(value => {
                this.deckCards.push(new Card(value, suit));
            });
        });
        this.shuffleDeck();
    }
    shuffleDeck() {
        // shuffle method(swap with randI)
        for (let index = this.deckCards.length - 1; index > 0; index--) {
            const randI = Math.floor(Math.random() * (index + 1));
            [this.deckCards[index], this.deckCards[randI]] = [this.deckCards[randI], this.deckCards[index]];
        }
    }
    drawCardFromDeck() {
        return this.deckCards.pop();
    }
}
exports.Deck = Deck;
