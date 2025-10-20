import "./SingleCard.css";

export default function SingleCard({ card ,handleChoice,flipped,disabled}) {
  function handleClick(){
    if(!disabled){
  handleChoice(card)
    }
  
  }
  return (
    <div className="card">
      <div className={flipped ? "flipped":""} >
        <img className="front" src={card.src} alt="img Front"></img>
        <img
          className="back"
          src="/imgs/cover.png"
          alt="img Back"
          onClick={handleClick}
          
        ></img>
      </div>
    </div>
  );
}
