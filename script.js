document.addEventListener('keydown', function (evt) {
    if (evt.keyCode == 32) {
        console.log('pula');
        if (nivel.mortes == false) {
            pular();
        }else {
            nivel.velocidade = 9;
            nuvem.velocidade = 1;
            cactus.x = largura +100;
            nuvem.x = largura + 100;
            nivel.pontos = 0;
            nivel.mortes = false;
        }

    }
});

var imgRex, imgNuvem, imgSolo, imgCactus;

function carregarImagens() {
    imgRex = new Image();
    imgNuvem = new Image();
    imgSolo = new Image();
    imgCactus = new Image();

    imgRex.src = './img/rex.jpg';
    imgNuvem.src = './img/nuvem.jpg';
    imgSolo.src = './img/solo.jpg';
    imgCactus.src = './img/cactus.jpg';
}

var largura = 700;
var altura = 300;

var canvas, ctx;

function inicializar() {
    canvas = document.getElementById('tela');
    ctx = canvas.getContext('2d');
    carregarImagens();
}


function apagarCanvas() {
    canvas.width = largura;
    canvas.height = altura;
}



var solo = 200;
var trex = {
    y: solo,
    vy: 0,
    gravidad: 2,
    pulo: 28,
    vymax: 9,
    pulando: false
};

var nivel = {
    velocidade: 9,
    pontos: 0,
    mortes: false
};

var cactus = {
    x: largura+100,
    y: solo-25
};

var nuvem = {
    x:400,
    y: 100,
    velocidade:1
};

var soloG = {
    x:0,
    y:solo+30
};

function desenharRex() {
    ctx.drawImage(imgRex, 0, 0, 420, 470, 100, trex.y, 50, 50);
}

//-------------------
function desenharCactus() {
    ctx.drawImage(imgCactus,0,0,410,691,cactus.x,cactus.y, 183, 191);
}

function logicaCactus() {
    if(cactus.x < -100) {
        cactus.x = largura+100;
        nivel.pontos++;
    }else{
        cactus.x -= nivel.velocidade;
    }
}
//--------------------

function desenharNuvem() {
    ctx.drawImage(imgNuvem,0,0,410,691,nuvem.x,nuvem.y, 283, 591);
}

function logicaNuvem() {
    if(nuvem.x < -100) {
        nuvem.x = largura+100;
    }else{
        nuvem.x -= nuvem.velocidade;
    }
}
//-----------------------
function desenharSolo() {
    ctx.drawImage(imgSolo,soloG.x,0,700,130,0,soloG.y, 700, 30);
}

function logicaSolo() {
    if(soloG.x > 700) {
        soloG.x = 0;
    }else{
        soloG.x += nivel.velocidade;
    }
}


function pular() {
    trex.pulando = true;
    trex.vy = trex.pulo;
}

function gravidade() {
    if (trex.pulando == true) {

        if (trex.y - trex.vy - trex.gravidad > solo) {
            trex.pulando = false;
            trex.vy = 0;
            trex.y = solo;
        } else {
            trex.vy -= trex.gravidad;
            trex.y -= trex.vy;
        }
    }
}

function colisao() {
    if(cactus.x >= 100 && cactus.x <= 150) {
        if (trex.y >= solo-25) {
            nivel.mortes = true;
            nivel.velocidade = 0;
            nuvem.velocidade = 0;
        }
    }
}

function pontuacao() {
    ctx.font = '30px impact';
    ctx.fillStyle = '#555555';
    ctx.fillText(`${nivel.pontos}`,600,50);

    if (nivel.mortes == true) {
        ctx.font = '60px impact';
        ctx.fillText(`GAME OVER`,240,150);
    }
}

//ciclo principal
var FPS = 50;
setInterval(function () {
    principal();
}, 1000 / FPS);



function principal() {
    apagarCanvas();
    gravidade();
    colisao();
    logicaCactus();
    logicaNuvem();
    logicaSolo();
    desenharSolo();
    desenharNuvem();
    desenharCactus();
    desenharRex();
    pontuacao();
}