// Input for Button 'A'
input.onButtonPressed(Button.A, function () {
    player.change(LedSpriteProperty.X, -1)
})
// Animation for the Super Attack
function showSuperAttackAnimations () {
    game.pause()
    fakePlayer = game.createSprite(player.get(LedSpriteProperty.X), 4)
    led.setBrightness(100)
    fakePlayer.setBrightness(255)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        `)
    basic.clearScreen()
    led.setBrightness(100)
    fakePlayer.setBrightness(255)
    basic.showLeds(`
        . . . . .
        . . . . .
        . # . # .
        . . # . .
        . . . . .
        `)
    basic.clearScreen()
    led.setBrightness(100)
    fakePlayer.setBrightness(255)
    basic.showLeds(`
        . . . . .
        # # . # #
        . # # # .
        . . # . .
        . . . . .
        `)
    basic.clearScreen()
    led.setBrightness(100)
    fakePlayer.setBrightness(255)
    basic.showLeds(`
        # # # # #
        # # # # #
        . # # # .
        . . # . .
        . . . . .
        `)
    fakePlayer.delete()
    led.setBrightness(255)
    wait(300)
    game.resume()
}
// Moves an Enemy
function moveEnemy (sprite: game.LedSprite) {
    sprite.setBrightness(150)
for (let index = 0; index < 4; index++) {
        sprite.change(LedSpriteProperty.Y, 1)
        wait(750)
    }
}
// Wait for a few miliseconds
function wait (time: number) {
    basic.pause(time)
}
// Change the Y - Coordinate of the bullet to simulate a shoot Animation
function shoot () {
    bullet = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y))
    // music.playMelody("C5 B A G F F F F ", 5000)
    for (let index = 0; index < 4; index++) {
        bullet.change(LedSpriteProperty.Y, -1)
        bullet.setBrightness(80)
wait(100)
    }
    shootColdown = false
}
// Set the health
function setHealth (amount: number) {
    health = amount
}
// Lunch the SuperAttack
function superAttack () {
    if (bullet == null) {
        return
    }
    if (enemy == null) {
        return
    }
    bullet.delete()
    enemy.delete()
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
        wait(100)
    }
}
// Sets the Position of an Enemy
function setEnemyPosition (randomNumber: number) {
    enemy = game.createSprite(randomNumber, -1)
    moveEnemy(enemy)
}
let randomNumberForEnemyPosition = 0
let score = 0
let enemy: game.LedSprite = null
let shootColdown = false
let player: game.LedSprite = null
let fakePlayer: game.LedSprite = null
let health = 0
let bullet: game.LedSprite = null
health = 5
// Create Player
player = game.createSprite(2, 4)
// Startlog
serial.writeLine("Start Log for Game 'Space Shoother'.")
// Deleteing 'enemy' and 'bullet' when them touching herself
basic.forever(function () {
    if (enemy == null) {
        return
    } else if (bullet == null) {
        return
    }
    if (health == 0) {
        return
    }
    if (bullet.isTouching(enemy)) {
        bullet.delete()
        enemy.delete()
        score += 1
        music.playMelody("C C D C C C D C ", 4500)
    }
})
// Check, if 'health' is 0
basic.forever(function () {
    if (health == 0) {
        game.pause()
        basic.showNumber(score)
        wait(4500)
        health = 5
        score = 0
        game.resume()
    }
})
// Delete 'enemy' wenn his Y - Coordinate is '4'
basic.forever(function () {
    if (enemy == null) {
        return
    }
    if (health == 0) {
        return
    }
    if (enemy.isTouchingEdge() == false) {
        return
    }
    if (enemy.get(LedSpriteProperty.Y) == 4) {
        enemy.delete()
        setHealth(health -= 1)
        basic.showNumber(health)
        shootColdown = false
    }
})
// Forever function for spawning Enemys with a random Position
basic.forever(function () {
    if (health == 0) {
        return
    }
    setEnemyPosition(randomNumberForEnemyPosition)
    randomNumberForEnemyPosition = randint(0, 4)
})
// Forever function for deleting 'bullet' when the Y - Coordinate is 0
basic.forever(function () {
    if (bullet == null) {
        return
    }
    if (health == 0) {
        return
    }
    if (bullet.get(LedSpriteProperty.Y) == 0) {
        bullet.delete()
        shootColdown = false
    }
})
