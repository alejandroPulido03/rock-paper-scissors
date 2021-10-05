const gameZone = document.getElementById('gameZone');
const gameSelection = document.getElementById('gameSelection');

gameZone.appendChild(gameSelection.content);

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
        changeGameState(){
            inGame = !inGame;
        },
        getGameState(){
            return inGame;
        }
    }
}

const Game = GameState()
