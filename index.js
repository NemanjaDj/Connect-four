
var turn;
var fields = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
];
var gameOver = true;

function NewGame(){ 
    SetFieldsNeutralNewGame();
    FirstTurnAvailableFields();
    gameOver = false;
    turn = 0;
    fields = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ];
    document.getElementById('player1').textContent = "Player 1";
    document.getElementById('player2').textContent = "Player 2";
}

function SetMark(fieldId){
    var fieldX = fieldId.substring(5,6); // row number of checked field
    var fieldY = fieldId.substring(6,7); // column number of checked field
    
    if(IsFieldValid(fieldX, fieldY) && !gameOver){ 
        document.getElementById(fieldId).classList.remove("neutral");
        document.getElementById(fieldId).classList.remove("availableFields");

        if(turn % 2 == 0){
            document.getElementById(fieldId).classList.add("red");
            fields[fieldX][fieldY] = 1;
        } else{
            document.getElementById(fieldId).classList.add("yellow");
            fields[fieldX][fieldY] = 2;
        }
        
        if(CheckForWinner(fieldX, fieldY)){
            if(turn % 2 == 0){
                document.getElementById('player1').textContent = "Player 1 winner";
                gameOver = true;
            } else{
                document.getElementById('player2').textContent = "Player 2 winner";
                gameOver = true;
            }
        }

        if(!gameOver){
            AvailableFields(fieldX, fieldY);
        } else {
            SetFieldsNeutral();
        }

        turn++;
    }
}


// Checks if field is valid for current board values
function IsFieldValid(fieldX, fieldY){
    if(fields[fieldX][fieldY] != 0){
        return false;
    }
    if(fieldX == 5 || fields[parseInt(fieldX) + 1][fieldY] > 0){
        return true;
    }
    return false;
}

function CheckForWinner(fieldX, fieldY){
    if(turn < 6){
        return false;
    }
    if(CountInRow(fieldX, fieldY)){ // Check in row combination
        return true;
    }
    if(CountInColumn(fieldX, fieldY)){ // Check in column combination
        return true;
    }
    if(CountInLeftDiagonal(fieldX, fieldY)){ // Check left diagonal combination
        return true;
    }
    if(CountInRightDiagonal(fieldX, fieldY)){ // Check right diagonal combination
        return true;
    }

    return false;
}

function CountInRow(fieldX, fieldY){
    var playerId = fields[fieldX][fieldY];
    var leftside=0, rightside=0;
    
    for(var i = parseInt(fieldY) + 1; i <= 6; i++){
        if(playerId == fields[fieldX][i]){
            leftside++;
        } else 
        break;
    }
    for(var i = parseInt(fieldY) - 1; i >= 0; i--){
        if(playerId == fields[fieldX][i]){
            rightside++;
        }else 
        break;
    }
    if(leftside + rightside + 1 > 3){
        return true;
    }
    return false;
}

function CountInColumn(fieldX, fieldY){
    var playerId = fields[fieldX][fieldY];
    var downside = 0;

    if(fieldX > 3){
        return false;
    }

    for(var i = parseInt(fieldX) + 1; i <= 5; i++){
        if(playerId == fields[i][fieldY]){
            downside++;

        }else 
        break;
    }

    if(downside + 1 > 3){
        return true;
    }
    return false;
}

function CountInLeftDiagonal(fieldX, fieldY){
    var playerId = fields[fieldX][fieldY];
    var leftup=0, rightdown = 0;
    if(!IsInvalidFieldsLeftDiagonal(fieldX, fieldY)){
    for(var i = 1; i < 4; i++){
        if(parseInt(fieldX) - i < 0 || parseInt(fieldY) - i < 0){
            break;
        }
        if(playerId == fields[parseInt(fieldX)-i][parseInt(fieldY)-i]){
            leftup++;
        }else 
        break;
    }

    for(var i = 1; i < 4; i++){
        if(parseInt(fieldX) + i > 5 || parseInt(fieldY) + i > 6){
            break;
        }
        if(playerId == fields[parseInt(fieldX) + i][parseInt(fieldY) + i]){
            rightdown++;
        }else 
        break;
    }

    if(leftup + rightdown + 1 > 3) {
        return true;
    }
    }

    return false;
}

