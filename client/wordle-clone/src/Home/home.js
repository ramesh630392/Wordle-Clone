import React, { useState } from "react";
import "./home.css";

const WORD_LIST = ["apple", "chair", "house", "water", "bread", "sugar", "light", "music", "smile", "jolly", "table"];
const getRandomWord = () => WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

const Home = () => {
  const [word, setWord] = useState(getRandomWord()); // Random 5-letter word
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [chances, setChances] = useState(6);
  const [input, setInput] = useState('');
  const [err, setErr] = useState('');

  

  //This function submits guessed word from input
  const onSubmitWord = () =>{
    //If game is over it returns and shows chances completed message
    if ( gameOver || chances === 0){
        setMessage("Chances Completed");
        setGameOver('true');
        return
    };
    
    //If input length less than 5 it prevents from adding to guesses list
    if (input.length < 5){
        setErr("Please Enter 5 Letters");
        return 
    //If input length greater than 5 then it add input to guesses list
    }else{
        setErr("");
        setChances(chances-1);
        setInput('');
        const guessedWord = input.toUpperCase();
        const newWord = word.toLocaleUpperCase();
        const newWordle = {word: newWord, input: guessedWord};
        setGuesses([...guesses, newWordle]);
        setWord(getRandomWord());
        if (chances === 0){
            setMessage("Chances Completed");
        }
    };
  };
  
  //It generates color for each grid item based on their match
  const getColor = (eachWord, eachLetter, i)=>{
    if (eachWord.word[i] === eachLetter) return "correct";
    if (eachWord.word.includes(eachLetter)) return "includes";

    return "not-includes";
  };
  
  //This function restart the game which make all items to initial state
  const onRestartGame = () =>{
    setWord(getRandomWord());
    setGuesses([]);
    setGameOver(false);
    setMessage('');
    setChances(6);
    setInput('');
    setErr('');
  };
   
  return(
    <div className="main-container" >
        <nav>
            <h1 className="nav-heading" >Wordle-Clone</h1>
            <div className="chances-container" title="chances" >
                <h1>{chances>0?"❤️":"🖤"}</h1>
                <h1>{chances>1?"❤️":"🖤"}</h1>
                <h1>{chances>2?"❤️":"🖤"}</h1>
                <h1>{chances>3?"❤️":"🖤"}</h1>
                <h1>{chances>4?"❤️":"🖤"}</h1>
                <h1>{chances>5?"❤️":"🖤"}</h1>
            </div>
        </nav>
        
        <div className="game-container">
        <div className="grid-wrap" >
        {guesses.map((eachWord, index)=>(
        <div className="grid-container" key={index} >
            {eachWord.input.split("").map((eachLetter, i)=>(
                <div className= {getColor(eachWord, eachLetter, i)}  key={i} >{eachLetter}</div>
            ))}
        </div>
        ))}
        </div>
        <div className="input-container" >
            <input type="text" placeholder="Enter a word" value={input} onChange={(e)=>setInput(e.target.value)} maxLength={5} />
            <button type="button" onClick={onSubmitWord} className="button-submit" >Submit</button>
        </div>
        <p className="err-text" >{err}</p>
        <button type="button" onClick={onRestartGame} className="button-restart" >Restart Game</button>
        <p className="message-text" >{message}</p>
        </div>
        
    
    </div>
  );
  
};

export default Home;
