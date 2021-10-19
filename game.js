kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor: [0,0,0,1],
})

scene("game", () =>{
    layers(['bg','obj','ui'],'obj')

    loadRoot('')
    loadSprite('')
    loadSprite('')
    loadSprite('')
})

start("game")