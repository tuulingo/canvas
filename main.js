 WholeGame();
 function WholeGame() {
  console.log("ok")
  let deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  
  let rad2deg = (rad) => {
    return rad * (180 / Math.PI);
  };
  
  window.addEventListener("load", () => {
    let el = document.querySelector("#canvas");
    el.width = window.innerWidth;
    el.height = window.innerHeight;
    let ctx = el.getContext("2d");
    let orbs = [];
    for (let i = 0; i < 1; i++) {
      let x = Math.floor(el.width / 2);
      let y = Math.floor(el.height / 1.1);
      let angle = Math.floor(Math.random() * -180);
      orbs.push({ x: x, y: y, angle: angle });
    }
  
    var colors = ["blue", "green", "yellow", "orange", "red"]
  
    let row1 = [13];
    for (let i = 0; i < 13; i++) {
      let x = 130 * i;
      let y = Math.floor(el.height / 10);
      row1.push({ x: x + 100, y: y, width: 125, height: 75, color:colors[Math.floor(Math.random() * colors.length)] });
    }
  
    let row2 = [13];
    for (let i = 0; i < 13; i++) {
      let x = 130 * i;
      let y = Math.floor(el.height / 5.5);
      row2.push({ x: x + 100, y: y, width: 125, height: 75, color:colors[Math.floor(Math.random() * colors.length)] });
    }
  
    let row3 = [13];
    for (let i = 0; i < 13; i++) {
      let x = 130 * i;
      let y = Math.floor(el.height / 3.77);
      row3.push({ x: x + 100, y: y, width: 125, height: 75, color:colors[Math.floor(Math.random() * colors.length)] });
    }
  
    let row4 = [13];
    for (let i = 0; i < 13; i++) {
      let x = 130 * i;
      let y = Math.floor(el.height / 2.86);
      row4.push({ x: x + 100, y: y, width: 125, height: 75, color:colors[Math.floor(Math.random() * colors.length)] });
    }
  
    function createBlocks() {
      row1.forEach((block) => {
        ctx.beginPath();
        ctx.fillRect(block.x, block.y, 125, 75);
        ctx.fillStyle = colors[4];
        ctx.fill();
        ctx.closePath();
      });
  
      row2.forEach((block) => {
        ctx.beginPath();
        ctx.fillRect(block.x, block.y, 125, 75);
        ctx.fillStyle = colors[3];
        ctx.fill();
        ctx.closePath();
      });
  
      row3.forEach((block) => {
        ctx.beginPath();
        ctx.fillRect(block.x, block.y, 125, 75);
        ctx.fillStyle = colors[2];
        ctx.fill();
        ctx.closePath();
      });
  
      row4.forEach((block) => {
        ctx.beginPath();
        ctx.fillRect(block.x, block.y, 125, 75);
        ctx.fillStyle = colors[1];
        ctx.fill();
        ctx.closePath();
      });
    }
    
  
    var player = {
      x: Math.floor(el.width / 2.2),
      y: Math.floor(el.height / 1.07),
      speed: 2
    }
  
    function drawPlayer(x, y) {
      var x = player.x;
      var y = player.y;
      ctx.fillStyle = "#0000FF";
      ctx.beginPath();
      ctx.moveTo(player.x, player.y);
      ctx.fillRect(x, y, 200, 20);
      ctx.strokeRect(x, y, 200, 20);
      ctx.fill();
      if (player.x < 0) {
        LEFT = false;
      }
  
      if (player.x + 200 > el.width) {
        RIGHT = false;
      }
      ctx.closePath();
    }
  
    var LEFT = false;
    var RIGHT = false;
  
    function move() {
      if (LEFT) {
        player.x -= player.speed;
      }
      if (RIGHT) {
        player.x += player.speed;
      }
    }
  
    document.onkeydown = function (e) {
      if (e.keyCode == 37) LEFT = true;
      if (e.keyCode == 39) RIGHT = true;
    }
  
    document.onkeyup = function (e) {
      if (e.keyCode == 37) LEFT = false;
      if (e.keyCode == 39) RIGHT = false;
    }
  
    function loadOrb() {
      orbs.forEach((orb) => {
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, 7, 5, 7 * Math.PI);
        orb.x += Math.cos(deg2rad(orb.angle)) * 3;
        orb.y += Math.sin(deg2rad(orb.angle)) * 2;
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.closePath();
  
        let distPlayer = Math.abs(orb.x - player.x - 200 / 2) 
  
        if (orb.x - 5 < 0 || orb.x + 5 > el.width) orb.angle = 180 - orb.angle;
        if (orb.y - 5 < 0 || orb.y + 5 > el.height) orb.angle = 360 - orb.angle;
  
        if (orb.y + 5 > player.y && distPlayer < 100)
        {
          orb.angle -= 90;
        }
        for (var i = 0; i < row1.length; i++) {
          var row = row1[i];
          let distBlockBallx = Math.abs(orb.x - row.x - 125 / 2)
          let distBlockBally = Math.abs(orb.y - row.y - 75 / 2)
          if (distBlockBally < 37.5 + 7 && distBlockBallx < 62.5 + 7) {
            if (distBlockBally < 37.5 + 6 )
            {
              orb.angle = 180 - orb.angle;
              row1.splice(i, 1);
              ctx.beginPath();
              ctx.closePath();
            }
            else
            {
              orb.angle = 360 - orb.angle;
              row1.splice(i, 1);
              ctx.beginPath();
              ctx.closePath();
            }
          }  
        }
  
        for (var i = 0; i < row2.length; i++) {
          var row = row2[i];
          let distBlockBallx = Math.abs(orb.x - row.x - 125 / 2)
          let distBlockBally = Math.abs(orb.y - row.y - 75 / 2)
          if (distBlockBally < 37.5 + 7 && distBlockBallx < 62.5 + 7) {
            if (distBlockBally < 37.5 + 6 )
            {
              orb.angle = 180 - orb.angle;
              row2.splice(i, 1);
              ctx.beginPath();
              ctx.closePath();
            }
            else
            {
              orb.angle = 360 - orb.angle;
              row2.splice(i, 1);
              ctx.beginPath();
              ctx.closePath();
            }
          }  
        }
  
        
        for (var i = 0; i < row3.length; i++) {
          var row = row3[i];
          let distBlockBallx = Math.abs(orb.x - row.x - 125 / 2)
          let distBlockBally = Math.abs(orb.y - row.y - 75 / 2)
          if (distBlockBally < 37.5 + 7 && distBlockBallx < 62.5 + 7) {
            if (distBlockBally < 37.5 + 6 )
            {
              orb.angle = 180 - orb.angle;
              row3.splice(i, 1);
              ctx.beginPath();
              ctx.closePath();
            }
            else
            {
              orb.angle = 360 - orb.angle;
              row3.splice(i, 1);
              ctx.beginPath();
              ctx.closePath();
            }
          }  
        }
  
        for (var i = 0; i < row4.length; i++) {
          var row = row4[i];
          let distBlockBallx = Math.abs(orb.x - row.x - 125 / 2)
          let distBlockBally = Math.abs(orb.y - row.y - 75 / 2)
          if (distBlockBally < 37.5 + 7 && distBlockBallx < 62.5 + 7) {
            if (distBlockBally < 37.5 + 6 )
            {
              orb.angle = 180 - orb.angle;
              row4.splice(i, 1);
              ctx.beginPath();
              ctx.closePath();
            }
            else
            {
              orb.angle = 360 - orb.angle;
              row4.splice(i, 1);
              ctx.beginPath();
              ctx.closePath();
            }
          }  
        }
  
        if (orb.y- 20 > player.y) {
          return gameOver = true;
        }
      });
    }    
  
    let gameOver = false
  
  
      setInterval(() => {
        if (gameOver != true)
        {
        ctx.clearRect(0, 0, el.width, el.height);
        loadOrb();
        drawPlayer();
        move();
        createBlocks();
        }
        else
        {
          ctx.clearRect(0, 0, el.width, el.height);
          var gameDiv = document.getElementById("gameOver");
          var againBtn = document.getElementById("playAgainBtn");
          gameDiv.style.display = "block";
          setTimeout(againBtn.style.display = "block", 5000);
          clearInterval();
        } 
  
    
      }, 1);
  });
};


