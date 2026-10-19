// Game board react components

import React, { useState, useEffect } from 'react';
import GameControlComponents from './GameControlComponents';
import CardComponents from './CardComponents';
import { Deck, Card, CardValue } from '../Deck';

// way to calculate value of hand while accomodating for ace case
function calculateTotalValueOfHand(hand: Card[], facedownCardCount: number = 0): number {
	let totalVal = 0, aceCount = 0

	hand.slice(0, hand.length - facedownCardCount).forEach(card => {
		// handle case of ace
		if (card.cardValue === CardValue.Ace) {
			aceCount += 1;
			totalVal += 11; // ace valued at 11 unless bust
		} else { totalVal += (card.cardValue >= 10 ? 10 : card.cardValue); }
	});

	// if bust, ace = 1
	while (totalVal>21 && aceCount>0) {
		totalVal -= 10; // ace valued at 1
		aceCount--;
	}
	return totalVal;
}

// handle the flow game played
// handle the gameboard
const GameBoardComponents = () => {
	const [deck, setDeck] = useState(new Deck());
	const [playersHand, setPlayersHand] = useState<Card[]>([]);
	const [dealersHand, setDealersHand] = useState<Card[]>([]);
	const [dealersFacedownCard, setDealersFacedownCard] = useState<Card | null>(null);
	const [gameStatus, setGameStatus] = useState('initial');	

	// start the game
	useEffect(() => {
		startANewGame();
	}, []);

	// start a new game to play(shuffle deck(in case), hand out hands)
	const startANewGame = () => {
		deck.shuffleDeck();
		// 2 cards to the dealer and player
		const initialCardsPlayersHand = [deck.drawCardFromDeck(), deck.drawCardFromDeck()].filter(Boolean) as Card[];
		const initialCardsDealersHand = [deck.drawCardFromDeck(), deck.drawCardFromDeck()].filter(Boolean) as Card[];
		setPlayersHand(initialCardsPlayersHand as Card[]);
		setDealersHand([initialCardsDealersHand[0]] as Card[]);
		// dealers 2nd card is facedown to player initially
		setTimeout(() => { setDealersHand(initialCardsDealersHand); }, 1000); 

		console.log(`Initial Player Score: ${calculateTotalValueOfHand(initialCardsPlayersHand)}`);
		console.log(`Initial Dealer Score(one f-d): ${calculateTotalValueOfHand([initialCardsDealersHand[0]])}`);
		// check for initial blackjacks(21)
		if (calculateTotalValueOfHand(initialCardsPlayersHand) === 21 && calculateTotalValueOfHand(initialCardsDealersHand) !== 21) {
			console.log("The Player hit a blackjack!!!");
			setGameStatus('Player blackjack');
			return; // game over
		}
		if (calculateTotalValueOfHand(initialCardsDealersHand) === 21) {
			console.log("The Dealer hit Blackjack!");
			setGameStatus('Dealer blackjack');
			if (calculateTotalValueOfHand(initialCardsPlayersHand) === 21) {
				console.log("The Dealer, and the Player have a blackjack. Push(tie)!");
				setGameStatus('Push');
			}
			return; // game over
		}
	};

	// when a player hits on their turn
	const handleCasePlayerHit = () => {
		// console.log("Player hit button clicked");
		const newDrawnCard = deck.drawCardFromDeck();
		if (newDrawnCard) {
			// console.log("Player hitting");
			const playersNewHand = [...playersHand, newDrawnCard];
			setPlayersHand(playersNewHand);
			const newPlayerTotalHandVal = calculateTotalValueOfHand(playersNewHand);
			// check if new hand = bust
			if (newPlayerTotalHandVal > 21) {
				console.log("The Player busted! With a total of: " + newPlayerTotalHandVal);
				setGameStatus('Player busted');
			}
		}
	};

	// when a player stands on their turn
	const handleCasePlayerStand = () => {
		console.log("The Player stands"); 
		setGameStatus('Player Stands');
		handleDealersTurn();
	};

	// handle dealers turn(reveal facedown, hit if < 17, stand if >= 17)
	const handleDealersTurn = () => {
		let dealerTotalVal = calculateTotalValueOfHand(dealersHand);
		while (dealerTotalVal < 17) {
			const newDrawnCard = deck.drawCardFromDeck();
			if (newDrawnCard) {
				dealersHand.push(newDrawnCard);
				dealerTotalVal = calculateTotalValueOfHand(dealersHand);
				// setDealersHand([...updatedDealersHand]);
			}
		}
		setDealersHand(dealersHand);
		console.log("The dealer stands");
		determineGamesOutcome();
	};

	// determine who won, lost, tied (outcome of the game played) (game states)
	const determineGamesOutcome = () => {
		const playersTotalVal = calculateTotalValueOfHand(playersHand);
		const dealersTotalVal = calculateTotalValueOfHand(dealersHand);

		if (playersTotalVal > 21) { 
			console.log("The Player busted. Game over. The Dealer wins!");
			setGameStatus('Player busted'); 
		}
		else if (dealersTotalVal > 21) { 
			console.log("The Dealer busted. Game Over. The Player wins!"); 
			setGameStatus('Dealer busted');
		}
		else if (playersTotalVal > dealersTotalVal) {
			console.log("The Player wins!");
			setGameStatus('Player wins'); 
	}
		else if (dealersTotalVal > playersTotalVal) { 
			console.log("The Dealer wins!"); 
			setGameStatus('Dealer wins');
		}
		// if none else, then push(tie)
		else { 
			console.log("Push (tie)!"); 
			setGameStatus('Push');
		}
	};

	const restartGameState = () => {
		setDeck(new Deck());
		startANewGame();
		setGameStatus('initial');
	};

	// represent
	// Citing https://www.altcademy.com/blog/how-to-center-text-in-reactjs/#:~:text=To%20center%20text%20horizontally%2C%20we,its%20value%20to%20%22center%22%20.&text=This%20will%20center%20the%20text,how%20wide%20the%20div%20is.
	  // helped figure out formatting for website text '<div style=>'
	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Kyle's Blackjack game</h1>
			{gameStatus != 'initial' && <h2>Game Over: {gameStatus}</h2>}
			<div>
				<h2>Player's Hand:</h2> 
				{playersHand.map((card, index) => <CardComponents key={`${card.displayCardValue}-${index}`} card={card} />)}
			</div>
			<div>
				<h2>The Dealer's Hand:</h2> 
				{dealersHand.map((card, index) => <CardComponents key={`${card.displayCardValue}-${index}`} card={card} />)}
				{dealersFacedownCard && !dealersHand.includes(dealersFacedownCard) && <div>*Dealer's Facedown Card*</div>}
			</div>
			<GameControlComponents 
				onHit={handleCasePlayerHit} 
				onStand={handleCasePlayerStand}
				isDisabled={gameStatus !== 'initial'}
				onRestart={restartGameState}
			/>
		</div>
	);
};

export default GameBoardComponents;
