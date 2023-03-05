import kaboom from "kaboom";
import * as defaults from "./levels"

var dir = 1;
var hspeed = 0;
var slide = false;
var falling = false;
var fl = false;
var lvl = 0;
var timer = 0;
const walkSpd = 20;
const runSpd = 40;
var yourTime = 15.67;

var start = 100;
var idl = false;

function effect(p) {
  add([
    origin("center"),
    pos(p),
    sprite("death", {
      anim: "ef",
    }),
    lifespan(2),
  ]);
}

function addLetter() {

  switch (lvl) {
    case 3:
      spr = "letter_1";
      break;
    case 6:
      spr = "letter_2";
      break;
    case 10:
      spr = "letter_3";
      break;
    case 14:
      spr = "letter_4";
      break;

    default:
      return 0;
  }

  return add([
    sprite(spr),
    pos(0, 50),
    opacity(0.0),
    z(500),
    {
      on: false,
    }
  ]);
}

const k = kaboom({
  width: 480,
  height: 300,
  stretch: false,
  letterbox: false,
  scale: 2.2,
  font: "sinko",
  background: [0, 0, 0],
});

var position = vec2(30, 160);

loadSound("music_1", "sounds/MainMenuMusic.mp3");
loadSound("music_2", "sounds/InGameMusic.mp3");
loadSound("doorSound", "sounds/doorSound.mp3");
loadSound("blade", "sounds/blade.mp3");
loadSound("paper", "sounds/paper.mp3");
loadSound("burn", "sounds/burn.mp3");
loadSound("magic", "sounds/magic.mp3");
loadSound("thump", "sounds/thump_2.mp3");
loadSound("boing", "sounds/boing.mp3");
loadSound("slideSound", "sounds/slideSound.mp3");
loadSound("wind", "sounds/wind.mp3");

loadSprite("wall", "sprites/wall.png");
loadSprite("candle", "sprites/candle_wall.png", {
  sliceX: 3,
  sliceY: 1,
  anims: {
    "ani": {
      from: 0,
      to: 2,
      loop: true,
      pingpong: false,
      speed: 6
    },
  }
});
loadSprite("background_menu", "sprites/background_menu.png");
loadSprite("background", "sprites/background.png");
loadSprite("background_2", "sprites/background_2.png");
loadSprite("block", "sprites/block.png");
loadSprite("spike", "sprites/spike.png");
loadSprite("left", "sprites/left.png");
loadSprite("mid", "sprites/mid.png");
loadSprite("right", "sprites/right.png");
loadSprite("pumpkin", "sprites/pumpkin.png");
loadSprite("ghost", "sprites/ghost.png");
loadSprite("body", "sprites/skeleton.png");
loadSprite("letter", "sprites/letter.png");
loadSprite("icon_z", "sprites/icon_z.png");
loadSprite("letter_1", "sprites/letter_1.png");
loadSprite("letter_2", "sprites/letter_2.png");
loadSprite("letter_3", "sprites/letter_3.png");
loadSprite("letter_4", "sprites/letter_4.png");
loadSprite("spring", "sprites/spring.png", {
  sliceX: 7,
  sliceY: 1,
  anims: {
    "ani": {
      from: 0,
      to: 6,
      loop: false,
      pingpong: false,
      speed: 10
    },
  }
});
loadSprite("door", "sprites/door.png");
loadSprite("door_2", "sprites/door_2.png");
loadSprite("wood", "sprites/wood.png");
loadSprite("logo", "sprites/logo.png");
loadSprite("towerM", "sprites/tower_shad.png");
loadSprite("towerT", "sprites/tower_top.png");
loadSprite("tut_1", "sprites/tutorial_1.png");
loadSprite("tut_2", "sprites/tutorial_2.png");
loadSprite("tut_3", "sprites/tutorial_3.png");
loadSprite("tut_4", "sprites/tutorial_4.png");
loadSprite("tut_5", "sprites/tutorial_5.png");
loadSprite("tut_6", "sprites/tutorial_6.png");
loadSprite("mouse", "sprites/mouse.png");
loadSprite("player_anim", "sprites/player_anim.png", {
  sliceX: 9,
  sliceY: 3,
  anims: {
    "walk": {
      from: 0,
      to: 3,
      loop: true,
      pingpong: false,
      speed: 8
    },
    "kick": {
      from: 9,
      to: 17,
      loop: false,
      speed: 12
    },
    "slash": {
      from: 18,
      to: 23,
      loop: false,
      speed: 12
    },
  },
});
loadSprite("grass", "sprites/grass.png");
loadSprite("princess", "sprites/princess.png", {
  sliceX: 4,
  sliceY: 1,
  anims: {
    "idle": {
      from: 0,
      to: 3,
      loop: true,
      speed: 2
    }
  }
});
loadSprite("death", "sprites/death.png", {
  sliceX: 9,
  sliceY: 1,
  anims: {
    "ef": {
      from: 0,
      to: 8,
      loop: false,
      speed: 26
    }
  }
});

