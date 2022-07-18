from microbit import *
from mbrobot import *

def on_button_pressed_a():
    player.change(LedSpriteProperty.X, -1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def moveEnemy(sprite: game.LedSprite):
    for index in range(4):
        sprite.change(LedSpriteProperty.Y, 1)
        basic.pause(1000)
def shoot():
    global bullet
    bullet = game.create_sprite(player.get(LedSpriteProperty.X),
        player.get(LedSpriteProperty.Y))
    for index2 in range(4):
        bullet.change(LedSpriteProperty.Y, -1)
        basic.pause(100)

def on_button_pressed_ab():
    global index32
    index32 += 1
    
    if index32 == 2:
        basic.show_leds("""
            # # # # #
                        # # # # #
                        # # # # #
                        # # # # #
                        # # # # #
        """)
        index32 = 0
        return
    shoot()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    player.change(LedSpriteProperty.X, 1)
input.on_button_pressed(Button.B, on_button_pressed_b)

def Move(toMoveSprite: game.LedSprite):
    for index3 in range(4):
        toMoveSprite.change(LedSpriteProperty.Y, -1)
        basic.pause(100)
def setEnemyPosition(randomNumber: number):
    global enemy
    enemy = game.create_sprite(randomNumber, -1)
    moveEnemy(enemy)
randomNumber2 = 0
enemy: game.LedSprite = None
index32 = 0
bullet: game.LedSprite = None
player: game.LedSprite = None
index33 = 0
player = game.create_sprite(2, 4)

def on_forever():
    if enemy == None:
        return
    if enemy.get(LedSpriteProperty.Y) == 4:
        enemy.delete()
basic.forever(on_forever)

def on_forever2():
    if bullet == None:
        return
    if bullet.get(LedSpriteProperty.Y) == 0:
        bullet.delete()
basic.forever(on_forever2)

def on_forever3():
    if enemy == None:
        return
    elif bullet == None:
        return
    if bullet.is_touching(enemy):
        bullet.delete()
        enemy.delete()
basic.forever(on_forever3)

def on_forever4():
    global randomNumber2
    randomNumber2 = randint(0, 4)
    setEnemyPosition(randomNumber2)
    basic.pause(2500)
basic.forever(on_forever4)
