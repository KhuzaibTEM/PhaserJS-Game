let ground
let platforms
let player
let coins
let pts = 0


const game = new Phaser.Game(720,360, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update, update
})

function preload () {
    //load images
    game.load.image('background', 'assets/background.png')
    game.load.image("ground", "assets/ground.png")
    game.load.image("platform", "assets/platform.png")
    game.load.image("coin", "assets/coin.png")

    game.load.spritesheet("enemy", "assets/enemy.png", 32, 32)
    game.load.spritesheet("player", "assets/player1.png", 80, 61)

    game.load.audio('click', 'Sound/pickupCoin.mp3')
    game.load.audio('hit', 'Sound/hitHurt.mp3')
}

function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.add.sprite(0, 0, 'background')

    platforms = game.add.group()
    platforms.enableBody = true

    let ground = platforms.create(0, game.world.height - 60, "ground")
    ground.scale.setTo(0.6,0.6)
    ground.body.immovable = true


    //platforms above the ground positions in the game
    let ledge = platforms.create(600, 200, "platform")
    ledge.scale.setTo(0.2,0.2)
    ledge.body.immovable = true
    
    ledge = platforms.create(-10, 100, "platform")
    ledge.scale.setTo(0.2,0.2)
    ledge.body.immovable = true


    //enemies starting positions in the game
    enemy = game.add.sprite(520, game.world.height - 95, 'enemy')
    game.physics.arcade.enable(enemy)
    enemy.body.collideWorldBounds = true

    enemy2 = game.add.sprite(700, game.world.height -200, 'enemy')
    game.physics.arcade.enable(enemy2)
    enemy2.body.collideWorldBounds = true

    //2nd enemy collides on the ground when it falls
    enemy2.body.bounce.y = 0.5
    enemy2.body.gravity.y = 800

    enemy3 = game.add.sprite(350, game.world.height - 95, 'enemy')
    game.physics.arcade.enable(enemy3)
    enemy3.body.collideWorldBounds = true

    
    //player starting position in the game
    player = game.add.sprite(32, game.world.height - 150, 'player')
    game.physics.arcade.enable(player)

    

    player.body.bounce.y = 0.7
    player.body.gravity.y = 800
    player.body.collideWorldBounds = true

    player.sfx = {}
    player.sfx.collide = game.add.audio('click')

        
    player.sfx1 = {}
    player.sfx1.collide = game.add.audio('hit')

    //player animations
    player.animations.add('left', [0,6], 10, true)
    player.animations.add('right', [10, 16], 10, true)

    //enemy animations
    enemy.animations.add('left', [0,1], 10, true)
    enemy.animations.add('right', [2, 3], 10, true)

    enemy2.animations.add('left', [0,1], 10, true)
    enemy2.animations.add('right', [2, 3], 10, true)

    enemy3.animations.add('left', [0,1], 10, true)
    enemy3.animations.add('right', [2, 3], 10, true)


    coins = game.add.group()
    coins.enableBody = true
    for (var i = 0; i < 6; i++) {
        let coin = coins.create(i * 130, i * 20, 'coin')
        coin.scale.setTo(0.06,0.06)
        coin.body.gravity.y = 1000
        coin.body.bounce.y = 0.3 + Math.random() * 0.4
    }

    //Score text initialize
    scoreText = game.add.text(12,12, "Points: 0", { fontSize: '24px', fill: '#00ff00'})

    //Win text initialize
    winText = game.add.text(340,180, "", { fontSize: '170px', fill: '#000'})
    
    //keyboard input initialize
    cursors = game.input.keyboard.createCursorKeys()

}
function update () {
    game.physics.arcade.collide(player, platforms)
    game.physics.arcade.collide(coins, platforms)
    game.physics.arcade.collide(enemy, platforms)
    game.physics.arcade.collide(enemy2, platforms)
    game.physics.arcade.collide(enemy3, platforms)

    //enemy or coin overlap with the player
    game.physics.arcade.overlap(player,coins, collectCoin, null, this)
    game.physics.arcade.overlap(player,enemy, killenemy, null, this)
    game.physics.arcade.overlap(player,enemy2, killenemy, null, this)
    game.physics.arcade.overlap(player,enemy3, killenemy, null, this)

    player.body.velocity.x = 0

    //movement and animations according to what key is pressed
    if (cursors.left.isDown) {
        player.body.velocity.x = -150
        player.animations.play('left')

    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150
        player.animations.play('right')
    }
    else{
        player.animations.stop()
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -600
    }


    //enemy movement speed and animation
    enemy.body.velocity.x = -38
    enemy.animations.play('left')

    enemy2.body.velocity.x = -38
    enemy2.animations.play('left')

    enemy3.body.velocity.x = -38
    enemy3.animations.play('left')

    if (pts == 120) {
        alert ("You Win")
        pts = 0
        winText.text = "You Win"
        
    }
    if (enemy.x == 0 || enemy2.x == 0 || enemy3.x == 0) {
        alert ("You Lose")
        pts = 0
        enemy.x = -600                                                             
        enemy2.x = -600
        enemy3.x = -600                 
        winText.text = "You Lose"
    }
    
}


function collectCoin (player,coin) {
    coin.kill()

    //points gained
    pts += 10
    scoreText.text = "Points: " + pts

    //sound effect when coin collected
    player.sfx.collide.play()
}

function killenemy (player,enemy) {
    enemy.kill()

    //points gained
    pts += 20
    scoreText.text = "Points: " + pts

    //sound effect when enemy killed
    player.sfx1.collide.play()
}