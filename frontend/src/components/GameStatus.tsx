import { motion, AnimatePresence } from "framer-motion";

interface GameStatusProps {
    message: string;
    isGameOver: boolean;
    winner?: "player" | "dealer" | "push";
};

const GameStatus = ({ message, isGameOver, winner }: GameStatusProps) => {
    const getStatusColor = () => {
        if (!isGameOver) {
            return "text-yellow-300";
        };

        switch (winner) {
            case "player":
                return "text-green-400";
            case "dealer":
                return "text-red-400";
            case "push":
                return "text-blue-400";
            default:
                return "text-white";
        };
    };

    const getBackgroundColor = () => {
        if (!isGameOver) {
            return "bg-yellow-900/30 border-yellow-500/30";
        };

        switch (winner) {
            case "player":
                return "bg-green-900/30 border-green-500/30";
            case "dealer":
                return "bg-red-900/30 border-red-500/30";
            case "push":
                return "bg-blue-900/30 border-blue-500/30";
            default:
                return "bg-gray-900/30 border-gray-500/30";
        };
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className={`${getBackgroundColor()} backdrop-blur-sm px-6 py-3 rounded-lg border-2 text-center`}
                key={message}
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.3 }}
            >
                <motion.p
                    className={`${getStatusColor()} font-medium text-lg`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {message}
                </motion.p>
            </motion.div>
        </AnimatePresence>
    );
};

export default GameStatus;