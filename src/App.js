import SingleCard from "./components/SingleCard";
import { useState, useEffect } from "react";
import "./App.css";

const cardImgs = [
  { src: "/imgs/helmet-1.png", matched: false },
  { src: "/imgs/potion-1.png", matched: false },
  { src: "/imgs/ring-1.png", matched: false },
  { src: "/imgs/scroll-1.png", matched: false },
  { src: "/imgs/shield-1.png", matched: false },
  { src: "/imgs/sword-1.png", matched: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  //random cards places And duplicate it (12 cards total)
  function shuffleCards() {
    const shuffledCards = [...cardImgs, ...cardImgs]
      .sort(() => Math.random() - 0.5)
      .map((c) => ({ ...c, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  }
  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((turns) => turns + 1);
    setDisabled(false)
  }
  useEffect(() => {
    setChoiceOne(null);
    setChoiceTwo(null);
    shuffleCards()
  }, []);
  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map((c) => {
            if (c.src === choiceOne.src) {
              return { ...c, matched: true };
            } else {
              return c;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn()
        }, 700);
        
      }
    }
  }, [choiceOne, choiceTwo]);

console.log(cards)
  return (
    <div className="App">
      <h1>Fish Memory</h1>
      <button onClick={shuffleCards}>Start New Game</button>
      <div className="card-grid">
        {cards.map((c) => (
          <SingleCard key={c.id} card={c} disabled={disabled} handleChoice={handleChoice} 
          flipped={c===choiceOne || c===choiceTwo || c.matched}/>
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
