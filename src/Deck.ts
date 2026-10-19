// models, deck class for game

// card suits for representing cards
export enum CardSuit {
	Hearts, Diamonds, Spades, Clubs
}

// what each rank of card is valued at (for representing cards/logic)
export enum CardValue {
	Ace = 1, // ace is initially 1
	Two = 2, Three = 3, Four = 4, Five = 5,
	Six = 6, Seven = 7, Eight = 8, Nine = 9, Ten = 10,
	Jack = 10, Queen = 10, King = 10
}

// Card class for representing cards, based off of enum's
export class Card {
	constructor(public cardValue: CardValue, public cardSuit: CardSuit) { }
	// display(represent) card
	get displayCardValue(): string {
		return `${CardValue[this.cardValue]} of ${CardSuit[this.cardSuit]}`;
	}

	// get the value of a card, 
	  // ace initially 1 (handle ace case in GameBoardComponents)
	get value(): number {
		if ([CardValue.Jack, CardValue.Queen, CardValue.King].includes(this.cardValue)) {
			return 10; // face cards = 10
		// else num card = num (ace initially treated as 1)
		} else { return this.cardValue; }
	}

}

// Deck class for handling the deck of cards(initalizing, shuffling)
export class Deck {
	private deckCards: Card[] = []; // initially empty

	constructor() { this.initalizeDeckStart(); }

	private initalizeDeckStart() {

		Object.values(CardSuit).filter(v => !isNaN(Number(v))).forEach(suit => {
			Object.values(CardValue).filter(v => !isNaN(Number(v))).forEach(value => {
				this.deckCards.push(new Card(value as CardValue, suit as CardSuit));
			}
			);
		}
		);
		this.shuffleDeck();
	}

	shuffleDeck() {
		// shuffle method(swap with randI)
		for (let index = this.deckCards.length-1; index>0; index--) {
			const randI = Math.floor(Math.random() * (index+1));
			[this.deckCards[index], this.deckCards[randI]] = [this.deckCards[randI], this.deckCards[index]];
		}
	}

	drawCardFromDeck(): Card | undefined {
		return this.deckCards.pop();
	}

}
