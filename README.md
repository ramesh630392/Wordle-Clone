# Wordle-Clone
A game for word Guessing
Thank you for the reading instructions

Game summary:
 1. This a 5 letter word guessing game which generates 5 letter word when we provide input of 5 letters it will match the word which was generated by the application    which is stored in the word variable of the state.
 2.First step is to enter a 5 letter word in input if the length of the word is 5 it add to initialWords of array of objects in which each object contains variables of randomWord which stores word generated by application and guessedWord stores a array of guessed  word. If the length of a guessed word is less than 5 it shows the message of please enter 5 letters.
 3.Then it updates the UI again apply the each letter of word to grids of a display and the last grid shows random word generated by the application where we can match and compare.
 4.The color of each grid is depends on either it includes or same index and not-includes.
   --green color: Green color is for if the each letter of a guessed word is same index of random word.
   --yellow color: Yellow color is for if the letter is included in word but not same index of random word.
   --Gray color : Gray color is for the letter which not included in the random word
 5.Input: The input is limited to 5 letters of text. It takes the input value if the length is 5;
 6.Submit Button : This button controls the function "onSubmit" which executes when the length of input is 5 and decrease the increase the count and decrease the value  of life's which shows in the nav bar. On every submit number of turns into black from red. In this function we convert input into array of upper case letters and assigned to variable of guessedWord. and updates the state.
 7.Restart Button : This button controls the function 'onRestart' which set state into initial state and refreshes the UI.

 
 