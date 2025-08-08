import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, TrendingUp, Star, Target, History, Award, X } from "lucide-react";

interface UserProfileProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
    accessToken: string;
};

interface UserStats {
    userId: string;
    username: string;
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    gamesPush: number;
    blackjacks: number;
    currentStreak: number;
    bestStreak: number;
    totalChips: number;
    lastPlayed: string;
};

interface GameRecord {
    result: "player" | "dealer" | "push";
    isBlackjack: boolean;
    timestamp: string;
};

interface LeaderboardEntry {
    rank: number;
    username: string;
    value: number;
    gamesPlayed: number;
};

const UserProfile = ({ isOpen, onClose, user, accessToken }: UserProfileProps) => {
    const [stats, setStats] = useState<UserStats | null>(null);
    const [gameHistory, setGameHistory] = useState<GameRecord[]>([]);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [selectedLeaderboard, setSelectedLeaderboard] = useState("wins");
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"stats" | "history" | "leaderboard">("stats");

    useEffect(() => {
        if (isOpen && user && accessToken) {
            fetchUserData();
        };
    }, [isOpen, user, accessToken]);

    const fetchUserData = async () => {
        try {

        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setIsLoading(false);
        };
    };

    const fetchLeaderboard = async (category: string) => {
        try {

        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        };
    };

    const handleLeaderboardChange = (category: string) => {
        setSelectedLeaderboard(category);
        fetchLeaderboard(category);
    };

    const getWinRate = () => {
        if (!stats || stats.gamesPlayed === 0) {
            return 0;
        };

        return Math.round((stats.gamesWon / stats.gamesPlayed) * 100);
    };

    const getResultIcon = (result: string, isBlackjack: boolean) => {
        if (result === "player") {
            return isBlackjack ? "🃏" : "✅";
        } else if (result === "dealer") {
            return "❌";
        } else {
            return "🤝";
        };
    };

    const getResultText = (result: string, isBlackjack: boolean) => {
        if (result === "player") {
            return isBlackjack ? "BlackJack Win!" : "Won";
        } else if (result === "dealer") {
            return "Lost";
        } else {
            return "Push";
        };
    };

    if (!isOpen) {
        return null;
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="rounded-lg border border-slate-200 bg-white/95 backdrop-blur-sm text-slate-950 shadow-lg">
                        <div className="flex flex-col space-y-1.5 p-6 text-center relative">
                            <button
                                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity
                                    hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                                onClick={onClose}
                            >
                                <X className="h-4 w-4" />
                            </button>
                            <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center justify-center gap-2">
                                <Trophy className="text-yellow-500" />
                                {stats?.username || "Player"}'s Profile
                            </h3>
                            <p className="text-sm text-slate-500">Your BlackJack statistics and achievements</p>
                        </div>
                        <div className="p-6 pt-0">
                            {isLoading ? (
                                <div className="text-center py-8">Loading...</div>
                            ) : (
                                <div className="w-full">
                                    <div className="inline-flex h-10 items-center justify-center rounded-md
                                        bg-slate-100 p-1 text-slate-500 w-full">
                                        <button
                                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm
                                                px-3 py-1.5 text-sm font-medium ring-offset-white transition-all
                                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950
                                                focus-visible:ring-offset-2 disabled:pointer-events-none
                                                disabled:opacity-50 flex-1 ${activeTab === "stats"
                                                    ? "bg-white text-slate-950 shadow-sm"
                                                    : ""
                                                }`}
                                            onClick={() => setActiveTab("stats")}
                                        >
                                            Statistics
                                        </button>
                                        <button
                                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm
                                                px-3 py-1.5 text-sm font-medium ring-offset-white transition-all
                                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950
                                                focus-visible:ring-offset-2 disabled:pointer-events-none
                                                disabled:opacity-50 flex-1 ${activeTab === "history"
                                                    ? "bg-white text-slate-950 shadow-sm"
                                                    : ""
                                                }`}
                                            onClick={() => setActiveTab("history")}
                                        >
                                            Game History
                                        </button>
                                        <button
                                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm
                                                px-3 py-1.5 text-sm font-medium ring-offset-white transition-all
                                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950
                                                focus-visible:ring-offset-2 disabled:pointer-events-none
                                                disabled:opacity-50 flex-1 ${activeTab === "leaderboard"
                                                    ? "bg-white text-slate-950 shadow-sm"
                                                    : ""
                                                }`}
                                            onClick={() => setActiveTab("leaderboard")}
                                        >
                                            Leaderboard
                                        </button>
                                    </div>
                                    <div className="mt-6">
                                        {activeTab === "stats" && stats && (
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                    <div className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm">
                                                        <div className="p-4 text-center">
                                                            <div className="text-2xl font-bold text-blue-600">{stats.gamesPlayed}</div>
                                                            <div className="text-sm text-gray-600">Games Played</div>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm">
                                                        <div className="p-4 text-center">
                                                            <div className="text-2xl font-bold text-green-600">{stats.gamesWon}</div>
                                                            <div className="text-sm text-gray-600">Games Won</div>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm">
                                                        <div className="p-4 text-center">
                                                            <div className="text-2xl font-bold text-purple-600">{getWinRate()}%</div>
                                                            <div className="text-sm text-gray-600">Win Rate</div>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm">
                                                        <div className="p-4 text-center">
                                                            <div className="text-2xl font-bold text-yellow-600">{stats.totalChips}</div>
                                                            <div className="text-sm text-gray-600">Total Chips</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                    <div className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm">
                                                        <div className="p-4 flex items-center gap-3">
                                                            <Star className="text-yellow-500" size={24} />
                                                            <div>
                                                                <div className="font-bold">{stats.blackjacks}</div>
                                                                <div className="text-sm text-gray-600">BlackJacks</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm">
                                                        <div className="p-4 flex items-center gap-3">
                                                            <TrendingUp className="text-green-500" size={24} />
                                                            <div>
                                                                <div className="font-bold">{stats.currentStreak}</div>
                                                                <div className="text-sm text-gray-600">Current Streak</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm">
                                                        <div className="p-4 flex items-center gap-3">
                                                            <Target className="text-red-500" size={24} />
                                                            <div>
                                                                <div className="font-bold">{stats.bestStreak}</div>
                                                                <div className="text-sm text-gray-600">Best Streak</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                                        <Award className="text-yellow-500" />
                                                        Achievements
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {stats.gamesPlayed >= 10 && (
                                                            <div className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 bg-slate-100 text-slate-900 hover:bg-slate-100/80">
                                                                Experienced Player (10+ games)
                                                            </div>
                                                        )}
                                                        {stats.bestStreak >= 5 && (
                                                            <div className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 bg-slate-100 text-slate-900 hover:bg-slate-100/80">
                                                                Hot Streak (5+ wins in a row)
                                                            </div>
                                                        )}
                                                        {stats.blackjacks >= 5 && (
                                                            <div className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 bg-slate-100 text-slate-900 hover:bg-slate-100/80">
                                                                BlackJack Master (5+ BlackJacks)
                                                            </div>
                                                        )}
                                                        {getWinRate() >= 60 && stats.gamesPlayed >= 20 && (
                                                            <div className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 bg-slate-100 text-slate-900 hover:bg-slate-100/80">
                                                                High Roller (60%+ win rate)
                                                            </div>
                                                        )}
                                                        {stats.totalChips >= 2000 && (
                                                            <div className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 bg-slate-100 text-slate-900 hover:bg-slate-100/80">
                                                                Chip Collector (2000+ chips)
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {activeTab === "history" && (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <History size={20} />
                                                    <h3 className="text-lg font-semibold">Recent Games</h3>
                                                </div>
                                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                                    {gameHistory.length === 0 ? (
                                                        <div className="text-center text-gray-500 py-8">No games played yet</div>
                                                    ) : (
                                                        gameHistory.map((game, index) => (
                                                            <div key={index} className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm">
                                                                <div className="p-3 flex items-center justify-between">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-xl">{getResultIcon(game.result, game.isBlackjack)}</div>
                                                                        <div>
                                                                            <div className="font-medium">{getResultText(game.result, game.isBlackjack)}</div>
                                                                            <div className="text-sm text-gray-600">
                                                                                {new Date(game.timestamp).toLocaleDateString()} at{" "}
                                                                                {new Date(game.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {game.isBlackjack && (
                                                                        <div
                                                                            className="inline-flex items-center rounded-full border border-yellow-500
                                                                                px-2.5 py-0.5 text-xs font-semibold text-yellow-600"
                                                                        >
                                                                            BlackJack!
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {activeTab === "leaderboard" && (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Trophy size={20} />
                                                    <h3 className="text-lg font-semibold">Leaderboard</h3>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {["wins", "streak", "chips", "blackjacks", "winrate"].map((category) => (
                                                        <button
                                                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md
                                                                text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none
                                                                focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2
                                                                disabled:pointer-events-none disabled:opacity-50 h-9 px-3 ${selectedLeaderboard === category
                                                                    ? "bg-slate-900 text-slate-50 hover:bg-slate-900/90"
                                                                    : "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900"
                                                                }`}
                                                            key={category}
                                                            onClick={() => handleLeaderboardChange(category)}
                                                        >
                                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                                    {leaderboard.length === 0 ? (
                                                        <div className="text-center text-gray-500 py-8">No data available</div>
                                                    ) : (
                                                        leaderboard.map((entry) => (
                                                            <div
                                                                className={`rounded-lg border shadow-sm ${entry.username === stats?.username
                                                                    ? "border-blue-500 bg-blue-50 text-slate-950"
                                                                    : "border-slate-200 bg-white text-slate-950"
                                                                    }`}
                                                                key={entry.rank}
                                                            >
                                                                <div className="p-3 flex items-center justify-between">
                                                                    <div className="flex items-center gap-3">
                                                                        <div
                                                                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
                                                                                ${entry.rank === 1 ? "bg-yellow-500 text-white" :
                                                                                    entry.rank === 2 ? "bg-gray-400 text-white" :
                                                                                        entry.rank === 3 ? "bg-orange-500 text-white" :
                                                                                            "bg-gray-200 text-gray-700"
                                                                                }`}>
                                                                            {entry.rank}
                                                                        </div>
                                                                        <div>
                                                                            <div className="font-medium">{entry.username}</div>
                                                                            <div className="text-sm text-gray-600">
                                                                                {entry.gamesPlayed} games played
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <div className="font-bold">
                                                                            {entry.value}{selectedLeaderboard === "winrate" ? "%" : ""}
                                                                        </div>
                                                                        <div className="text-sm text-gray-600 capitalize">
                                                                            {selectedLeaderboard === "winrate" ? "Win Rate" : selectedLeaderboard}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-end mt-6">
                                <button
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm
                                        font-medium ring-offset-white transition-colors focus-visible:outline-none
                                        focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2
                                        disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50
                                        hover:bg-slate-900/90 h-10 px-4 py-2"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default UserProfile;