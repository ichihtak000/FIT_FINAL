var myGamePiece;
var myObstacles = [];
var myScore;
var direction = 0;
var x_speed = 0;
var y_speed = 0;
// var ghost;
var myObstacle;
function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    
    myObstacle  = new component(10, 130, "red", 1195,150 ); 
    // ghost = new component(100,100,"red",50,50);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1200;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
          myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
          myGameArea.key = false;
        })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.updateGhost = function(){
      ctx = myGameArea.context;
      var img = document.createElement("IMG");s
      img.setAttribute("src","pac_game_up.png" );
      ctx.drawImage(img,this.x, this.y, this.width, this.height);
      // this.x += this.speedX;
      // this.y += this.speedY;
    }
    this.updatePac = function(direction){
      ctx = myGameArea.context;
        var img = document.createElement("IMG");
        var pac_img = "";
        if(direction == 1){
          pac_img = "pac_game_up.png"
        }else if(direction == 2){
          pac_img = "pac_game_down.png"
        }else if(direction == 3){
          pac_img = "pac_game_left.png"
        }else {
          pac_img = "pac_game_right.png"
        }
        img.setAttribute("src", pac_img);
        ctx.drawImage(img,this.x, this.y, this.width, this.height);
    }
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
      
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            window.location.href = "lose.html";
        } 
    }
    if(myGamePiece.crashWith(myObstacle)){
      window.location.href = "win.html";
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(100)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);

        myObstacles.push(new component(10, height, "black", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -2;
        myObstacles[i].update();
    }
    control();
    myGamePiece.newPos();
    myGamePiece.update();
    myGamePiece.updatePac(direction);
    myObstacle.update();
    

}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function control(){
  if (myGameArea.key && myGameArea.key == 37) {x_speed = -2;y_speed = 0; direction = 3;}
  if (myGameArea.key && myGameArea.key == 39) {x_speed = 2;y_speed = 0; direction = 4;}
  if (myGameArea.key && myGameArea.key == 38) {x_speed = 0;y_speed= -2; direction = 1;}
  if (myGameArea.key && myGameArea.key == 40) {x_speed = 0; y_speed = 2; direction = 2; }
  
  myGamePiece.speedX = x_speed;myGamePiece.speedY = y_speed;
}

function ghostMove(){
  ghost.speedY = 1;
  if(ghost.y + ghost.height > myGameArea.canvas.height){
    ghost.speedY=-1;
  }
  if(ghost.y < 0){
    ghost.speedY = 1;
  }
}

