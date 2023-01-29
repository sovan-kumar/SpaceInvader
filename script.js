const canvas=document.querySelector('canvas')
const scoreEl=document.querySelector('#scoreEl')

const c=canvas.getContext('2d')
console.log(scoreEl)
canvas.width=innerWidth
canvas.height=565
class Player{
    constructor(){
        
        this.velocity={
            x:0,
            y:0
        }
        this.rotation=0
        this.opacity=1
        const image=new Image()
        image.src='./img/spaceship.png'
        image.onload=()=>
        
        {
            const scale=0.15
            this.image=image
            this.width=image.width*scale
            this.height=image.height*scale
            this.position={
                x:canvas.width/2-this.width/2,
                y:canvas.height-this.height-20
            }
        }
    }
        
        
    
    draw(){
        c.save()
        c.globalAlpha=this.opacity
        c.translate(this.position.x+player.width/2,this.position.y+player.height/2-14)
        c.rotate(this.rotation)
        c.translate(-this.position.x+player.width/2,-this.position.y+player.height/2-14)
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        c.restore()
    }
    update(){
        if(this.image){
        this.draw()
        this.position.x +=this.velocity.x
        }
    }
}
class projectile
{
    constructor({position,velocity})
    {
       this.position=position
       this.velocity=velocity
       this.radius=8
    }
    draw()
    {
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
        c.fillStyle='red'
        c.fill()
        c.closePath()
    }
    update()
    {
        this.draw()
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
    }
}
class Particle
{
    constructor({position,velocity,radius,color,fades})
    {
       this.position=position
       this.velocity=velocity
       this.radius=radius
       this.color=color
       this.opacity=1
       this.fades=fades
    }
    draw()
    {
        c.save()
        c.globalAlpha=this.opacity
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
        c.fillStyle=this.color
        c.fill()
        c.closePath()
        c.restore()
    }
    update()
    {
        this.draw()
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        if(this.fades){
        this.opacity-=0.01
        }
    }
}
class Invaderprojectile
{
    constructor({position,velocity})
    {
       this.position=position
       this.velocity=velocity
       this.width=3
       this.height=10
    }
    draw()
    {
        c.fillStyle='white'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update()
    {
        this.draw()
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
    }
}
class Invader{
    constructor({position}){
        
        this.velocity={
            x:0,
            y:0
        }
        
        const image=new Image()
        image.src='./img/invader.png'
        image.onload=()=>
        
        {
            const scale=1
            this.image=image
            this.width=image.width*scale
            this.height=image.height*scale
            this.position={
                x: position.x,
                y: position.y
            }
        }
    }
        
        
    
