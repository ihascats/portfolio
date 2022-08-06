import '../css/styles.css';
import Phaser from 'phaser';
import playerSheet from '../assets/playerSpriteSheet/player.png';
import blue from '../assets/background/blue.png';
import grass from '../assets/platform/tile_0022.png';
import show from '../assets/sign.png';
import popup from './Popup';
import items from './showcase';

const width = 320;
const height = 600;

function preload() {
  this.load.image('sky', blue);
  this.load.image('grass', grass);
  this.load.image('sign', show);
  this.load.spritesheet('player', playerSheet, {
    frameWidth: 20,
    frameHeight: 23,
  });
}
let player;
let platform;
let cursors;
let sign;

function showProject(character, atSign) {
  let signPosition;
  sign.children.entries.forEach((child, index) => {
    if (child === atSign) {
      signPosition = index;
    }
  });
  if (!document.querySelector('.wrapper')) {
    popup(signPosition);
  }
}

function create() {
  this.cameras.main.setBounds(0, 0, width * 2, height);
  this.physics.world.setBounds(0, 0, width * 2, height, true, true, true, true);
  this.add.image(0, 0, 'sky').setOrigin(0);
  sign = this.physics.add.group({
    key: 'sign',
    repeat: items.length - 1,
    setXY: { x: 200, y: 0, stepX: 200 },
  });
  player = this.physics.add.sprite(100, 150, 'player');

  sign.children.iterate((child) => {
    child.setBounceY(0.2);
  });

  this.physics.add.overlap(player, sign, showProject, null, this);

  this.cameras.main.startFollow(player, true, 0.09, 0.09);
  platform = this.physics.add.staticGroup();
  for (let i = 0; i < (width * 2) / 18; i += 1) {
    platform.create(9 + 18 * i, height - 9, 'grass');
  }
  player.setCollideWorldBounds(true);
  player.body.setGravityY(300);
  this.physics.add.collider(player, platform);
  this.physics.add.collider(sign, platform);
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', { start: 3, end: 2 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1,
  });
}

function update() {
  cursors = this.input.keyboard.createCursorKeys();
  const velocity = 300;
  if (cursors.left.isDown) {
    player.setVelocityX(velocity * -1);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(velocity);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.stop();
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(velocity * -1);
  }

  if (
    // eslint-disable-next-line operator-linebreak
    !this.physics.world.overlap(player, sign) &&
    document.querySelector('.wrapper')
  ) {
    document.querySelector('.wrapper').remove();
  }
}

const config = {
  type: Phaser.AUTO,
  width,
  height,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
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
