kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor: [0,0,0,1],
})

const MOVE_SPEED = 120
const JUMP_FORCE = 360

    loadRoot('https://i.imgur.com/')
    loadSprite('coin', 'wbKxhcd.png')
    loadSprite('evil-shroom', 'KPO3fR9.png')
    loadSprite('brick', 'pogC9x5.png')
    loadSprite('block', 'M6rwarW.png')
    loadSprite('mario', 'Wb1qfhK.png')
    loadSprite('mushroom', '0wMd92p.png')
    loadSprite('surprise', 'gesQ1KP.png')
    loadSprite('unboxed', 'bdrLpi6.png')
    loadSprite('pipe-top-left', 'ReTPiWY.png')
    loadSprite('pipe-top-right', 'hj2GK4n.png')
    loadSprite('pipe-bottom-left', 'c1cYSbt.png')
    loadSprite('pipe-bottom-right', 'nqQ79eI.png')
    
   loadSprite('blue-block', 'fVscIbn.png')
    loadSprite('blue-brick', '3e5YRQd.png')
    loadSprite('blue-steel', 'gqVoI2b.png')
    loadSprite('blue-evil-shroom', 'SvV4ueD.png')
    loadSprite('blue-surprise', 'RMqCc1G.png')

    scene("game", () =>{
        layers(['bg','obj','ui'],'obj')
        
        const maps = [
            [
              '                                      ',
              '                                      ',
              '                                      ',
              '                                      ',
              '                                      ',
              '     %   =*=%=                        ',
              '                                      ',
              '                            -+        ',
              '                    ^   ^   ()        ',
              '==============================   =====',
            ],
            [
              '£                                       £',
              '£                                       £',
              '£                                       £',
              '£                                       £',
              '£                                       £',
              '£        @@@@@@              x x        £',
              '£                          x x x        £',
              '£                        x x x x  x   -+£',
              '£               z   z  x x x x x  x   ()£',
              '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
            ]
          ]
          const levelCfg = {
              width: 20,
              height: 20,
              '=':[sprite('block', solid())], //uses the block img
              '$':[sprite('coin')],
              '%':[sprite('surprise'), solid(), 'coin-surprised'],
              '*':[sprite('surprise'), solid(), 'mushroom-surprised'],
              '}': [sprite('unboxed'), solid()],
              '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
              ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
              '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
              '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
              '^': [sprite('evil-shroom'), solid(), 'dangerous'],
              '#': [sprite('mushroom'), solid(), 'mushroom', body()],
              '!': [sprite('blue-block'), solid(), scale(0.5)],
              '£': [sprite('blue-brick'), solid(), scale(0.5)],
              'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous'],
              '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
              'x': [sprite('blue-steel'), solid(), scale(0.5)],
          
          
          
            }

          const gameLevel = addLevel(map, levelCfg)

          const scoreLabel = add([
                text('test'),
                pos(30,6),
                layer('ui'),
                {
                    value: 'test',
                }
            ])

            add([text('level' + 'test', pos(4,6))]) //position of the text


            function big(){
                let timer = 0
                let isBig = false
                return {
                    update(){
                        if (isBig){
                            timer -=dt()
                            if(timer <=0){
                                this.smallify()
                            }
                        }
                    },
                    isBig(){
                        return isBig
                    },
                    smallify(){
                        //make mario smaller
                        this.scale =vec2(1)
                        timer = 0
                        isBig = false
                    },
                    biggify(time){
                        //make mario bigger
                        this.scale =vec2(2)
                        timer = time
                        isBig = true
                    }
                }
            }


          const player = add([
              sprite('mario'), solid(),
              pos(30,0),
              body(),
              big(),
              origin('bot')
          ])

          action('mushroom', (m) => {
              m.move(20,0) //make mushroom move
          })

         player.on("headbump", (obj) => {
             //make obj come out of the box
             if (obj.is('coin-surprise')){
                gameLevel.spawn('$', obj.gridPos.sub(0,1))
                destroy(obj) //removes the box from the game
                gameLevel.spawn('}', obj.gridPos.sub(0,0)) //makes the box change to other box
             }
             if (obj.is('mushroom-surprise')){
                gameLevel.spawn('#', obj.gridPos.sub(0,1))
                destroy(obj) //removes the box from the game
                gameLevel.spawn('}', obj.gridPos.sub(0,0)) //makes the box change to other box
             }
         })


          keyDown('left', ()=>{
              player.move(-MOVE_SPEED,0) //speed plasyer moves
          })

          keyDown('right', ()=>{
            player.move(MOVE_SPEED,0) //speed plasyer moves
        })
        keyPress('space',() =>{
            if(player.grounded()){
                player.jump(JUMP_FORCE)
            }
        })
})

start("game")