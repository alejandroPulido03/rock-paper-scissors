const gameZone = document.getElementById('gameZone');
const goGame = document.getElementById('goGame');
const inGameScreen = document.getElementById('inGameScreen');
const playAgain = document.getElementById('playAgain');
const userElection = document.getElementById('userElection');
const pcElection = document.getElementById('pcElection');
const scoreBoard = document.getElementById('score');
const controls = document.getElementById('controls');
const result = document.getElementById('result');
const closeRules = document.getElementById('closeRules');
const openRules = document.getElementById('openRules');
const daRules = document.getElementById('daRules');

const GameState = () =>{
    let score = 0;
    let inGame = false;
    return {
        setScore(points){
            score = points == 2 ? 1 : points == 1 ? -1 : 0;
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

class GameUserUI{
    constructor(election){
        this.election = election;
        this.results = {
            0: 'Tied match',
            1: 'You lose',
            2: 'You win'
        }
    }
    showUserElection(){
        if(this.election){
        userElection.classList.remove(pcElection.classList[3])
        userElection.classList.add(this.election)
        userElection.classList.add('fadein');
        Game.changeScreenState()
        }
    }
    showPcElection(pcChoose){
        pcElection.classList.remove(pcElection.classList[3]);
        pcElection.classList.add(pcChoose);
        pcElection.classList.add('pcfadein');
    }
    addPointBoard(points){
        scoreBoard.innerHTML = `<p class='resultsfadein'>${Number(scoreBoard.innerText) + (points)}</p>`;
        controls.style.visibility = 'visible';
        controls.classList.add('resultsfadein');
    }
    resultMatch(resultGame){
        result.innerText = this.results[resultGame]
    }

    highligthWinner(points){
        if(points == 1){
            userElection.style.boxShadow = '0 0 0 25px hsl(214deg 47% 23% / 80%), 0 0 0 45px hsl(214deg 47% 23% / 60%), 0 0 0 75px hsl(214deg 47% 23% / 40%)';
            pcElection.style.boxShadow = '';
            userElection.style.zIndex = '-1'
            pcElection.style.zIndex = '0'
        }else if(points == -1){
            pcElection.style.boxShadow = '0 0 0 25px hsl(214deg 47% 23% / 80%), 0 0 0 45px hsl(214deg 47% 23% / 60%), 0 0 0 75px hsl(214deg 47% 23% / 40%)';
            userElection.style.boxShadow = '';
            pcElection.style.zIndex = '-1'
            userElection.style.zIndex = '0'
        }else{
            userElection.style.boxShadow = '';
            pcElection.style.boxShadow = '';
        }
    }

    resetGame(){
        userElection.classList.remove(this.election)
        Game.changeScreenState()
    }
}

class GameLogic{
    constructor(){
        this.posibilities = {
            'rock': 0,
            'scissors': 1,
            'paper': 2
        },
        this.pc;
    }
    getPcElection(){
        this.pc = Object.keys(this.posibilities)[Math.floor(Math.random() * 3)];
        return this.pc;
    }
    getResult(user){
        let userChoose = this.posibilities[user];
        let pcChoose = this.posibilities[this.pc];
        return userChoose - pcChoose >= 0 ? userChoose - pcChoose : userChoose - pcChoose + 3;
    }
}


const Game = GameState();
let actualGame;

goGame.addEventListener('click', e =>{
    actualGame = new GameUserUI(e.target.value);
    actualLogic = new GameLogic();
    actualGame.showUserElection();
    actualGame.showPcElection(actualLogic.getPcElection());
    Game.setScore(actualLogic.getResult(actualGame.election));
    actualGame.resultMatch(actualLogic.getResult(actualGame.election))
    actualGame.addPointBoard(Game.getScore());
    actualGame.highligthWinner(Game.getScore())
})

playAgain.addEventListener('click', () =>{
    actualGame.resetGame()
    goGame.style.animation = 'fadeinMain 500ms';
})

closeRules.addEventListener('click', ()=>{
    daRules.style.display = 'none';
})

openRules.addEventListener('click', ()=>{
    
    daRules.style.display = 'grid';
})