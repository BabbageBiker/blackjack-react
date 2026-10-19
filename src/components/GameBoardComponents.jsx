"use strict";
// Game board react components
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const GameControlComponents_1 = __importDefault(require("./GameControlComponents"));
const CardComponents_1 = __importDefault(require("./CardComponents"));
const Deck_1 = require("../Deck");
// way to calculate value of hand while accomodating for ace case
function calculateTotalValueOfHand(hand, facedownCardCount = 0) {
    let totalVal = 0, aceCount = 0;
    hand.slice(0, hand.length - facedownCardCount).forEach(card => {
        // handle case of ace
        if (card.cardValue === Deck_1.CardValue.Ace) {
            aceCount += 1;
            totalVal += 11; // ace valued at 11 unless bust
        }
        else {
            totalVal += (card.cardValue >= 10 ? 10 : card.cardValue);
        }
    });
    // if bust, ace = 1
    while (totalVal > 21 && aceCount > 0) {
        totalVal -= 10; // ace valued at 1
        aceCount--;
    }
    return totalVal;
}
// handle the flow game played
// handle the gameboard
const GameBoardComponents = () => {
    const [deck, setDeck] = (0, react_1.useState)(new Deck_1.Deck());
    const [playersHand, setPlayersHand] = (0, react_1.useState)([]);
    const [dealersHand, setDealersHand] = (0, react_1.useState)([]);
    const [dealersFacedownCard, setDealersFacedownCard] = (0, react_1.useState)(null);
    const [gameStatus, setGameStatus] = (0, react_1.useState)('initial');
    // start the game
    (0, react_1.useEffect)(() => {
        startANewGame();
    }, []);
    // start a new game to play(shuffle deck(in case), hand out hands)
    const startANewGame = () => {
        deck.shuffleDeck();
        // 2 cards to the dealer and player
        const initialCardsPlayersHand = [deck.drawCardFromDeck(), deck.drawCardFromDeck()].filter(Boolean);
        const initialCardsDealersHand = [deck.drawCardFromDeck(), deck.drawCardFromDeck()].filter(Boolean);
        setPlayersHand(initialCardsPlayersHand);
        setDealersHand([initialCardsDealersHand[0]]);
        // dealers 2nd card is facedown to player initially
        setTimeout(() => { setDealersHand(initialCardsDealersHand); }, 1000);
        // const playersTotalVal = calculateTotalValueOfHand(initialCardsPlayersHand);
        // const dealersTotalVal = calculateTotalValueOfHand(initialCardsDealersHand);
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
                // handleDealersTurn();
                // reveal card, but no dealer turn?
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
        // const updatedDealersHand = [...dealersHand, dealersFacedownCard].filter(Boolean);
        // setDealersHand(updatedDealersHand);
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
        setDeck(new Deck_1.Deck());
        startANewGame();
        setGameStatus('initial');
    };
    // represent
    // Citing https://www.altcademy.com/blog/how-to-center-text-in-reactjs/#:~:text=To%20center%20text%20horizontally%2C%20we,its%20value%20to%20%22center%22%20.&text=This%20will%20center%20the%20text,how%20wide%20the%20div%20is.
    // helped figure out formatting for website text '<div style=>'
    return (<div>
			<h1 style={{ textAlign: 'center' }}>Kyle's Blackjack game</h1>
			{gameStatus != 'initial' && <h2>Game Over: {gameStatus}</h2>}
			<div>
				<h2>Player's Hand:</h2> 
				{playersHand.map((card, index) => <CardComponents_1.default key={`${card.displayCardValue}-${index}`} card={card}/>)}
			</div>
			<div>
				<h2>The Dealer's Hand:</h2> 
				{dealersHand.map((card, index) => <CardComponents_1.default key={`${card.displayCardValue}-${index}`} card={card}/>)}
				{dealersFacedownCard && !dealersHand.includes(dealersFacedownCard) && <div>*Dealer's Facedown Card*</div>}
			</div>
			<GameControlComponents_1.default onHit={handleCasePlayerHit} onStand={handleCasePlayerStand} isDisabled={gameStatus !== 'initial'} onRestart={restartGameState}/>
		</div>);
};
exports.default = GameBoardComponents;
