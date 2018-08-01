
let scores = [0,0], roundScore = 0,
activePlayer = 0,dicePrevious = 0,
winningScore, gameOn = true;

document.querySelector('#winScore').addEventListener('keypress',function(e){
    key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter key's charcode
        winningScore =  document.querySelector('#winScore').value;
        document.querySelector('.winScoreWrapper').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'block';
        document.querySelector('.btn-roll').style.display = 'block';
    }
    
});

init();

document.querySelector('.btn-roll').addEventListener('click',()=>{
    if(gameOn){
        //Get Dice Number
        let dice = Math.ceil(Math.random()*6);
        //Display Results
        //first dice
        let dicePic = document.querySelector(`#dice1`);
        dicePic.style.display = 'block';
        dicePic.src = `images/dice-${dice}.png`;
        //Update Current Score
        if(dice === 6 && dicePrevious === 6){
            document.getElementById('score-' + activePlayer).textContent = 0;
            scores[activePlayer] = 0;
            switchPLayer();
        }
        else if(dice !== 1){
            roundScore += dice;
            //update current score
            document.getElementById('current-'+activePlayer).textContent = roundScore;
        }else{
            switchPLayer();
            
        }

        dicePrevious = dice;
    }
});

//Hold Button event
document.querySelector('.btn-hold').addEventListener('click',()=>{
    if(gameOn){
        //update score 
        scores[activePlayer] += roundScore;

        //make roundScore 0
        roundScore = 0;

        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer] >= winningScore){
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner';
            document.getElementById(`name-${activePlayer}`).classList.add('winner');
            gameOn = false;
        }else{
            switchPLayer();
        }
    }
});

//switch to next player
function switchPLayer(){
    // do not display dice
    // document.querySelector(`#dice1`).style.display = 'none';
    
    //remove active class from previous player
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active'); 

    //change current score
    document.getElementById('current-'+activePlayer).textContent = 0;

    //check active player and switch between
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //add active class to the current player
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active'); //do not use className += 'class' to add a class

    //update score 
    scores[activePlayer] += roundScore;
    //make roundScore 0
    roundScore = 0;
    //Update current player's score
    document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

    if(scores[activePlayer] >= winningScore){
        document.getElementById(`name-${activePlayer}`).textContent = 'Winner';
        document.getElementById(`name-${activePlayer}`).classList.add('winner');
        gameOn = false;
    }
}

//Button new event
document.querySelector('.btn-new').addEventListener('click',()=>{
    location.reload();
})

function init(){
    //Make all 0
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;  
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.querySelector('.btn-hold').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
    //do not display dice
    document.querySelector(`#dice1`).style.display = 'none';

    
}



function win(){
    if(scores[activePlayer] >= 60){
        document.querySelector('.btn-roll').disabled = true;
        document.querySelector('.btn-hold').disabled = true;

        //const wrapper = document.querySelector('.wrapper');
    }
}


