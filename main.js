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
      let angle = Math.floor(Math.random() * 180);
      orbs.push({ x: x, y: 600, angle: angle });
    }

    var player = {
      x:Math.floor(el.width / 2.2),
      y:Math.floor(el.height / 1.07),
      speed: 2
    }

    function drawPlayer(x,y) {
      var x = player.x;
      var y = player.y;
      ctx.fillStyle = "#00FF";
      ctx.beginPath();
      ctx.moveTo(player.x,player.y);
      ctx.fillRect(x, y, 200, 20);
      ctx.strokeRect(x, y, 200, 20);
      ctx.fill();
      if(player.x < 0)
      {
        LEFT = false;
      }
      
      if(player.x + 200 > el.width)
      {
        RIGHT = false;
      }
      ctx.closePath();
    }

    var LEFT = false; 
    var RIGHT = false;
    
    function move() {    
      if(LEFT) { 
        player.x -= player.speed;
      }
      if(RIGHT) {
        player.x += player.speed;	
      }   
    }
    
    document.onkeydown = function(e) {
      if(e.keyCode == 37) LEFT = true;
      if(e.keyCode == 39) RIGHT = true;
    }
    
    document.onkeyup = function(e) {
      if(e.keyCode == 37) LEFT = false;
      if(e.keyCode == 39) RIGHT = false;
    }

    function loadOrb() {
      orbs.forEach((orb) => {
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, 10, 5, 10 * Math.PI);
        orb.x += Math.cos(deg2rad(orb.angle))/3;
        orb.y += Math.sin(deg2rad(orb.angle));
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        let dist = Math.abs(orb.x - player.x - 200 / 2) 

        if (orb.x - 10 < 0 || orb.y - 10 < 0 || orb.x + 10 > el.width || orb.y + 10 > el.height) {
          orb.angle += 90;
          orb.angle %= 360;
        }
        if (orb.y + 10 > player.y && dist < 100)
        {
          orb.angle += 90;
          orb.angle %= 360;
        }
        else{
        }
      });
    }

    setInterval(() => {
      ctx.clearRect(0, 0, el.width, el.height);
      loadOrb();
      drawPlayer();
      move();
    }, 2);
  });
