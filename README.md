# Blackjack in React

A browser-based Blackjack game built in React and TypeScript. Play against a dealer that follows standard casino rules, with hit, stand, and restart controls driving the game state.

Built for CS-224 (Programming Tools) as the final project in a sequence that started with a text-based version of the same game.

## How it works

**Game model** (`src/Deck.ts`) is plain TypeScript with no React in it. `CardSuit` and `CardValue` are enums, `Card` wraps a suit and rank and exposes its point value, and `Deck` builds a full 52-card deck, shuffles it, and deals. Keeping the model independent of the view meant the same logic could carry over from the earlier console version of the game.

**Shuffling** uses Fisher-Yates, walking the deck backwards and swapping each card with a randomly chosen earlier one. It produces a uniform shuffle in a single pass, unlike the common approach of sorting with a random comparator, which doesn't.

**Components** are split by responsibility:

- `GameBoardComponents.tsx` holds all game state and the rules, and renders the table
- `CardComponents.tsx` renders a single card
- `GameControlComponents.tsx` renders the Hit, Stand, and Restart buttons

The board owns the state and passes callbacks down to the controls as props, so the buttons stay presentational and don't know anything about the game rules. Props are typed through interfaces on both child components.

**State** lives in React hooks on the board: the deck, both hands, and a status string tracking whether the round is in progress or how it ended. A `useEffect` deals the opening hands on mount.

## Scoring aces

The interesting part of Blackjack scoring is that an ace is worth 11 or 1 depending on the rest of the hand, and a hand can hold more than one.

`calculateTotalValueOfHand` handles this by counting every ace as 11 on the first pass, tracking how many there were, then demoting them one at a time (subtracting 10 each) while the total is over 21 and aces remain. A hand of ace, ace, nine scores 21 rather than busting, because the first ace stays high and the second drops to 1.

The dealer follows the standard rule: hit below 17, stand at 17 or above.

## Running it

```bash
npm install
npm start
```

Opens on `localhost:3000`. Built with Create React App (`react-scripts`).

## Stack

React 18, TypeScript, Create React App

## What I would do differently

This was an early project, and a few things stand out looking back.

The dealer's turn mutates the hand array directly before calling the setter, which means React sees the same array reference and doesn't reliably re-render. The fix is to build a new array and set that. Restarting has a related issue: it creates a new deck and immediately deals from the old one, because state updates don't apply synchronously.

There's also a half-finished facedown-card feature: the state exists but is never populated, so the dealer's hole card is revealed on a timer instead.

Since writing this I'd also reach for Vite rather than Create React App, which the React team has moved away from recommending.
