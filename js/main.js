const gameZone = document.getElementById('gameZone');
const goGame = document.getElementById('goGame');
const inGameScreen = document.getElementById('inGameScreen');
const playAgain = document.getElementById('playAgain');
const userElection = document.getElementById('userElection');

const GameState = () =>{
    let score = 0;
    let inGame = false;
    return {
        setScore(points){
            score += points;
        },
        getScore(){
            return score
        },
        getGameState(){
            return inGame;
        },
        changeScreenState(){
            if (inGame){
                inGameScreen.style.display = 'none';
                goGame.style.display = 'grid';
                inGame = false;
            }else{
                goGame.style.display = 'none';
                inGameScreen.style.display = 'grid';
                inGame = true;
            }
        }
    }
}

class GameUI{
    constructor(election){
        this.election = election;
    }
    catchUserElection(){
        if(this.election){
        userElection.classList.add(this.election)
        Game.changeScreenState()
        }
    }
    resetGame(){
        userElection.classList.remove(this.election)
        Game.changeScreenState()
    }
}

class GameLogic{

}


const Game = GameState();

let actualGame;

goGame.addEventListener('click', e =>{
    actualGame = new GameUI(e.target.value);
    actualGame.catchUserElection()
    })

playAgain.addEventListener('click', () => actualGame.resetGame())
