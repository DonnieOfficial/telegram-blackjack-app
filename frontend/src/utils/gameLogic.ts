import { type Card } from "../components/PlayingCard";

export const createDeck = (): Card[] => {
    const suits: Card["suit"][] = ["hearts", "diamonds", "clubs", "spades"];
    const ranks: Card["rank"][] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const deck: Card[] = [];

    for (const suit of suits) {
        for (const rank of ranks) {
            let value: number;
            if (rank === "A") {
                value = 11;
            } else if (["J", "Q", "K"].includes(rank)) {
                value = 10;
            } else {
                value = parseInt(rank);
            }

            deck.push({ suit, rank, value });
        }
    }

    return shuffleDeck(deck);
};

export const shuffleDeck = (deck: Card[]): Card[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export const calculateHandValue = (hand: Card[]): { value: number; isSoft: boolean } => {
    let value = 0;
    let aces = 0;

    for (const card of hand) {
        if (card.rank === "A") {
            aces++;
            value += 11;
        } else {
            value += card.value;
        }
    }

    while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
    }

    const isSoft = aces > 0 && value <= 21;

    return { value, isSoft };
};

export const isBlackjack = (hand: Card[]): boolean => {
    if (hand.length !== 2) {
        return false;
    };

    const { value } = calculateHandValue(hand);
    return value === 21;
};

export const isBust = (hand: Card[]): boolean => {
    const { value } = calculateHandValue(hand);
    return value > 21;
};

export const shouldDealerHit = (dealerHand: Card[]): boolean => {
    const { value, isSoft } = calculateHandValue(dealerHand);

    if (value < 17) {
        return true;
    };

    if (value === 17 && isSoft) {
        return true;
    };

    return false;
};

export const determineWinner = (playerHand: Card[], dealerHand: Card[]): {
    winner: "player" | "dealer" | "push";
    message: string;
} => {
    const playerValue = calculateHandValue(playerHand).value;
    const dealerValue = calculateHandValue(dealerHand).value;

    const playerBust = isBust(playerHand);
    const dealerBust = isBust(dealerHand);
    const playerBlackjack = isBlackjack(playerHand);
    const dealerBlackjack = isBlackjack(dealerHand);

    if (playerBust) {
        return { winner: "dealer", message: "Player busts! Dealer wins." };
    };

    if (dealerBust) {
        return { winner: "player", message: "Dealer busts! Player wins." };
    };

    if (playerBlackjack && dealerBlackjack) {
        return { winner: "push", message: "Both have BlackJack! Push." };
    };

    if (playerBlackjack) {
        return { winner: "player", message: "BlackJack! Player wins!" };
    };

    if (dealerBlackjack) {
        return { winner: "dealer", message: "Dealer has BlackJack!" };
    };

    if (playerValue > dealerValue) {
        return { winner: "player", message: "Player wins!" };
    };

    if (dealerValue > playerValue) {
        return { winner: "dealer", message: "Dealer wins!" };
    };

    return { winner: "push", message: "Push! It\'s a tie." };
};