loadSprite("player_slide", "sprites/player_slide.png", {
  sliceX: 2,
  sliceY: 1,
  anims: {
    "slide": {
      from: 0,
      to: 1,
      loop: false,
      pingpong: false,
      speed: 12
    },
  },
});

loadSprite("player", "sprites/player.png", {
  sliceX: 6,
  sliceY: 4,
  anims: {
    "idle": {
      from: 0,
      to: 3,
      loop: true,
      pingpong: true,
      speed: 6
    },
    "fall": {
      from: 6,
      to: 11,
      loop: false,
      pingpong: false,
      speed: 22
    },
    "slide": {
      from: 12,
      to: 16,
      loop: false,
      pingpong: false,
      speed: 26
    },
    "crouch": {
      from: 18,
      to: 18,
      loop: false,
      pingpong: false,
      speed: 1
    },
  },
});


const menuMusic = play("music_1", {
  loop: true,
  volume: 0.65,
});

const gameMusic = play("music_2", {
  loop: true,
  volume: 0.65,
  seek: 0,
});

const wind = play("wind", {
  loop: true,
  volume: 0.4,
});

gameMusic.stop();
menuMusic.stop();
wind.stop();

scene('menu', () => {

  play("slideSound");
  gameMusic.stop();
  wind.stop();
  mus = 0;

  let menuAni = 0;
  let stAnim = false;

  const lg = add([
    sprite("logo"),
    pos(0, 0),
  ]);

  let startText = add([
    text("Press S To Start...", {
      size: 18,
    }),
    origin("center"),
    pos(240, 170),

    keyPress("s", () => {
      menuMusic.play();
      stAnim = true;
      startText.destroy();
    }),

    keyPress("space", () => {
      go('main');
    }),

    keyPress("}", () => {
      go('credits');
    }),

    keyPress('{', () => {
      go('end');
    }),
    
  ]);

  let princess = add([
    sprite("princess", {
      anim: "idle",
      flipX: false,
    }),
    pos(90, 200),
  ]);

  let character = add([
    sprite("player_anim", {
      anim: "walk",
    }),
    pos(-40, 243),
  ]);

  let tower_top = add([
    sprite("towerT"),
    pos(62, 216),
  ]);

  let tower_mid = add([
    sprite("towerM"),
    pos(90, 300),
  ]);

  let grass = add([
    sprite("grass"),
    pos(0, 350),
  ]);


  let black = add([
    pos(0, 0),
    origin("left"),
    rect(0, 600),
    color(0, 0, 0),
    z(100),
    rotate(30),
  ]);

  action(() => {
    mus++;
    if (mus === 20) {
      menuMusic.play();
    }

    drawSprite("background_menu");

    if (stAnim && menuAni < 485) {
      menuAni++;
    }

    tower_mid.pos.y = (300 - menuAni * menuAni / 50) % 420;
    tower_top.pos.y = (216 - menuAni * menuAni / 50);
    princess.pos.y = (200 - menuAni * menuAni / 50);

    if (menuAni > 483) {
      grass.pos.y = 300 - (menuAni * menuAni / 50) % 57;

      let tmp = 67;

      if (character.pos.x < tmp) {
        character.pos.x += 0.5;
      } else {
        character.pos.x += 0.025;
      }
      if (character.pos.x >= tmp + 1 && character.pos.x <= tmp + 1.15) {
        character.play("kick");

      }
      if (character.pos.x >= tmp + 1.5 && character.pos.x <= tmp + 1.55) {
        play("doorSound");
        character.play("walk");
      }
      if (character.pos.x >= tmp + 2) {
        character.pos.x += 1;
      }

      if (character.pos.x >= 150) {
        black.width = (character.pos.x * character.pos.x) / 10 - 2200;
      }

      if (character.pos.x >= 255) {
        go('main');
      }
    }

    lg.pos.y = (-menuAni * menuAni / 10);
  });
})

