// Input for Button 'A'
input.onButtonPressed(Button.A, function () {
    player.change(LedSpriteProperty.X, -1)
})
// Animation for the Super Attack
function showSuperAttackAnimations () {
    shootColdown = true
    game.pause()
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . # # # .
        . . # . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        # # # # #
        . # # # .
        . . # . .
        . . . . .
        `)
    basic.showLeds(`
        # # # # #
        # # # # #
        . # # # .
        . . # . .
        . . . . .
        `)
    game.resume()
    basic.pause(500)
}
// Moves an Enemy
function moveEnemy (sprite: game.LedSprite) {
    for (let index = 0; index < 4; index++) {
        sprite.change(LedSpriteProperty.Y, 1)
        basic.pause(1000)
    }
}
// Change the Y - Coordinate of the bullet to simulate a shoot Animation
function shoot () {
    bullet = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y))
    // music.playMelody("C5 B A G F F F F ", 5000)
    for (let index = 0; index < 4; index++) {
        bullet.change(LedSpriteProperty.Y, -1)
        // bullet.setBrightness(80)
        basic.pause(100)
    }
    shootColdown = false
}
// Lunch the SuperAttack
function superAttack () {
    shootColdown = true
    if (bullet == null) {
        return
    }
    if (enemy == null) {
        return
    }
    bullet.delete()
    enemy.delete()
    basic.pause(100)
    shootColdown = false
}
// Input for Button 'AB'
input.onButtonPressed(Button.AB, function () {
    basic.pause(100)
    if (input.buttonIsPressed(Button.AB)) {
        serial.writeLine("Ready to launch the Super Attack")
        if (shootColdown == true) {
            serial.writeLine("Cannot lauch Super Attack, because 'shootColwodown' is false")
            return
        }
        superAttack()
        showSuperAttackAnimations()
        shootColdown = true
        return
    } else {
        if (shootColdown == true) {
            serial.writeLine("Cannot lauch Attack, because 'shootColwodown' is false")
            return
        }
        shoot()
        shootColdown = true
    }
})
// Input for Button 'B'
input.onButtonPressed(Button.B, function () {
    player.change(LedSpriteProperty.X, 1)
})
// Moves a Sprite
function move (toMoveSprite: game.LedSprite) {
    for (let index = 0; index < 4; index++) {
        toMoveSprite.change(LedSpriteProperty.Y, -1)
        basic.pause(100)
    }
}
// Sets the Position of an Enemy
function setEnemyPosition (randomNumber: number) {
    enemy = game.createSprite(randomNumber, -1)
    moveEnemy(enemy)
}
let randomNumberForEnemyPosition = 0
let enemy: game.LedSprite = null
let shootColdown = false
let bullet: game.LedSprite = null
let player: game.LedSprite = null
// Create Player
player = game.createSprite(2, 4)
// Log
serial.writeLine("Start Log for Game 'Space Shoother'.")
basic.forever(function () {
    if (enemy == null) {
        return
    }
    if (enemy.get(LedSpriteProperty.Y) == 4) {
        enemy.delete()
        shootColdown = false
    }
})
// Forever function for spawning Enemys with a random Position
basic.forever(function () {
    randomNumberForEnemyPosition = randint(0, 4)
    setEnemyPosition(randomNumberForEnemyPosition)
})
basic.forever(function () {
    if (bullet == null) {
        return
    }
    if (bullet.get(LedSpriteProperty.Y) == 0) {
        bullet.delete()
        shootColdown = false
    }
})
basic.forever(function () {
    if (enemy == null) {
        return
    } else if (bullet == null) {
        return
    }
    if (bullet.isTouching(enemy)) {
        bullet.delete()
        enemy.delete()
        music.playMelody("C C D C C C D C ", 4500)
    }
})
