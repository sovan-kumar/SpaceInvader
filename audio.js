const audio={
    backgroundMusic: new Howl({
        src:'./audio/backgroundMusic.wav'
    }),
    bomb: new Howl({
        src:'./audio/bomb.mp3'
    }),
    enemyShoot: new Howl({
        src:'./audio/enemyShoot.wav'
    }),
    explode: new Howl({
        src:'./audio/explode.mp3'
    }),
    gameOver: new Howl({
        src:'./audio/gameOver.mp3'
    })
}
function playMySong(url)
{
    var audio=document.createElement('audio');
    audio.style.display="none";
    audio.src=url;
    audio.autoplay=true;
    audio.loop = true;
    document.body.appendChild(audio);
}

playMySong('./audio/backgroundMusic.wav');