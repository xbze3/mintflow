import "../components-css/Card.css";
import Carousel from "react-bootstrap/Carousel";
import { useCardData } from "./special/CardContext";
import { useState } from "react";

function Card() {
    const { cardData } = useCardData();
    const [isFlipped, setIsFlipped] = useState(false);
    const [flippedCardId, setFlippedCardId] = useState("");

    function flipCard(cardId: string) {
        if (flippedCardId === cardId) {
            setIsFlipped(!isFlipped);
        } else {
            setIsFlipped(true);
            setFlippedCardId(cardId);
        }
    }

    return (
        <div id="card">
            {cardData.length === 0 ? (
                <div id="select-deck-message">
                    <h3>Select a Deck</h3>
                </div>
            ) : (
                <Carousel id="carousel">
                    {cardData.map((card) => (
                        <Carousel.Item
                            id="item"
                            key={card._id}
                            onClick={() => flipCard(card._id)}
                        >
                            <div
                                id="subitem"
                                className={
                                    flippedCardId === card._id && isFlipped
                                        ? "flipped"
                                        : ""
                                }
                            >
                                <div className="card-side card-front">
                                    <h5 id="question-answer-heading">
                                        Question
                                    </h5>
                                    <h5>{card.question}</h5>
                                </div>
                                <div className="card-side card-back">
                                    <h5 id="question-answer-heading">Answer</h5>
                                    <h5>{card.answer}</h5>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </div>
    );
}

export default Card;
