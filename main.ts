input.onButtonPressed(Button.A, function () {
    player.change(LedSpriteProperty.X, -1)
})
function showSuperAttackAnimations () {
    game.pause()
    while (true) {
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
            # . . . #
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
            # . . . #
            # # # # #
            . # # # .
            . . # . .
            . . . . .
            `)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        game.resume()
        break;
    }
}
function moveEnemy (sprite: game.LedSprite) {
    for (let index = 0; index < 4; index++) {
        sprite.change(LedSpriteProperty.Y, 1)
        basic.pause(1000)
    }
}
function shoot () {
    bullet = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y))
    music.playMelody("C5 B A G F F F F ", 5000)
    for (let index = 0; index < 4; index++) {
        bullet.change(LedSpriteProperty.Y, -1)
        bullet.setBrightness(80)
basic.pause(100)
    }
}
function superAttack () {
    if (bullet == null) {
        return
    }
    if (enemy == null) {
        return
    }
    bullet.delete()
    enemy.delete()
}
input.onButtonPressed(Button.AB, function () {
    basic.pause(100)
    if (input.buttonIsPressed(Button.AB)) {
        superAttack()
        showSuperAttackAnimations()
        return
    } else {
        shoot()
    }
})
input.onButtonPressed(Button.B, function () {
    player.change(LedSpriteProperty.X, 1)
})
function Move (toMoveSprite: game.LedSprite) {
    for (let index = 0; index < 4; index++) {
        toMoveSprite.change(LedSpriteProperty.Y, -1)
        basic.pause(100)
    }
}
function setEnemyPosition (randomNumber: number) {
    enemy = game.createSprite(randomNumber, -1)
    moveEnemy(enemy)
}
let randomNumberForEnemyPosition = 0
let enemy: game.LedSprite = null
let player: game.LedSprite = null
let bullet: game.LedSprite = null
player = game.createSprite(2, 4)
serial.writeLine("Start Log for Game 'Space Shoother'")
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
basic.forever(function () {
    if (enemy == null) {
        return
    }
    if (enemy.get(LedSpriteProperty.Y) == 4) {
        enemy.delete()
        music.playMelody("C C C F E D C C ", 6000)
    }
})
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
    }
})
