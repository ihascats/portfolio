import '../css/styles.css';
import Phaser from 'phaser';
import playerSheet from '../assets/playerSpriteSheet/player.png';
import blue from '../assets/background/blue.png';
import grass from '../assets/platform/tile_0022.png';
import mossLeft from '../assets/platform/mossLeft.png';
import mossMiddle from '../assets/platform/mossMiddle.png';
import mossRight from '../assets/platform/mossRight.png';
import show from '../assets/signSmall.png';
import popup from './Popup';
import items from './showcase';

const width = 320;
const height = 600;

let player;
let platform;
let cursors;
let sign;
let interact;
let ground;

function showProject(character, atSign) {
  let signPosition;

  sign.children.entries.forEach((child, index) => {
    if (child === atSign) {
      signPosition = index;
    }
  });
  if (!document.querySelector('.wrapper')) {
    if (cursors.down.isDown) {
      popup(signPosition);
    }
    interact.x = atSign.x - interact.width / 2;
    interact.y = atSign.y - atSign.height / 2 - 6;
    interact.setText('Press ↓ to interact');
  }
}

function preload() {
  this.load.image('sky', blue);
  this.load.image('grass', grass);
  this.load.image('mossLeft', mossLeft);
  this.load.image('mossMiddle', mossMiddle);
  this.load.image('mossRight', mossRight);
  this.load.image('sign', show);
  this.load.image('platform', grass);
  this.load.spritesheet('player', playerSheet, {
    frameWidth: 20,
    frameHeight: 23,
  });
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);

  ground = this.physics.add.staticGroup();
  for (let i = 0; i < width / 18; i += 1) {
    ground.create(9 + 18 * i, height * 2 - 9, 'grass');
  }

  platform = this.physics.add.staticGroup();

  for (let j = 0; j < 2; j += 1) {
    for (let i = 0; i < 6; i += 1) {
      let block;
      if (i === 0) {
        block = platform.create(
          8 + 18 * i,
          height * 2 - (100 + 100 * j),
          'mossLeft',
        );
      } else if (i === 5) {
        block = platform.create(
          8 + 18 * i,
          height * 2 - (100 + 100 * j),
          'mossRight',
        );
      } else {
        block = platform.create(
          8 + 18 * i,
          height * 2 - (100 + 100 * j),
          'mossMiddle',
        );
      }
      block.body.checkCollision.left = false;
      block.body.checkCollision.right = false;
      block.body.checkCollision.down = false;
    }
    for (let i = 0; i < 6; i += 1) {
      let block;
      if (i === 0) {
        block = platform.create(
          222 + 18 * i,
          height * 2 - (150 + 100 * j),
          'mossLeft',
        );
      } else if (i === 5) {
        block = platform.create(
          222 + 18 * i,
          height * 2 - (150 + 100 * j),
          'mossRight',
        );
      } else {
        block = platform.create(
          222 + 18 * i,
          height * 2 - (150 + 100 * j),
          'mossMiddle',
        );
      }
      // const block = platform.create(
      //   width / 1.4 + 18 * i,
      //   height * 2 - (150 + 100 * j),
      //   'mossMiddle',
      // );
      block.body.checkCollision.left = false;
      block.body.checkCollision.right = false;
      block.body.checkCollision.down = false;
    }
  }

  sign = this.physics.add.group({
    key: 'sign',
    repeat: items.length - 1,
    setScale: { x: 0.5, y: 0.5 },
    setXY: { x: 100, y: height * 2 - 30, stepX: 100 },
  });

  player = this.physics.add.sprite(10, height * 2 - 26, 'player');
  player.setCollideWorldBounds(true);
  player.body.setGravityY(800);

  interact = this.add.text(0, 0, '', {
    fontSize: 13,
    fontFamily: 'IBM Plex Mono',
    fontStyle: 'bold',
  });

  this.physics.add.collider(player, ground);
  this.physics.add.collider(player, platform, () => {
    if (player.body.touching.down && cursors.down.isDown) {
      player.body.position.y += 3;
    }
  });
  this.physics.add.collider(sign, ground);
  this.physics.add.collider(sign, platform);

  this.cameras.main.setBounds(0, 0, width, height * 2);
  this.cameras.main.startFollow(player, true, 0.09, 0.09);
  this.physics.world.setBounds(0, 0, width, height * 2, true, true, true, true);

  this.physics.add.overlap(player, sign, showProject, null, this);

  // animations
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { start: 1, end: 0 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'stopLeft',
    frames: this.anims.generateFrameNumbers('player', { start: 3, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'stopRight',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
    frameRate: 10,
    repeat: -1,
  });
}

let direction = true;

function update() {
  // catch input
  cursors = this.input.keyboard.createCursorKeys();

  const velocity = 300;

  if (cursors.left.isDown) {
    player.setVelocityX(velocity * -1);
    player.anims.play('left', true);
    direction = false;
  } else if (cursors.right.isDown) {
    player.setVelocityX(velocity);
    player.anims.play('right', true);
    direction = true;
  } else {
    player.setVelocityX(0);
    player.anims.stop();
    if (direction) {
      player.anims.play('stopRight', true);
    } else {
      player.anims.play('stopLeft', true);
    }
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(2 * velocity * -1);
  }
  if (cursors.down.isDown && player.body.touching.down) {
    player.body.position.y += 2;
  }

  if (!this.physics.world.overlap(player, sign)) {
    interact.setText('');
    if (document.querySelector('.wrapper')) {
      document.querySelector('.wrapper').remove();
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width,
  height,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);
