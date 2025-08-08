import { motion } from "framer-motion";

interface GameControlsProps {
    onHit: () => void;
    onStand: () => void;
    onNewGame: () => void;
    canHit: boolean;
    canStand: boolean;
    gameOver: boolean;
    isPlayerTurn: boolean;
};

const GameControls = ({ onHit, onStand, onNewGame, canHit, canStand, gameOver, isPlayerTurn }: GameControlsProps) => {
    return (
        <motion.div
            className="flex justify-center space-x-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            {gameOver ? (
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium
                        ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2
                        focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none
                        disabled:opacity-50 bg-green-600 text-white hover:bg-green-700 h-11 px-8 py-3 shadow-lg"
                    onClick={onNewGame}
                >
                    New Game
                </button>
            ) : (
                <>
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium
                            ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2
                            focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none
                            disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-600
                            h-11 px-6 py-3 shadow-lg"
                        onClick={onHit}
                        disabled={!canHit || !isPlayerTurn}
                    >
                        Hit
                    </button>
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium
                            ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2
                            focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none
                            disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-600
                            h-11 px-6 py-3 shadow-lg"
                        onClick={onStand}
                        disabled={!canStand || !isPlayerTurn}
                    >
                        Stand
                    </button>
                </>
            )}
        </motion.div>
    );
};

export default GameControls;