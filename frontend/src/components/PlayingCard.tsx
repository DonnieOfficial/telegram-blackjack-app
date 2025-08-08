import { motion } from "framer-motion";

export interface Card {
    suit: "hearts" | "diamonds" | "clubs" | "spades";
    rank: "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
    value: number;
};

interface PlayingCardProps {
    card: Card;
    isHidden?: boolean;
    delay?: number;
    index?: number;
    totalCards?: number;
    fanStyle?: "player" | "dealer";
};

const suitSymbols = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠",
};

const suitColors = {
    hearts: "text-red-500",
    diamonds: "text-red-500",
    clubs: "text-gray-800",
    spades: "text-gray-800",
};

const PlayingCard = ({ card, isHidden, delay = 0, index = 0, totalCards = 1, fanStyle = "player" }: PlayingCardProps) => {
    const getFanTransform = () => {
        if (totalCards === 1) {
            return { rotate: 0, translateX: 0, translateY: 0 };
        };

        const maxRotation = Math.min(totalCards * 8, 40);
        const rotationStep = maxRotation / Math.max(totalCards - 1, 1);
        const rotation = -maxRotation / 2 + (index * rotationStep);

        const xOffset = (index - (totalCards - 1) / 2) * 20;
        const yOffset = fanStyle === "player" ? Math.abs(rotation) * 0.8 : -Math.abs(rotation) * 0.8;

        return {
            rotate: rotation,
            translateX: xOffset,
            translateY: yOffset,
        };
    };

    const { rotate, translateX, translateY } = getFanTransform();

    if (isHidden) {
        return (
            <motion.div
                className="absolute w-16 h-24 sm:w-20 sm:h-28 bg-gradient-to-br from-blue-900
                    to-blue-700 rounded-lg border border-blue-600 shadow-lg cursor-pointer"
                initial={{ opacity: 0, y: fanStyle === "player" ? 50 : -50, rotateY: 180 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    rotate,
                    x: translateX,
                }}
                transition={{ duration: 0.6, delay }}
                whileHover={{
                    scale: 1.05,
                    y: fanStyle === "player" ? -10 : 10,
                    zIndex: 50,
                }}
                style={{
                    transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
                    zIndex: index,
                    transformOrigin: fanStyle === "player" ? "bottom center" : "top center",
                }}
            >
                <div className="absolute inset-2 border border-blue-400 rounded opacity-30" />
                <div className="absolute inset-4 border border-blue-300 rounded opacity-20" />
            </motion.div>
        );
    };

    return (
        <motion.div
            className="absolute w-16 h-24 sm:w-20 sm:h-28 bg-white rounded-lg border-2
                border-gray-300 shadow-lg cursor-pointer"
            initial={{ opacity: 0, y: fanStyle === "player" ? 50 : -50, rotateY: 180 }}
            animate={{
                opacity: 1,
                y: 0,
                rotateY: 0,
                rotate,
                x: translateX,
            }}
            transition={{ duration: 0.6, delay }}
            whileHover={{
                scale: 1.05,
                y: fanStyle === "player" ? -15 : 15,
                zIndex: 50,
            }}
            style={{
                transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
                zIndex: index,
                transformOrigin: fanStyle === "player" ? "bottom center" : "top center",
            }}
        >
            <div className={`absolute top-1 left-1 flex flex-col items-center ${suitColors[card.suit]}`}>
                <div className="text-xs sm:text-sm font-bold">{card.rank}</div>
                <div className="text-xs sm:text-base">{suitSymbols[card.suit]}</div>
            </div>
            <div className={`absolute inset-0 flex items-center justify-center ${suitColors[card.suit]}`}>
                <div className="text-2xl sm:text-3xl opacity-20">{suitSymbols[card.suit]}</div>
            </div>
            <div className={`absolute bottom-1 right-1 flex flex-col items-center rotate-180 ${suitColors[card.suit]}`}>
                <div className="text-xs sm:text-sm font-bold">{card.rank}</div>
                <div className="text-xs sm:text-base">{suitSymbols[card.suit]}</div>
            </div>
        </motion.div>
    );
};

export default PlayingCard;