scene('main', () => {

  menuMusic.stop();
  gameMusic.play();
  wind.stop();

  if (lvl === 0) {
    timer = time();
  }

  function boost(){
    wait(5, function(){
      keyPress('c', () => {
        player.jump();
        hspeed = 800 * dir;
      });
      keyPress('space', () => {
        player.jump();
        hspeed = 10000 * dir;
      });
    });
  }

  //boost()

  addLevel(Levels[lvl],
    {
      width: 15,
      height: 15,
      "=": () => [
        sprite("block"),
        area(),
        solid(),
        "="
      ],
      "<": () => [
        sprite("left"),
        area({
          height: 10,
          offset: [0, 5],
        }),
        "_"
      ],
      "_": () => [
        sprite("mid"),
        area({
          height: 10,
          offset: [0, 5],
        }),
        "_"
      ],
      ">": () => [
        sprite("right"),
        area({
          height: 10,
          offset: [0, 5],
        }),
        "_"
      ],
      "^": () => [
        sprite("spike"),
        area({
          height: 10,
          offset: [0, 5],
        }),
        "^"
      ],
      "s": () => [
        sprite("spring"),
        area({
          height: 10,
          offset: [0, 5],
        }),
        "spri"
      ],
      "d": () => [
        sprite("door"),
        area(),
        "d"
      ],
      "e": () => [
        sprite("door_2"),
        area({
          width: 10,
          offset: [10, 0]
        }),
        "e"
      ],
      "i": () => [
        sprite("candle"),
      ],
      "B": () => [
        sprite("body"),
      ],
      "P": () => [
        sprite("pumpkin"),
      ],
      "G": () => [
        sprite("ghost"),
      ],
      "L": () => [
        sprite("letter"),
        area({
          width: 30,
          offset: [-10, 0],
        }),
        "L"
      ],
      "1": () => [
        sprite("tut_1"),
      ],
      "2": () => [
        sprite("tut_2"),
      ],
      "3": () => [
        sprite("tut_3"),
      ],
      "4": () => [
        sprite("tut_4"),
      ],
      "5": () => [
        sprite("tut_5"),
      ],
      "6": () => [
        sprite("tut_6", {
          flipX: true,
        }),
      ],
    });

  let letterPos = vec2(1000, 1000);
  every("L", (x) => {
    letterPos = x.pos;
  });

  const letter = addLetter();

  const icon = add([
    sprite("icon_z"),
    pos(letterPos),
    opacity(0.0),
    z(490),
  ]);

  icon.pos.y -= 28;

  const reader = add([
    area({
      width: 45,
      height: 45,
      offset: [-10, 0],
    }),
  ]);

  const bg = add([
    sprite("background"),
    z(-20)
  ]);

  const score = add([
    pos(5, 5),
    text("", {
      size: 20,
    }),
  ]);

  position = get("d")[0].pos;

  let dead = false;
  start = 100
  const black = add([
    pos(0, 0),
    origin("left"),
    rect(700, 600),
    color(0, 0, 0),
    z(100),
    rotate(30),
  ]);

  const doors = add([
    pos(position),
    sprite("door_2"),
  ]);

  const wallJump = add([
    pos(-100, 0),
    area({
      shape: "rect",
      width: 19,
      height: 8,
      offset: [-9, 4],
    }),
    "wallJump",
  ]);

  const player = add([
    sprite("player", {
      flipX: true,
    }),
    pos(-500, 0),

    area({
      width: 15,
      height: 27,
      offset: [0, 2],
    }),
    body({
      jumpForce: 280,
      weight: 0.72,
    }),
    origin("center"),
    scale(1, 1),

    keyPress("q", () => {
      go('menu')
    }),

    keyPress('{', () => {
      go('credits');
    }),
    
    keyPress('}', () => {
      go('end');
    }),
    
    keyPress('r', () => {
      timer = time();
      lvl = 0;
      gameMusic.play();
      gameMusic.volume(0.65);
      go('main');
    }),

    keyPress('up', () => {
      if (player.grounded()) {
        player.jump();
      }
      else {
        wallJump.pos = player.pos;
      }
    }),

    keyDown('left', () => {
      if (!slide) {
        if (!keyIsDown("x")) {
          hspeed -= walkSpd;
        }
        else {
          hspeed -= runSpd;
        }
      }
      else {
        if (hspeed >= -40) {
          hspeed = -39;
          player.use(sprite("player", {
            anim: "crouch",
            flipX: (dir === 1) ? (false) : (true),
          }));
        }
      }
    }),

    keyDown('right', () => {
      if (!slide) {
        if (!keyIsDown("x")) {
          hspeed += walkSpd;
        }
        else {
          hspeed += runSpd;
        }
      }
      else {
        if (hspeed <= 40) {
          hspeed = 39;
          player.use(sprite("player", {
            anim: "crouch",
            flipX: (dir === 1) ? (false) : (true),
          }));
        }
      }
    }),

    keyDown('down', () => {
      if (player.grounded() && !slide) {
        player.use(sprite("player_slide", {
          anim: "slide",
          flipX: true,
        }));
        player.area.height = 13;
        player.area.offset = [0, 9];
        slide = true;
      }
    }),

  ]);

  let check = add([
    area({
      width: 6,
      height: 6,
      offset: [-2, -8],
    }),
    pos(player.pos),
    "check",
  ]);

  action(() => {
    check.pos = player.pos;
    if (!slide) {
      hspeed = lerp(hspeed, 0, 0.1);
      player.area.height = 27;
      player.area.offset = [0, 2];
    }
    else {
      hspeed = lerp(hspeed, 0, 0.035);
    }
    player.move(hspeed, 0);

    if (player.falling() && !slide) {
      if (!falling) {
        player.use(sprite("player", {
          anim: "fall",
          flipX: (dir === 1) ? (false) : (true),
        }));
      }
      falling = true;
    }

    if (player.grounded() && !slide) {
      if (player.curAnim !== "idle") {
        player.use(sprite("player", {
          anim: "idle",
          flipX: (dir === 1) ? (false) : (true),
        }));
      }

      falling = false;
    }

    if (slide && keyIsReleased("down")) {
      slide = false;
    }

    if (slide && Math.abs(hspeed) < 40) {
      player.use(sprite("player", {
        anim: "crouch",
        flipX: (dir === 1) ? (false) : (true),
      }));
    }

    if (start > 60 && !dead) {
      black.width = (start * start) / 6 - 800;
      start--;
    }

    if (start <= 60 && doors.exists()) {
      doors.destroy();
      play("doorSound");
      shake(10);
      player.pos = vec2(position.x + 15, position.y);
      for (let i = 0; i < 8; i++) {
        add([
          pos(position.x + rand(30), position.y + rand(30)),
          sprite("wood"),
          rotate(randi(359)),
          "wd",
          {
            dir: vec2((rand(2) - 1) * 6, -rand(1) * 6),
            vsp: 1,
          }
        ]);
      }
    }

    every("wd", (ob) => {
      ob.pos.x += ob.dir.x;
      ob.pos.y += ob.dir.y + ob.vsp / 5;
      ob.vsp++;
    });

    if (dead) {
      black.width = (start * start) / 6 - 800;
      start++;
      hspeed = 0;
      if (start >= 99) {
        if (lvl < Levels.length) {
          go('main');
        } else {
          go('end');
        }
      }

    }

    if (hspeed > 30) {
      player.flipX(false);
      dir = 1;
    }
    else if (hspeed < -30) {
      player.flipX(true);
      dir = -1;
    }

    score.text = (Math.floor((time() - timer) / 60).toString().padStart(2, "0") + ":" + (Math.floor(((time() - timer) % 60) * 100) / 100).toFixed(2).toString().padStart(5, "0"));

    if (letter !== 0) {
      if (letter.on === true) {
        if (letter.pos.y > 0) {
          letter.pos.y = lerp(letter.pos.y, 0, 0.075);
          letter.opacity = (50 - letter.pos.y) / 50;

        }

        if (keyIsPressed("z") || keyIsPressed("x") || keyIsPressed("space") || keyIsPressed("right") || keyIsPressed("left")) {
          letter.on = false;
        }
      } else {

        if (player.pos.dist(letterPos) < 30) {
          icon.opacity = lerp(icon.opacity, 1.0, 0.085)
          if (keyIsPressed("z")) {
            letter.on = true;
            play("paper");
          }
          if (keyIsPressed("space")) {
            letter.on = true;
            play("paper");
          }
        } else {
          icon.opacity = lerp(icon.opacity, 0.0, 0.085)
        }

        if (letter.pos.y < 50) {
          letter.pos.y = lerp(letter.pos.y, 50, 0.075);
          letter.opacity = (50 - letter.pos.y) / 50;
        }
      }
    }

  });

  wallJump.collides("=", () => {
    {
      wallJump.pos = vec2(-100, 0);
      hspeed = -410 * dir;
      player.jump(300);
    }
  });

  player.collides("^", () => {
    dead = true;
    play("magic");
    shake(10);
    effect(player.pos);
    player.destroy();
  });

  player.collides("_", () => {
    dead = true;
    play("burn");
    shake(10);
    effect(player.pos);
    player.destroy();
  });

  player.collides("spri", (x) => {
    player.jump(550);
    x.play("ani");
    play("boing");

  });

  player.collides("e", () => {
    lvl++;
    dead = true;
    if (lvl === Levels.length) {
      yourTime = time() - timer;
    }
  });
});

