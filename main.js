window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
}

WholeGame();
function WholeGame() {
  let gameOver = false;
  let gameWon = false;
  let deg2rad = (deg) => {
    return deg * (Math.PI / 180);
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
      let angle = Math.floor(Math.random() * (-135 + 45 - 1) - 45);
      orbs.push({ x: x, y: y, angle: angle });
    }

    var colors = ["blue", "green", "yellow", "orange", "red"]

    let row1 = [13];
    let row2 = [13];
    let row3 = [13];
    let row4 = [13];

    var blockWidth = Math.floor(el.width / 15.36);
    var blockHeight = Math.floor(el.height / 12.49);

    console.log(Math.floor(el.width / 15.36));

    for (let i = 0; i < 13; i++) {
      let x = (blockWidth + 5) * i;
      let y = Math.floor(el.height / 10);
      let y2 = Math.floor(el.height / 5.5);
      let y3 = Math.floor(el.height / 3.77);
      let y4 = Math.floor(el.height / 2.86);
      console.log(x + "   "+ i);

      row1.push({ x: x + Math.floor(el.width / 18), y: y, width: blockWidth, height: blockHeight, color: colors[Math.floor(Math.random() * colors.length)] });
      row2.push({ x: x + Math.floor(el.width / 18), y: y2, width: blockWidth, height: blockHeight, color: colors[Math.floor(Math.random() * colors.length)] });
      row3.push({ x: x + Math.floor(el.width / 18), y: y3, width: blockWidth, height: blockHeight, color: colors[Math.floor(Math.random() * colors.length)] });
      row4.push({ x: x + Math.floor(el.width / 18), y: y4, width: blockWidth, height: blockHeight, color: colors[Math.floor(Math.random() * colors.length)] });
    }

    function createBlocks() {
      row1.forEach((block) => {
        ctx.beginPath();
        ctx.fillRect(block.x, block.y, blockWidth, blockHeight);
        ctx.fillStyle = colors[4];
        ctx.fill();
        ctx.closePath();
      });

      row2.forEach((block) => {
        ctx.beginPath();
        ctx.fillRect(block.x, block.y, blockWidth, blockHeight);
        ctx.fillStyle = colors[3];
        ctx.fill();
        ctx.closePath();
      });

      row3.forEach((block) => {
        ctx.beginPath();
        ctx.fillRect(block.x, block.y, blockWidth, blockHeight);
        ctx.fillStyle = colors[2];
        ctx.fill();
        ctx.closePath();
      });

      row4.forEach((block) => {
        ctx.beginPath();
        ctx.fillRect(block.x, block.y, blockWidth, blockHeight);
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

    var playerSizeX = Math.floor(el.width / 9.6)
    var playerSizeY = Math.floor(el.height / 46.85)
    function drawPlayer(x, y) {
      var x = player.x;
      var y = player.y;
      ctx.fillStyle = "#0000FF";
      ctx.beginPath();
      ctx.moveTo(player.x, player.y);
      ctx.fillRect(x, y, playerSizeX, playerSizeY);
      ctx.strokeRect(x, y, playerSizeX, playerSizeY);
      ctx.fill();
      if (player.x < 0) {
        LEFT = false;
      }

      if (player.x + Math.floor(el.width / 9.6) > el.width) {
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

    var ballSize = Math.floor(el.height / 150)
    function loadOrb() {
      orbs.forEach((orb) => {
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, ballSize, 5, ballSize * Math.PI);
        orb.x += Math.cos(deg2rad(orb.angle)) * 3;
        orb.y += Math.sin(deg2rad(orb.angle)) * 2;
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.closePath();

        let distPlayer = Math.abs(orb.x - player.x - playerSizeX / 2)

        if (orb.x - 5 < 0 || orb.x + 5 > el.width) orb.angle = 180 - orb.angle;
        if (orb.y - 5 < 0 || orb.y + 5 > el.height) orb.angle = 360 - orb.angle;

        if (orb.y + 5 > player.y && distPlayer < playerSizeX / 2) {
          if(LEFT)
          {
            orb.angle = 20 - orb.angle;
            orb.angle %= 360;
          }
          else if(RIGHT)
          {
          orb.angle = 340 - orb.angle;
          orb.angle %= 360;
          }
          else
          orb.angle = 360 - orb.angle;
        }
        for (var i = 0; i < row1.length; i++) {
          var row = row1[i];
          let distBlockBallx = Math.abs(orb.x - row.x - blockWidth / 2)
          let distBlockBally = Math.abs(orb.y - row.y - blockHeight / 2)
          if (distBlockBally < blockHeight / 2 + 7 && distBlockBallx < blockWidth / 2 + 7) {
            if (distBlockBally < blockHeight / 2) {
              orb.angle = 180 - orb.angle;
              row1.splice(i, 1);
            }
            else {
              orb.angle = 360 - orb.angle;
              row1.splice(i, 1);
            }
          }
        }

        for (var i = 0; i < row2.length; i++) {
          var row = row2[i];
          let distBlockBallx = Math.abs(orb.x - row.x - blockWidth / 2)
          let distBlockBally = Math.abs(orb.y - row.y - blockHeight / 2)
          if (distBlockBally < blockHeight / 2 + 7 && distBlockBallx < blockWidth / 2 + 7) {
            if (distBlockBally < blockHeight / 2) {
              orb.angle = 180 - orb.angle;
              row2.splice(i, 1);
            }
            else {
              orb.angle = 360 - orb.angle;
              row2.splice(i, 1);
            }
          }
        }


        for (var i = 0; i < row3.length; i++) {
          var row = row3[i];
          let distBlockBallx = Math.abs(orb.x - row.x - blockWidth / 2)
          let distBlockBally = Math.abs(orb.y - row.y - blockHeight / 2)
          if (distBlockBally < blockHeight / 2 + 7 && distBlockBallx < blockWidth / 2 + 7) {
            if (distBlockBally < blockHeight / 2) {
              orb.angle = 180 - orb.angle;
              row3.splice(i, 1);
            }
            else {
              orb.angle = 360 - orb.angle;
              row3.splice(i, 1);
            }
          }
        }

        for (var i = 0; i < row4.length; i++) {
          var row = row4[i];
          let distBlockBallx = Math.abs(orb.x - row.x - blockWidth / 2)
          let distBlockBally = Math.abs(orb.y - row.y - blockHeight / 2)
          if (distBlockBally < blockHeight / 2 + 7 && distBlockBallx < blockWidth / 2 + 7) {
            if (distBlockBally < blockHeight / 2) {
              orb.angle = 180 - orb.angle;
              row4.splice(i, 1);
            }
            else {
              orb.angle = 360 - orb.angle;
              row4.splice(i, 1);
            }
          }
        }

        if (orb.y - 20 > player.y) {
          return gameOver = true;
        }

        if (row1.length + row2.length + row3.length + row4.length == 4)
        {
          return gameWon = true;
        }
      });
    }

    setInterval(() => {
      if (gameWon == true)
      {
        document.getElementById("gameWon").style.display = "block";
        document.getElementById("playAgainWon").style.backgroundColor = "rgb(3, 197, 3)";
        clearInterval();
      }
      else if (gameOver != true) {
        ctx.clearRect(0, 0, el.width, el.height);
        loadOrb();
        drawPlayer();
        move();
        createBlocks();
      }
      else {
        ctx.clearRect(0, 0, el.width, el.height);
        document.getElementById("gameOver").style.display = "block";
        document.getElementById("playAgainLost").style.backgroundColor = "rgb(145, 24, 24)";
        clearInterval();
      }


    }, 1);
  });
};


