import { motion } from "framer-motion";

import PlayingCard, { type Card } from "./PlayingCard";
import { calculateHandValue } from "../utils/gameLogic";

interface HandProps {
    cards: Card[];
    isDealer?: boolean;
    hideFirstCard?: boolean;
    title: string;
};

const Hand = ({ cards, isDealer = false, hideFirstCard = false, title }: HandProps) => {
    const visibleCards = hideFirstCard ? cards.slice(1) : cards;
    const { value, isSoft } = calculateHandValue(visibleCards);
    const displayValue = hideFirstCard && cards.length > 0 ? "?" : value;

    const fanStyle = isDealer ? "dealer" : "player";
    const fanWidth = Math.max(cards.length * 40, 100);

    return (
        <div className={`flex flex-col items-center ${isDealer ? "mb-4" : "mt-4"}`}>
            <motion.div
                className={`${isDealer ? "order-2 mt-4" : "order-1 mb-4"} text-center`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h3 className="text-white mb-2">{title}</h3>
                <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <div className="text-white">
                        Score: {displayValue}
                        {isSoft && !hideFirstCard && value !== 11 && (
                            <span className="text-yellow-300 ml-1">(Soft)</span>
                        )}
                    </div>
                </div>
            </motion.div>
            <div
                className={`${isDealer ? "order-1" : "order-2"} relative flex justify-center items-center`}
                style={{
                    width: `${fanWidth}px`,
                    height: isDealer ? "140px" : "140px",
                    perspective: "1000px",
                }}
            >
                {cards.map((card, index) => (
                    <PlayingCard
                        key={`${card.suit}-${card.rank}-${index}`}
                        card={card}
                        isHidden={index === 0 && hideFirstCard}
                        delay={index * 0.2}
                        index={index}
                        totalCards={cards.length}
                        fanStyle={fanStyle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hand;