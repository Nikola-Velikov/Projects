let table = document.querySelector('table');
let board = [];
let btnsMatrix = [];
let rowCount = 6;
let currentPlayer = 1;
let queensCount = 0;
let mode = document.getElementById('mode-select').value;
let colCount = 6;
let tableDiv = document.querySelector('#table-container');
let body = document.querySelector('body');


createTable(rowCount, colCount);


function createTable(rowCount, colCount) {
    for (let i = 0; i < rowCount; i++) {
        let tempTr = document.createElement('tr');
        let tempArr = [];
        let tempArrBtn = [];
        for (let j = 0; j < colCount; j++) {
            let tempTd = document.createElement('td');
            let tempBtn = document.createElement('button');
            tempBtn.textContent = 'put';
            tempBtn.classList.add('btn-put');
            tempArrBtn.push(tempBtn);
            let tempDiv = document.createElement('div');
            let tempImg = document.createElement('img');
            tempImg.src = 'images/p1.png';
            tempImg.alt = 'queen';
            tempDiv.classList.add('Queen');
            tempTd.appendChild(tempBtn);
            tempTd.appendChild(tempDiv);
            tempDiv.appendChild(tempImg);
            tempArr.push(tempTd);
            tempTr.appendChild(tempTd);
        }
        board.push(tempArr);
        btnsMatrix.push(tempArrBtn);
        table.appendChild(tempTr);
    }
    console.log(board);
}






let queens = Array.from(document.querySelectorAll('.Queens'));
let putBtns = Array.from(document.querySelectorAll('.btn-put'));
let tds = Array.from(document.querySelectorAll('td'));
putBtns.forEach((x) => x.addEventListener('click', show));

function reset() {
    mode = document.getElementById('mode-select').value;
    board = [];
    btnsMatrix = [];
    let colInput = document.getElementById('colInput').value;
    colInput = Number(colInput);
    let rowInput = document.getElementById('rowInput').value;
    rowInput = Number(rowInput);
    colCount = colInput;
    rowCount = rowInput;
    table.remove();
    table = document.createElement('table');
    createTable(rowCount, colCount);
    tableDiv.appendChild(table);
    table = document.querySelector('table');
    queens = Array.from(document.querySelectorAll('.Queens'));
    putBtns = Array.from(document.querySelectorAll('.btn-put'));
    tds = Array.from(document.querySelectorAll('td'));
    putBtns.forEach((x) => x.addEventListener('click', show));

}

function show(event) {
    let row;
    let col;
    console.log(currentPlayer);
    if(mode === 'AI' && currentPlayer === 2){
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                if(board[i][j].style.backgroundColor !== 'lightblue'){
                    row = i;
                    col = j;
                }
            }
        }
        board[row][col].children[1].children[0].src = 'images/robot.webp';
        board[row][col].children[1].children[0].style.display = 'inline-block';
    }else{
        console.log("--------------------------", rowCount, colCount);
        //show queen
        event.target.parentElement.children[1].children[0].style.display = 'inline-block';
        //hide btn
        event.target.style.display = 'none';
        let index = putBtns.indexOf(event.target);
        row = Math.floor(index / colCount);
        col = index % colCount;
    }
    //get index

    //set 0 in arr board
    tds[row * colCount + col].style.backgroundColor = 'lightblue';
    putBtns[row * colCount + col].style.display = 'none';
    queensCount++;

    let i;
    let j = col + 1;
    for (i = row + 1; i < rowCount; i++) {
        
        if (board[i][j] != undefined) {
            board[i][j].style.backgroundColor = 'lightblue';
            btnsMatrix[i][j].style.display = 'none';
        }
        console.log(i, j);
        j++;
    }



    j = col - 1;
    for (i = row - 1; i >= 0; i--) {
        
        if (board[i][j] != undefined) {
            board[i][j].style.backgroundColor = 'lightblue';
            btnsMatrix[i][j].style.display = 'none';
        }
        console.log(i, j);
        j--;
    }


    j = col - 1;
    for (i = row + 1; i < rowCount; i++) {
        
        if (board[i][j] != undefined) {
            board[i][j].style.backgroundColor = 'lightblue';
            btnsMatrix[i][j].style.display = 'none';
        }
        console.log(i, j);
        j--;
    }

    j = col + 1;
    for (i = row - 1; i >= 0; i--) {
        
        if (board[i][j] != undefined) {
            board[i][j].style.backgroundColor = 'lightblue';
            btnsMatrix[i][j].style.display = 'none';
        }
        console.log(i, j);
        j++;
    }

    i = row;//fixed
    for (j = col + 1; j < colCount; j++) {
        
        if (board[i][j] != undefined) {
            board[i][j].style.backgroundColor = 'lightblue';
            btnsMatrix[i][j].style.display = 'none';
        }
        console.log(i, j);
    }

    i = row;
    for (j = col - 1; j >= 0; j--) {
        
        if (board[i][j] != undefined) {
            board[i][j].style.backgroundColor = 'lightblue';
            btnsMatrix[i][j].style.display = 'none';
        }
        console.log(i, j);
    }
    j = col;
    for (i = row; i < rowCount; i++) {
        if (board[i][j] != undefined) {
            board[i][j].style.backgroundColor = 'lightblue';
            btnsMatrix[i][j].style.display = 'none';
        }
        console.log(i, j);
    }

    j = col;
    for (i = row; i >= 0; i--) {
        if (board[i][j] != undefined) {
            board[i][j].style.backgroundColor = 'lightblue';
            btnsMatrix[i][j].style.display = 'none';
        }
        console.log(i, j);
    }

    if (CheckWinner()) {
        if(mode == 'AI' ){
            alert(`${queensCount % 2 == 0 ? 'The bot' : 'Player 1'} won the game!!!`);
        }else{
            alert(`Player ${queensCount % 2 == 0 ? 2 : 1} won the game!!!`);
        }
    }
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById('playerP').textContent = `Now is Player ${currentPlayer} turn.`;
}


function CheckWinner() {
    let winner = true;
    for (let btn of putBtns) {
        if (btn.style.display != 'none') {
            winner = false;
            break;
        }
    }
    return winner;

}