    draw(){
        
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        
    }
    update({velocity}){
        if(this.image){
        this.draw()
        this.position.x +=velocity.x
        this.position.y +=velocity.y
        }
    }
    shoot(invaderprojectiles){
        audio.enemyShoot.play()
        invaderprojectiles.push(new Invaderprojectile({
            position:{
                x: this.position.x+ this.width / 2,
                y: this.position.y+ this.height

            },
            velocity: {
                x: 0,
                y: 5
            }
        }))
    }
}
class Grid{
    constructor(){
        this.position={
            x:0,
            y:0
        }
        this.velocity={
            x:3,
            y:0
        }
        this.invaders=[]
        const cols=Math.floor(Math.random() * 20 + 5)
        const rows=Math.floor(Math.random() * 5 + 2)
        this.width=cols*30
        for(let i=0;i<cols;i++)
        {
            for(let j=0;j<rows;j++)
            {

            this.invaders.push(new Invader({
                position:{
                    x:i*30,
                    y:j*30
                }
            }))
        }
       }
     }
    update()
    {
       this.position.x+=this.velocity.x
       this.position.y+=this.velocity.y
       this.velocity.y=0
       if(this.position.x+this.width>=canvas.width || this.position.x<=0)
       {
        this.velocity.x=-this.velocity.x
        this.velocity.y=30
       }
    }
}
class Bomb{
    static radius =30
    constructor({position,velocity})
    {
       this.position=position
       this.velocity=velocity
       this.radius=0
       this.color='red'
       this.opacity=1
       this.active=false
       gsap.to(this,{
        radius: 30
       })
    }
    draw(){
        c.save()
        c.globalAlpha=this.opacity
       c.beginPath()
       c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
       c.closePath()
       c.fillStyle=this.color
       c.fill()
       c.restore()
    }
    update()
    {
        this.draw()
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        if(this.position.x+ this.radius + this.velocity.x >= canvas.width ||
            this.position.x-this.radius+this.velocity.x<=0)
        {
            this.velocity.x=-this.velocity.x
        }
        else if(this.position.y+ this.radius + this.velocity.y >= canvas.height ||
            this.position.y-this.radius+this.velocity.y<=0)
            
                this.velocity.y=-this.velocity.y
        }
            explode()
            {
                audio.bomb.play()
                this.active=true
                this.velocity.x=0
                this.velocity.y=0
              gsap.to(this,{
                radius: 190,
                color :'white'
              })
              gsap.to(this,{
                delay: .1,
                opacity: 0,
                
                duration: .15
                
              })
            }
    }
    class PowerUp
{
    constructor({position,velocity})
    {
       this.position=position
       this.velocity=velocity
       this.radius=16
    }
    draw()
    {
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
        c.fillStyle='white'
        c.fill()
        c.closePath()
    }
    update()
    {
        this.draw()
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
    }
}

function randomBetween(min,max)
{
   return  Math.random() * (max-min)+ min
}
let player=new Player()
let projectiles=[]
let grids=[]
let invaderprojectiles=[]
let particles=[]
let bombs=[]
let frames=0
let keys={
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}
let randomInterval=Math.floor((Math.random()*500)+500)
let game={
    over: false,
    active: true
}
let score=0
function init()
{
     player=new Player()
 projectiles=[]
 grids=[]
 invaderprojectiles=[]
 particles=[]
 bombs=[]
 keys={
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
    
}
 frames=0
 randomInterval=Math.floor((Math.random()*500)+500)
 game={
    over: false,
    active: true
}
 score=0
 for(let i=0;i<100;i++){
    particles.push(new Particle({
        position: {
            x: Math.random()* canvas.width,
            y: Math.random() * canvas.height
        },
        velocity: {
            x: 0,
            y: 0.3
        },
        radius: Math.random() * 2,
        color: '#FFCD3C'
    }))
} 
}



 


function createParticles({object,color,fades})
{
    for(let i=0;i<15;i++){
        particles.push(new Particle({
            position: {
                x: object.position.x + object.width / 2 + 60,
                y: object.position.y + object.height / 2
            },
            velocity: {
                x: (Math.random()-0.5)*2,
                y: (Math.random()-0.5)*2
            },
            radius: Math.random() * 3,
            color: color || '#BAA0DE',
            fades
            
        }))
    } 
}
function createScorelavel({score=10,object})
{
    const scoreLabel= document.createElement('label')
    scoreLabel.innerHTML=10
    scoreLabel.style.position='absolute'
    scoreLabel.style.color='white'
    scoreLabel.style.top=object.position.y + 'px'
    scoreLabel.style.left=object.position.x + 'px'
    scoreLabel.style.userSelect='none'
    document.querySelector('#parentDiv').appendChild(scoreLabel)
    gsap.to(scoreLabel,{
        opacity:0,
        y: -30,
        duration: 0.75,
        onComplete: ()=>{
            document.querySelector('#parentDiv').removeChild(scoreLabel)
        }
    })
}
function animate()
{
    //audio.backgroundMusic.play()
    if(!game.active) return
    requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)
   
