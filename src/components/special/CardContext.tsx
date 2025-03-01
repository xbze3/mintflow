import React, { createContext, useState, ReactNode, useContext } from "react";

interface Card {
    answer: string;
    question: string;
    topicName: string;
    _id: string;
}

interface CardContextProps {
    cardData: Card[];
    setCardData: React.Dispatch<React.SetStateAction<Card[]>>;
}

const CardContext = createContext<CardContextProps | undefined>(undefined);

interface CardProviderProps {
    children: ReactNode;
}

export const CardProvider = ({ children }: CardProviderProps) => {
    const [cardData, setCardData] = useState<Card[]>([]);

    return (
        <CardContext.Provider value={{ cardData, setCardData }}>
            {children}
        </CardContext.Provider>
    );
};

export const useCardData = (): CardContextProps => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error("useCardData must be used within a CardProvider");
    }
    return context;
};
