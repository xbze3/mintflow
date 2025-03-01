import "./App.css";
import CardSection from "./components/CardSection";
import NavBar from "./components/NavBar";
import { CardProvider } from "./components/special/CardContext";

function App() {
    return (
        <>
            <CardProvider>
                <NavBar />
                <CardSection />
            </CardProvider>
        </>
    );
}

export default App;