    if(frames%200===0 && bombs.length<3)
    {
        bombs.push(new Bomb({
            position:{
                x: randomBetween(Bomb.radius,canvas.width-Bomb.radius),
                y: randomBetween(Bomb.radius,canvas.height-Bomb.radius)
            },
            velocity: {
                x: (Math.random()-0.5)*6,
                y: (Math.random()-0.5)*6
            }
        })
        )
    }
    for(let i=bombs.length-1;i>=0;i--)
    {
        const bomb= bombs[i]
        if(bomb.opacity<=0)
        {
            bombs.splice(i,1)
        }
        else bomb.update()
    }
    player.update()
    particles.forEach((particle,i)=>{
        if(particle.position.y-particle.radius>=canvas.height)
        {
            particle.position.x=Math.random() * canvas.width
            particle.position.y=-particle.radius
        }
         if(particle.opacity<=0)
         {
            setTimeout(() => {
                particles.splice(i,1)
            }, 0);
         }
         else{
            particle.update()
         }
        
    })
    invaderprojectiles.forEach((invaderprojectile,index)=>{

        if(invaderprojectile.position.y+invaderprojectile.height>=canvas.height)
        {
            setTimeout(() => {
                invaderprojectiles.splice(index,1)
            }, 0);
        }
        else invaderprojectile.update()
       
        
        if(invaderprojectile.position.y+ invaderprojectile.height>=player.position.y &&
            invaderprojectile.position.x+ invaderprojectile.width>=player.position.x+60 &&
            invaderprojectile.position.x<=player.position.x + player.width+70)
            {
                console.log('You lose')
                audio.gameOver.play()
                setTimeout(() => {
                  invaderprojectiles.splice(index,1) 
                  player.opacity=0
                  game.over=true 
                 
                }, 0);
                
                setTimeout(() => {
                    game.active=false
                    document.querySelector('#restartScreen').style.display='flex'
                  }, 600);
                createParticles({
                    object: player,
                    color: 'red',
                    fades: true
                })
            }
    })
    for(let i=projectiles.length-1;i>=0;i--){
    
        const projectile=projectiles[i]
        for(let j=bombs.length-1;j>=0;j--)
        {
            const bomb=bombs[j]
            if(Math.hypot(projectile.position.x-bomb.position.x,projectile.position.y-bomb.position.y)<projectile.radius+bomb.radius
            && !bomb.active)
            {
                projectiles.splice(i,1)
                bomb.explode()
            }
        }
        

        if(projectile.position.y+projectile.radius<=0)
        {
           
                projectiles.splice(i,1)
            
            
        }
        else{
            projectile.update()
        }
         
}
    grids.forEach((grid,gridIndex)=>{
        grid.update()
        if(frames%100===0 && grid.invaders.length>0)
        {
            grid.invaders[Math.floor(Math.random()*grid.invaders.length)].shoot(invaderprojectiles)
        }
        grid.invaders.forEach((invader,i)=>{
            invader.update({velocity:grid.velocity})
            for(let j=bombs.length-1;j>=0;j--)
        {
            const bomb=bombs[j]
            if(Math.hypot(invader.position.x-bomb.position.x,invader.position.y-bomb.position.y)<15+bomb.radius
            && bomb.active)
            {
                score+=10
                scoreEl.innerHTML=score
                grid.invaders.splice(i,1)

                 createScorelavel({object: invader,
                    score:10
                        })
                createParticles({
                    object: invader,
                    fades: true
                })
            }
        }
            projectiles.forEach((projectile,j)=>{
                if(projectile.position.y-projectile.radius<=invader.position.y+invader.height
                    && projectile.position.x + projectile.radius >= invader.position.x &&
                    projectile.position.x-projectile.radius<=invader.position.x + invader.width &&
                    projectile.position.y+ projectile.radius>=invader.position.y)
                {
                    
                   setTimeout(() => {
                    const invaderFound=grid.invaders.find(invader2=>
                        invader2===invader
                    )
                    const projectileFound=projectiles.find(projectile2=>projectile2===projectile)
                    if(invaderFound && projectileFound){
                        score+=10
                        console.log(score)
                        scoreEl.innerHTML=score
                        //dynamic scores lebels
                        createScorelavel({object: invader
                        })
                        createParticles({
                            object: invader,
                            fades: true
                        })
                        audio.explode.play()

                    grid.invaders.splice(i,1)
                    projectiles.splice(j,1)
                     if(grid.invaders.length>0)
                     {
                         const firstInvader=grid.invaders[0]
                         const lastInvader=grid.invaders[grid.invaders.length-1]
                         grid.width=lastInvader.position.x-firstInvader.position.x+lastInvader.width
                         grid.position.x=firstInvader.position.x
                     }
                     else{
                        grids.splice(gridIndex,1)
                     }

                    }
                   }, 0);
                
                }
            })
        })
    })
    if(keys.a.pressed && player.position.x>=0)
    {
        player.velocity.x=-7
        player.rotation=-0.15

    }
    else if(keys.d.pressed && player.position.x+player.width<=canvas.width-70)
    {
       player.velocity.x=7
       player.rotation=0.15
    }
    else
    {
        player.velocity.x=0
        player.rotation=0
    }  
    if(frames % randomInterval ===0)
    {
        grids.push(new Grid())
        randomInterval=Math.floor((Math.random()*500)+500)
    }
  if(keys.space.pressed=='true' && player.powerUp==='MachineGun')
    projectiles.push(
        new projectile({
            position: {
                x:player.position.x + 101 ,
                y:player.position.y
            },
            velocity: {
               x:0,
               y:-10
            }
        })
    )
    
    frames++ 

}

document.querySelector('#startButton').addEventListener('click',()=>
{
   audio.backgroundMusic.play()
   audio.loop=true
    document.querySelector('#startScreen').style.display='none'

    document.querySelector('#score').style.display='block'
    
    init()
    animate()
})
 
document.querySelector('#restartButton').addEventListener('click',()=>
{
    document.querySelector('#restartScreen').style.display='none'
    audio.backgroundMusic.play()
    score=0
    init()
    animate()
})
 


addEventListener('keydown',({key})=>{
    
    if(game.over) return
    switch(key)
    {
        case 'a':
           // console.log('left')
            keys.a.pressed=true
            break
        case 'd':
           // console.log('right')
            keys.d.pressed=true
            break
        case ' ':
           keys.space.pressed==true
            
           // console.log('space')
            projectiles.push(
                new projectile({
                    position: {
                        x:player.position.x + 101 ,
                        y:player.position.y
                    },
                    velocity: {
                       x:0,
                       y:-13
                    }
                })
            )
            break
            //console.log(projectiles)
    }

})
addEventListener('keyup',({key})=>{
    switch(key)
    {
        case 'a':
           // console.log('left')
            
            keys.a.pressed=false
            break
        case 'd':
          //  console.log('right')
            keys.d.pressed=false
            break
        case ' ':
            keys.space.pressed=false
          //  console.log('space')
            break
    }

})
