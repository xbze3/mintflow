import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/mintflowBanner.png";
import SearchResults from "./SearchResults";
import "../components-css/NavBar.css";
import { useState, useEffect } from "react";

function NavBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [decks, setDecks] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setDecks([]);
            return;
        }

        const fetchDecks = async () => {
            try {
                const response = await fetch(
                    `https://mintflow-backend.onrender.com/search-decks?query=${encodeURIComponent(
                        searchQuery
                    )}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDecks(data);
            } catch (error) {
                console.error("Error fetching decks:", error);
            }
        };

        fetchDecks();
    }, [searchQuery]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const clearDecks = () => {
        setSearchQuery("");
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <img
                            src={logo}
                            height="45"
                            className="d-inline-block align-top"
                            alt="banner"
                            id="banner"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        ></Nav>
                        <Form className="d-flex" onSubmit={handleSearchSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Course Code"
                                className="me-2"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <section id="searchResults">
                <SearchResults decks={decks} onClearDecks={clearDecks} />
            </section>
        </>
    );
}

export default NavBar;
