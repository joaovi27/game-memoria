const grid=document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const modal = document.querySelector('.modalcontainer');
const over = document.querySelector('.modalcontainerr');
const reveal = document.querySelector('.revealcard');

function startTimer(duration, display){
 
    var timer = duration, minutes, seconds;
   this.loop = setInterval(function(){

        minutes = parseInt(timer / 60,10);
        seconds = parseInt(timer % 60,10);
         minutes = minutes < 10 ? "0" + minutes : minutes;
         seconds = seconds < 10 ? "0" + seconds : seconds;

         display.textContent =minutes + " : " + seconds;

         if(--timer=== 0){
            clearInterval(this.loop);
           over.classList.add('active')
        } 
    },1000);
}

function closemodal(){
    modal.classList.remove('active')
}
function playaudio(){
    let x = document.getElementById("myaudio");
    x.play();
  }
  function pauseaudio(){
    let x = document.getElementById("myaudio");
    x.pause();
  }

  
const personagens = [
    'bomber',
    'crash',
    'donkey',
    'front-sonic',
    'kombat',
    'luigi',
    'mario',
    'megaman',
    'pacman',
    'street',
];


//funcao para criar card
const createElement =(tag,className)=>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstcard = '';
let secondcard = '';

//funcao verifica final de jogo
const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disablecard');  
    if (disableCards.length === 20) {
        //loop que pausa contagem de tempo ao final do game
        clearInterval(this.loop);

//aciona Pop-Up ao vencer game!
    modal.classList.add('active')
    }
  }



const checkcards =() =>{
    const firstpersonagem = firstcard.getAttribute('datapersonagens');
    const secondpersonagem = secondcard.getAttribute('datapersonagens');
    
    //condicao que trata de quando ocorre acerto dos cards
    if (firstpersonagem === secondpersonagem){

        firstcard.firstChild.classList.add('disablecard');
        secondcard.firstChild.classList.add('disablecard');
        firstcard = '';
        secondcard = '';

        //funcao que verifica se jogo acabou 
        checkEndGame();

    } else {
        setTimeout(()=>{
            firstcard.classList.remove('revealcard');
            secondcard.classList.remove('revealcard');

            firstcard = '';
            secondcard = '';
        },500);
    }
}


//metodo para revelar card com clique
const revealcard =({target})=>{

    if (target.parentNode.className.includes('revealcard')){
        return;
    }

    if  (firstcard==''){
        target.parentNode.classList.add('revealcard');
        firstcard = target.parentNode;
    } else if (secondcard == ''){
        target.parentNode.classList.add('revealcard');
        secondcard = target.parentNode;
        checkcards();
    }
}


const createCard = (personagens) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

front.style.backgroundImage=`url('../cards/${personagens}.png')`;

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealcard);

    //  grid.appendChild(card);
        card.setAttribute('datapersonagens', personagens)
    return card;
}

const loadGame = ()=> {

    const duplicatePersonagens = [...personagens, ...personagens];
    const shuffledArray = duplicatePersonagens.sort( ()=> Math.random()-0.5);

    shuffledArray.forEach((personagens) => {
        const card = createCard(personagens);
        grid.appendChild(card);
    });
}


window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');;
    var duration = 60*1;
    display = document.querySelector(".timer");
    alert("Você terá 1 minuto de jogo :) , Boa sorte!")
    startTimer(duration,display);
    
    loadGame();
    
}


