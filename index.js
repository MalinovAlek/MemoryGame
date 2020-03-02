let game = document.querySelector('#game')
let span
let input = document.querySelector('#input')
let button = document.querySelector('#btn')
let newGame = document.querySelector('#new')
let movesCnt = document.querySelector('#moves')
let allTiles = []
var flippedTIles = []
let matchedTiles = []
let total
let moves = 0

class Board{
    constructor(){

        this.div = document.createElement('div')
        this.div.style.display = 'flex'
        this.div.style.flexWrap = 'wrap'
        this.div.style. justifyContent = 'space-around'
        game.appendChild(this.div)

        }
}

class Tile {
    constructor(){
        this.id = 0
        this.num = 0;
        this.isFliped =  false;
        this.isMatching = false;

        this.span = document.createElement('span')
       }
}

let newBoard = new Board()
let newTile = new Tile()

button.addEventListener('click',function(){
    
    if (input.value % 2 || input.value === '' || input.value == 0) {
        alert('You must enter even number')
    } else 
        createTIles(input.value)
    
},false)



newGame.addEventListener('click',function(){
    location.reload()
    button.style.display = 'inline-block'
    newBoard.div.innerHTML = ''
    console.log(newTile)
},false)

function createTIles(num) {
   
    button.style.display = 'none'
   for (let i = 0; i < num; i++) {
    newTile = new Tile()
    newBoard.div.append(newTile.span)
       allTiles.push(newTile)
    }

   randomNumbers(num)

    allTiles.map((el,i) => {
        el.num = finalNums[i]
    })
   
    appendNumbers()
}

let finalNums = []

function randomNumbers(num) {
    let firstNums = []
   total = num / 2
   for (let i = total; i >= 1; i--) 
   { firstNums.push(i)}
    let secondNums = firstNums

    finalNums = firstNums.concat(secondNums)

     shuffleArray(finalNums)
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function appendNumbers() {
 
        allTiles.map((tile,i) => {
            tile.id = i
            tile.span.addEventListener('click',function(){
                if (flippedTIles.length < 2 && tile.isMatching === false ) {

                    tile.span.innerHTML = tile.num
                    tile.isFliped = true
                    tilesControl(tile)
                    checkMatching()
                    winner(allTiles.length)
                }
          }
      ,false)
      })
    }
 
function tilesControl(tile) {
    if (tile.isFliped === true) {
      flippedTIles.push(tile)
    }
    if (flippedTIles.length === 2) {
        if (flippedTIles[0].id === flippedTIles[1].id) {
            flippedTIles.pop()
        }
    }
}

function checkMatching() {

    if (flippedTIles.length === 2) {
        moves++
        movesCnt.innerHTML = moves
            if (flippedTIles[0].num === flippedTIles[1].num ) {
            flippedTIles[0].isMatching = true
            flippedTIles[1].isMatching = true
            matchedTiles.push(flippedTIles[0])
            matchedTiles.push(flippedTIles[1])
            flippedTIles = []
         } else if (flippedTIles[0].num != flippedTIles[1].num){
             setTimeout(function(){ 
                flippedTIles[0].span.innerHTML = ''
                flippedTIles[1].span.innerHTML = ''
                flippedTIles = []
             }, 1000)
        }
    }
}

function winner(num) {
    if (matchedTiles.length >= num) {
        setTimeout(function(){ 
            alert('GGWP!')
         }, 100)
    }
}
