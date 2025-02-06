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
  const [count, setCount] = useState(0);
  const [initialWord, setInitialWord] = useState([{ id: 0, randomWord:"", guessedWord: ['', '', '', '', '']},
    { id: 1, randomWord:"", guessedWord: ['', '', '', '', '']},
    { id: 2, randomWord:"", guessedWord: ['', '', '', '', '']},
    { id: 3, randomWord:"", guessedWord: ['', '', '', '', '']},
    { id: 4, randomWord:"", guessedWord: ['', '', '', '', '']},
    { id: 5, randomWord:"", guessedWord: ['', '', '', '', '']}]);
  //console.log(initialWord);

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
        const guessedWord = input.toUpperCase().split('');
        const newWord = word.toUpperCase();

        setInitialWord(initialWord.map(eachWord =>
            eachWord.id === count ? {...eachWord, randomWord: newWord, guessedWord: guessedWord} : {...eachWord}
        ));
        
        setCount(count+1);
        //console.log(initialWord);
        
        setWord(getRandomWord());
        if (chances === 1){
            setMessage("Chances Completed");
        };
    };
  };
  
  //It generates color for each grid item based on their match
  const getColor = (randomWord, eachLetter, i)=>{
    if (!randomWord || !eachLetter ) return 'not-includes'
    //return 'correct'
    if (randomWord[i] === eachLetter) return "correct";
    if (randomWord.includes(eachLetter)) return "includes";

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
    setCount(0);
    setInitialWord([{ id: 0, randomWord:"", guessedWord: ['', '', '', '', '']},
        { id: 1, randomWord:"", guessedWord: ['', '', '', '', '']},
        { id: 2, randomWord:"", guessedWord: ['', '', '', '', '']},
        { id: 3, randomWord:"", guessedWord: ['', '', '', '', '']},
        { id: 4, randomWord:"", guessedWord: ['', '', '', '', '']},
        { id: 5, randomWord:"", guessedWord: ['', '', '', '', '']}]);
  };
   
  return(
    <div className="main-container" >
        <nav>
            <h1 className="nav-heading" >Wordle-Clone</h1>
            <div className="chances-container" title="chances" >
                <h1 className="heart-symbol">{chances>0?"❤️":"🖤"}</h1>
                <h1 className="heart-symbol">{chances>1?"❤️":"🖤"}</h1>
                <h1 className="heart-symbol">{chances>2?"❤️":"🖤"}</h1>
                <h1 className="heart-symbol">{chances>3?"❤️":"🖤"}</h1>
                <h1 className="heart-symbol">{chances>4?"❤️":"🖤"}</h1>
                <h1 className="heart-symbol">{chances>5?"❤️":"🖤"}</h1>
            </div>
        </nav>
        
        <div className="game-container">
        <div className="grid-wrap" >
        {initialWord.map((eachWord, index)=>(
        <div className="grid-container" key={index} >
            {eachWord.guessedWord.map((eachLetter, j)=>(<div key={j} className={getColor(eachWord.randomWord, eachLetter, j)} >
                {eachLetter}
            </div>))}
            <div key={eachWord.id} className={eachWord.randomWord === '' ? "random-word-empty":"random-word-not-empty"} >{eachWord.randomWord}</div>
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
