
import random

#Imports random module which allows use to get random numbers

WORDLIST_FILENAME = "words.txt"

def loadWords():
    """
    Returns a list of valid words. Words are strings of lowercase letters.
    
    Depending on the size of the word list, this function may
    take a while to finish.
    """
    print("Loading word list from file...")
    # inFile: file
    inFile = open(WORDLIST_FILENAME, 'r')
    # line: string
    line = inFile.readline()
    """
    En este caso el documento es todo una linea.Readline lee una linea y lo convierte 
    """
    # wordlist: list of strings
    wordlist = line.split()
    """
    Convierte una string en una lista de strings, el spearador por default es el whitespace pero puedes especificarlo ()
    """
    print("  ", len(wordlist), "words loaded.")
    return wordlist

def chooseWord(wordlist):
    """
    wordlist (list): list of words (strings)

    Returns a word from wordlist at random
    """
    return random.choice(wordlist)

# end of helper code
# -----------------------------------

# Load the list of words into the variable wordlist
# so that it can be accessed from anywhere in the program
wordlist = loadWords()
secretWord=chooseWord(wordlist).lower()

def isWordGuessed(secretWord, lettersGuessed):
    return all(i in lettersGuessed for i in secretWord)



def getGuessedWord(secretWord, lettersGuessed):
    x = ''.join(i if i in lettersGuessed else '_ ' for i in secretWord)
    """
    join returns a string by joining elements of an iterable using a character as separator --
    'character'.join(Iterable)
    """
    return x



def getAvailableLetters(lettersGuessed):
    import string
    """
    STRING ENABLES US TO USE STRING METHODS 
    """
    return''.join(i for i in string.ascii_lowercase if i not in lettersGuessed)

def askforinput(intento,lettersGuessed):
    print('You have ' +str(intento)+'  attempts left')
    print('Available letters: ' + getAvailableLetters(lettersGuessed))
    print('Please guess a letter: ')
    guess=input()
    guessinlowercase = guess.lower()
    return guessinlowercase

def spacer():
    print ("-------------")
    
def hangman(secretWord):
    import string
   
    lettersGuessed=[]
    intento=8

    while(intento!=0):
        
        guess=askforinput(intento,lettersGuessed)
        
        if guess in secretWord:
            if guess not in lettersGuessed:  
                
                lettersGuessed.append(guess)
                print('Good guess: ' + getGuessedWord(secretWord, lettersGuessed))
                spacer()
                if isWordGuessed(secretWord, lettersGuessed):
                    print('Congratulations, you won!')
                    spacer()
                    break
                
                else:
                    intento-=1
           
            else:
                print('Oops! You have already guessed that letter: ' + getGuessedWord(secretWord, lettersGuessed))
                spacer()
                intento-=1
        
        else:
            print('Oops! That letter is not in my word: '+ getGuessedWord(secretWord, lettersGuessed))
            spacer()
            intento-=1
            
                
    if(intento==0):
        print('Sorry, you ran out of guesses. The word was ' + secretWord)
        spacer()
            

hangman(secretWord)