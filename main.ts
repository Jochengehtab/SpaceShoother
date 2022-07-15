input.onButtonPressed(Button.A, function () {
    player.change(LedSpriteProperty.X, -1)
})
function moveEnemy (sprite: game.LedSprite) {
    for (let index = 0; index < 4; index++) {
        sprite.change(LedSpriteProperty.Y, 1)
        basic.pause(1000)
    }
}
function shoot () {
    bullet = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y))
    for (let index = 0; index < 4; index++) {
        bullet.change(LedSpriteProperty.Y, -1)
        basic.pause(100)
    }
}
input.onButtonPressed(Button.AB, function () {
    shoot()
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
let randomNumber = 0
let enemy: game.LedSprite = null
let bullet: game.LedSprite = null
let player: game.LedSprite = null
player = game.createSprite(2, 4)
basic.forever(function () {
    if (enemy == null) {
        return
    }
    if (enemy.get(LedSpriteProperty.Y) == 4) {
        enemy.delete()
    }
})
basic.forever(function () {
    if (bullet == null) {
        return
    }
    if (bullet.get(LedSpriteProperty.Y) == 0) {
        bullet.delete()
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
    }
})
basic.forever(function () {
    randomNumber = randint(0, 4)
    setEnemyPosition(randomNumber)
    basic.pause(2500)
})
