import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, LogOut, BarChart3 } from "lucide-react";

import { type Card } from "./PlayingCard";
import Hand from "./Hand";
import GameControls from "./GameControls";
import GameStatus from "./GameStatus";
import AuthModal from "./AuthModal";
import UserProfile from "./UserProfile";
import {
    createDeck,
    calculateHandValue,
    isBlackjack,
    isBust,
    shouldDealerHit,
    determineWinner,
} from "../utils/gameLogic";

type GamePhase = "betting" | "dealing" | "player-turn" | "dealer-turn" | "game-over";

const BlackjackGame = () => {
    const [deck, setDeck] = useState<Card[]>([]);
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [dealerHand, setDealerHand] = useState<Card[]>([]);
    const [gamePhase, setGamePhase] = useState<GamePhase>("betting");
    const [gameMessage, setGameMessage] = useState("Welcome to BlackJack!");
    const [winner, setWinner] = useState<"player" | "dealer" | "push" | undefined>();
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);

    const [user, setUser] = useState<any>(null);
    const [accessToken, setAccessToken] = useState<string>("");
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [userStats, setUserStats] = useState<any>(null);

    useEffect(() => {
        checkExistingSession();
        startNewGame();
    }, []);

    const checkExistingSession = async () => {
        try {

        } catch (error) {
            console.error("Error checking session:", error);
        };
    };

    const fetchUserStats = async (token: string) => {
        try {

        } catch (error) {
            console.error("Error fetching user stats:", error);
        };
    };

    const recordGameResult = async (result: "player" | "dealer" | "push", playerCards: Card[], dealerCards: Card[]) => {
        if (!user || !accessToken) {
            return;
        };

        try {

        } catch (error) {
            console.error("Error recording game result:", error);
        };
    };

    const handleAuthSuccess = (authUser: any, token: string) => {
        setUser(authUser);
        setAccessToken(token);
        fetchUserStats(token);
    };

    const handleSignOut = async () => {
        try {

        } catch (error) {
            console.error("Error signing out:", error);
        };
    };

    const startNewGame = () => {
        const newDeck = createDeck();
        setDeck(newDeck);
        setPlayerHand([]);
        setDealerHand([]);
        setGamePhase("dealing");
        setGameMessage("Dealing cards...");
        setWinner(undefined);

        setTimeout(() => {
            const playerCards = [newDeck[0], newDeck[2]];
            const dealerCards = [newDeck[1], newDeck[3]];

            setPlayerHand(playerCards);
            setDealerHand(dealerCards);
            setDeck(newDeck.slice(4));

            const playerBJ = isBlackjack(playerCards);
            const dealerBJ = isBlackjack(dealerCards);

            if (playerBJ || dealerBJ) {
                setGamePhase("game-over");
                const result = determineWinner(playerCards, dealerCards);
                setWinner(result.winner);
                setGameMessage(result.message);
                updateScore(result.winner);
                recordGameResult(result.winner, playerCards, dealerCards);
            } else {
                setGamePhase("player-turn");
                setGameMessage("Your turn! Hit or Stand?");
            };
        }, 1000);
    };

    const updateScore = (gameWinner: "player" | "dealer" | "push") => {
        if (gameWinner === "player") {
            setPlayerScore(prev => prev + 1);
        } else if (gameWinner === "dealer") {
            setDealerScore(prev => prev + 1);
        };
    };

    const hit = () => {
        if (gamePhase !== "player-turn" || deck.length === 0) {
            return;
        };

        const newCard = deck[0];
        const newPlayerHand = [...playerHand, newCard];

        setPlayerHand(newPlayerHand);
        setDeck(deck.slice(1));

        if (isBust(newPlayerHand)) {
            setGamePhase("game-over");
            setWinner("dealer");
            setGameMessage("Bust! Dealer wins.");
            updateScore("dealer");
            recordGameResult("dealer", newPlayerHand, dealerHand);
        } else if (calculateHandValue(newPlayerHand).value === 21) {
            stand();
        };
    };

    const stand = () => {
        if (gamePhase !== "player-turn") {
            return;
        };

        setGamePhase("dealer-turn");
        setGameMessage("Dealer\'s turn...");

        setTimeout(() => {
            playDealerHand();
        }, 1000);
    };

    const playDealerHand = () => {
        let currentDealerHand = [...dealerHand];
        let currentDeck = [...deck];

        const dealerPlay = () => {
            if (shouldDealerHit(currentDealerHand) && currentDeck.length > 0) {
                const newCard = currentDeck[0];
                currentDealerHand = [...currentDealerHand, newCard];
                currentDeck = currentDeck.slice(1);

                setDealerHand([...currentDealerHand]);
                setDeck([...currentDeck]);

                if (!isBust(currentDealerHand)) {
                    setTimeout(dealerPlay, 1000);
                } else {
                    endGame(currentDealerHand);
                };
            } else {
                endGame(currentDealerHand);
            };
        };

        dealerPlay();
    };

    const endGame = (finalDealerHand: Card[]) => {
        const result = determineWinner(playerHand, finalDealerHand);
        setGamePhase("game-over");
        setWinner(result.winner);
        setGameMessage(result.message);
        updateScore(result.winner);
        recordGameResult(result.winner, playerHand, finalDealerHand);
    };

    const canHit = gamePhase === "player-turn" && !isBust(playerHand);
    const canStand = gamePhase === "player-turn";
    const isGameOver = gamePhase === "game-over";
    const hideFirstDealerCard = gamePhase !== "game-over";

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-900 flex flex-col">
            <div className="flex justify-between items-center p-4">
                <div className="flex items-center space-x-4">
                    <h1 className="text-white text-xl sm:text-2xl font-bold">♠️ BlackJack ♥️</h1>
                    {userStats && (
                        <div className="text-white text-sm bg-black/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
                            {userStats.totalChips} chips
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    {user ? (
                        <>
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm
                                    font-medium ring-offset-white transition-colors focus-visible:outline-none
                                    focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2
                                    disabled:pointer-events-none disabled:opacity-50 border border-white/20
                                    bg-white/10 text-white hover:bg-white/20 h-9 px-3"
                                onClick={() => setShowProfile(true)}
                            >
                                <BarChart3 className="mr-1" size={16} />
                                Stats
                            </button>
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm
                                    font-medium ring-offset-white transition-colors focus-visible:outline-none
                                    focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2
                                    disabled:pointer-events-none disabled:opacity-50 border border-white/20
                                    bg-white/10 text-white hover:bg-white/20 h-9 px-3"
                                onClick={handleSignOut}
                            >
                                <LogOut className="mr-1" size={16} />
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm
                                font-medium ring-offset-white transition-colors focus-visible:outline-none
                                focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2
                                disabled:pointer-events-none disabled:opacity-50 border border-white/20
                                bg-white/10 text-white hover:bg-white/20 h-9 px-3"
                            onClick={() => setShowAuthModal(true)}
                        >
                            <User className="mr-1" size={16} />
                            Sign In
                        </button>
                    )}
                </div>
            </div>
            <motion.div
                className="text-center px-4 pb-4"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex justify-center space-x-6 text-white">
                    <div className="bg-black/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
                        <div className="text-sm font-medium">You: {playerScore}</div>
                    </div>
                    <div className="bg-black/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
                        <div className="text-sm font-medium">Dealer: {dealerScore}</div>
                    </div>
                </div>
                {user && userStats && (
                    <div className="mt-2 text-white/80 text-sm">
                        Welcome back, {userStats.username}!
                        {userStats.currentStreak > 0 && (
                            <span className="text-yellow-300 ml-1">🔥 {userStats.currentStreak} win streak!</span>
                        )}
                    </div>
                )}
            </motion.div>
            <div className="flex-1 flex flex-col justify-between px-4 pb-4">
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Hand
                        cards={dealerHand}
                        isDealer={true}
                        hideFirstCard={hideFirstDealerCard}
                        title="Dealer"
                    />
                </motion.div>
                <div className="flex-1 flex flex-col justify-center items-center space-y-6 py-8">
                    <motion.div
                        className="bg-green-900/30 backdrop-blur-lg border-2 border-yellow-600/50 rounded-full
                            w-64 h-32 sm:w-80 sm:h-40 flex items-center justify-center shadow-2xl"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="text-yellow-600/30 text-4xl sm:text-6xl">♦ ♠</div>
                    </motion.div>
                    <GameStatus
                        message={gameMessage}
                        isGameOver={isGameOver}
                        winner={winner}
                    />
                    <GameControls
                        onHit={hit}
                        onStand={stand}
                        onNewGame={startNewGame}
                        canHit={canHit}
                        canStand={canStand}
                        gameOver={isGameOver}
                        isPlayerTurn={gamePhase === "player-turn"}
                    />
                </div>
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <Hand
                        cards={playerHand}
                        title="You"
                    />
                </motion.div>
            </div>
            <motion.div
                className="text-center text-white/70 text-xs px-4 pb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
            >
                <p>Get as close to 21 as possible without going over. {!user && "Sign in to track your stats!"}</p>
            </motion.div>
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onAuthSuccess={handleAuthSuccess}
            />
            {user && (
                <UserProfile
                    isOpen={showProfile}
                    onClose={() => setShowProfile(false)}
                    user={user}
                    accessToken={accessToken}
                />
            )}
        </div>
    );
};

export default BlackjackGame;