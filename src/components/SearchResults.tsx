import ListGroup from "react-bootstrap/ListGroup";
import "../components-css/SearchResults.css";
import { useCardData } from "./special/CardContext";

interface Deck {
    _id: string;
    courseCode: string;
    topicName: string;
    courseName: string;
    cards: string[];
}

interface DeckProps {
    decks: Deck[];
    onClearDecks: () => void;
}

function SearchResults({ decks, onClearDecks }: DeckProps) {
    const { setCardData } = useCardData();
    // const apiUrl = process.env.REACT_APP_API_URL;

    const handleSelectDeck = async (topicName: string) => {
        try {
            const response = await fetch(
                `https://mintflow-backend.onrender.com/get-cards?topicName=${encodeURIComponent(
                    topicName
                )}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCardData(data);
            onClearDecks();
        } catch (error) {
            console.error("Error fetching decks:", error);
        }
    };

    return (
        <ListGroup as="ul">
            {decks.map((deck) => (
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start searchItem"
                    key={deck._id}
                    onClick={() => handleSelectDeck(deck.topicName)}
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold searchHeading">
                            {deck.topicName}
                        </div>
                        <strong>Course Code:</strong> {deck.courseCode} |{" "}
                        <strong>Course Name:</strong> {deck.courseName} |{" "}
                        <strong>Cards:</strong> {deck.cards.length}
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default SearchResults;