scene('end', () => {
  let tim = 0;
  let tim_2 = 0;
  menuMusic.stop();
  wind.play();

  let princess = add([
    sprite("princess", {
      anim: "idle",
      flipX: true,
    }),
    pos(85, 200),
    rotate(0),
  ]);

  let slash = false;

   keyPress("{", () => {
      go('credits');
    }),

    keyPress("r", () => {
      go('main');
    }),

    keyPress("q", () => {
      go('menu');
    }),
  
   keyPress("space", () => {
      menuMusic.play();
      character.pos.x = 104;
      slash = true;
      character.play("slash");
      play("blade");
      console.log(princess);
    });
  
  let character = add([
    sprite("player_anim", {
      anim: "walk",
      speed: 4,
      flipX: true,
    }),
    pos(323, 203),

    keyDown("left", () => {
      if (character.pos.x > 105) {
        if (keyIsDown("x")) {
          character.pos.x -= 1;
        } else {
          character.pos.x -= 0.7;
        }
      } else {
        character.pos.x = 104;
        if (!slash) {
          slash = true;
          character.play("slash");
          play("blade");
          console.log(princess);
        }
      }
    }),

  ]);

  let tower_top = add([
    sprite("towerT"),
    pos(62, 216),
  ]);

  let black = add([
    rect(480, 300),
    opacity(1),
    color(0, 0, 0),
  ]);

  let txt = add([
    text("Press C To Continue...", {
      size: 18,
    }),
    origin("center"),
    pos(240, -100),
  ]);

  action(() => {
    tim_2++;
    gameMusic.volume((120 - tim_2) / 120) - 0.35;
    black.opacity = (120 - tim_2) / 120 + 0.1;

    if (tim_2 === 120) {
      gameMusic.stop();
      gameMusic.volume(0.65);
    }

    drawSprite("background_2");

    if (slash) {
      tim++;

      if (tim > 50 && princess.pos.x < 118) {
        princess.pos.x += 1;
        princess.pos.y += 0.4;
        princess.angle += 2;
      }
    }

    if (tim === 80 || tim === 150 || tim === 220 || tim === 260) {
      shake(20);
      play("thump");
    }

    if (tim < 210) {

      if (tim > 80) {
        drawText("TARGET", pos(100, 20), {
          size: 60,
          origin: "center"
        });
      }
      if (tim > 150) {
        drawText("ELIMINATED", pos(20, 110), {
          size: 45,
        });
      }
    }

    if (tim > 220) {
      drawText("Your Time", pos(40, 20), {
        size: 45,
      });
    }

    if (tim > 260) {
      drawText((Math.floor(yourTime / 60).toString().padStart(2, "0") + ":" + (Math.floor((yourTime % 60) * 100) / 100).toFixed(2).toString().padStart(5, "0")), pos(60, 110), {
        size: 45,
      });
    }

    if (tim > 285) {
      txt.pos.y = 275;
      if (keyIsPressed("c")) {
        go("credits");
      }
      if (keyIsPressed("space")) {
        go("credits");
      }
    }

  });
});