// Don't check fields i up right and down left corner
function IsInvalidFieldsLeftDiagonal(fieldX, fieldY){
    if((fieldX == 0 && fieldY > 3) || (fieldX == 1 && fieldY > 4)
    || (fieldX == 2 && fieldY == 6) || (fieldX == 3 && fieldY == 0)
    || (fieldX == 4 && fieldY < 2) || (fieldX == 5 && fieldY < 3)){
        return true;
    }
    return false;
}

function CountInRightDiagonal(fieldX, fieldY){
    var playerId = fields[fieldX][fieldY];
    var leftdown=0, rightup = 0;
    if(!IsInvalidFieldsRightDiagonal(fieldX, fieldY)){
    for(var i = 1; i < 4; i++){
        if(parseInt(fieldX) - i < 0 || parseInt(fieldY) + i > 6){
            break;
        }
        if(playerId == fields[parseInt(fieldX) - i][parseInt(fieldY) + i]){
            rightup++;  
        }else 
        break;
    }

    for(var  i = 1; i < 4; i++){
        if(parseInt(fieldX) + i > 5 || parseInt(fieldY) - i < 0){
            break;
        }
        if(playerId == fields[parseInt(fieldX) + i][parseInt(fieldY) - i]){
            leftdown++;
        }else 
        break;
    }

    if(leftdown + rightup + 1 > 3) {
        return true;
    }
    }

    return false;
}

// Don't check fields i up let and down right corner
function IsInvalidFieldsRightDiagonal(fieldX, fieldY){
    if((fieldX == 0 && fieldY < 3) || (fieldX == 1 && fieldY < 2)
    || (fieldX == 2 && fieldY == 0) || (fieldX == 3 && fieldY == 6)
    || (fieldX == 4 && fieldY > 4) || (fieldX == 5 && fieldY > 3)){
        return true;
    }
    return false;
}

// Mark First row as availabe fields when game starts
function FirstTurnAvailableFields(){
    for(var i = 0; i <= 6 ; i++){
        document.getElementById("field5" + i).classList.remove("neutral");
        document.getElementById("field5" + i).classList.add("availableFields");
    }
}

// Mark next field in column as available
function AvailableFields(fieldX, fieldY){
    if(fieldX > 0){
        document.getElementById("field" + (parseInt(fieldX)-1) + fieldY).classList.remove("neutral");
        document.getElementById("field" + (parseInt(fieldX)-1) + fieldY).classList.add("availableFields");
    }   
}

// Set all available fields as neutral
function SetFieldsNeutral(){
    for(var i = 0; i < 6 ; i++){
        for(var j = 0; j < 7; j++){
            if(fields[i][j] == 0){  
                document.getElementById("field" + i + j).classList.remove("availableFields");
                document.getElementById("field" + i + j).classList.add("neutral");
            }
        }
    }
}

// Set all fields as neutral
function SetFieldsNeutralNewGame(){
    for(var i = 0; i < 6 ; i++){
        for(var j = 0; j < 7; j++){
            if(fields[i][j] == 0){
                document.getElementById("field" + i + j).classList.remove("availableFields");
                document.getElementById("field" + i + j).classList.add("neutral");
            } else if (fields[i][j] == 1){
                document.getElementById("field" + i + j).classList.remove("red");
                document.getElementById("field" + i + j).classList.add("neutral"); 
            } else {
                document.getElementById("field" + i + j).classList.remove("yellow");
                document.getElementById("field" + i + j).classList.add("neutral"); 
            }
        }
    }
}