scene("credits", () => {
  wind.stop();
  menuMusic.stop();
  gameMusic.stop();
  let tim = 0;

  let black = add([
    rect(480, 300),
    color(0, 0, 0)
  ]);

  let txt = add([
    text(" Made By\n\n Dev Bubba\n\n\n\nGraphics By\n\nAlek Spencer & Quinton Hall", {
      size: 20,
      font: "sinko",
    }),
    origin("center"),
    pos(240, -300),
  ]);

  let txt_2 = add([
    text("Press R To Restart!", {
      size: 18,
      font: "sinko",
    }),
    origin("center"),
    pos(240, -300),
  ]);

  action(() => {
    tim++;

    if (tim === 100) {
      gameMusic.seek = 31.5;
      gameMusic.volume(0.65);
      gameMusic.play();
    }

    if (tim >= 220) {
      txt.pos.y = 140;
    }

    if (tim >= 420) {
      txt.pos.y = 150;
      txt.text = "World Record Run";
    }

    if (tim >= 620) {
      txt.pos.y = 150;
      txt.text = "33.96 Seconds \n\nSet By Quinton Hall \n\nCan You Beat It?";
    }

    if (tim >= 850) {
      txt.pos.y = 120;
      txt.text = "Thank You\n\nFor Playing!";
    }

    if (tim >= 1050) {
      txt_2.pos.y = 200;
    }

    if (keyIsPressed("r")) {
      timer = time();
      lvl = 0;
      gameMusic.play();
      gameMusic.volume(0.65);
      go('main');
    }

    if (keyIsPressed("space")) {
      timer = time();
      lvl = 0;
      gameMusic.play();
      gameMusic.volume(0.65);
      go('main');
    }

  });
});

go('menu');