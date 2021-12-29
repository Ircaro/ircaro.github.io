// Bolinha
let xBolinha = 40;
let yBolinha = 200;
let raio = 30;
let velocidade = 5;
let velocidades = [6, 7, 8, 9, 10];

let calcula = xBolinha + 200;

let k = 0;

let pontos = 0;
let score = 0;

colidiu = false;

let numeros = [];

for (let k = 0; k < 1000; k++) {
  numeros[k] = parseInt(Math.random() * (180 - 0) + 0);
}

// Obstáculo de Cima
let xObstaculo = 500;
let yObstaculo = -1980;
let larguraObstaculo = 40;
let comprimentoObstaculo = 2000;

// Obstaculo de Baixo
let yObstaculoBaixo = yObstaculo + yObstaculo * -1 + 150;

let comprimentoObstaculoBaixo = 700;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  desenhaBolinha();
  desenhaObstaculo(
    xObstaculo,
    yObstaculo,
    larguraObstaculo,
    comprimentoObstaculo
  );
  desenhaObstaculo(
    xObstaculo,
    yObstaculoBaixo,
    larguraObstaculo,
    comprimentoObstaculoBaixo
  );
  movimentaObstaculo();

  for (let i = 0; i < 1000; i++) {
    criaObstaculos(
      xObstaculo + 200 * (i + 1),
      yObstaculo + numeros[i],
      larguraObstaculo,
      comprimentoObstaculo
    );
    criaObstaculos(
      xObstaculo + 200 * (i + 1),
      yObstaculoBaixo + numeros[i],
      larguraObstaculo,
      comprimentoObstaculoBaixo
    );
  }
  colisaoObstaculos();
  contarPontos();
  movimentaBolinha();
  mostraPontos();
  highScore();
  mudaVelocidade()
}

function desenhaBolinha() {
  circle(xBolinha, yBolinha, raio);
}

function desenhaObstaculo(x, y, z, k) {
  rect(x, y, z, k);
}

function movimentaObstaculo() {
  xObstaculo -= velocidade;
}

function mudaVelocidade () {
  if(pontos >= 30 && pontos < 60) {
    calcula -= 6;
    xObstaculo -= 1
    if(calcula <= xBolinha) {
      pontos += 1
      calcula = xBolinha + 200
    }
  }
  
  if (pontos >= 60 && pontos < 90) {
    calcula -= 7
    xObstaculo -=2
    if (calcula <= xBolinha) {
      pontos += 1
      calcula = xBolinha + 200
    }
  }
  
  
  if (pontos >= 90 && pontos < 120) {
    calcula -= 8
    xObstaculo -= 3
    if (calcula <= xBolinha) {
      pontos += 1
      calcula = xBolinha + 200
    }
  }
  
  
  if (pontos >= 120 && pontos < 150) {
    calcula -= 9
    xObstaculo -=4
    if (calcula <= xBolinha) {
      pontos += 1
      calcula = xBolinha + 200
    }
  }
  
  
  if (pontos >= 150) {
    calcula -= 10
    xObstaculo -=5
    if (calcula <= xBolinha) {
      pontos += 1
      calcula = xBolinha + 200
    }
  }
}


function criaObstaculos(x, y, z, k) {
  rect(x, y, z, k);
}

function colisaoObstaculos() {
  colidiu = collideRectCircle(
    xObstaculo,
    yObstaculo,
    larguraObstaculo,
    comprimentoObstaculo,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu) {
    xObstaculo = 500;
    if (pontos >= score) {
      score = pontos;
    }
    pontos = 0;
    yBolinha = 200;
    for (let k = 0; k < 1000; k++) {
      numeros[k] = parseInt(Math.random() * (200 - 0) + 0);
    }
    velocidade = 5;
    calcula = xBolinha + 200;
  }
  colidiu = collideRectCircle(
    xObstaculo,
    yObstaculoBaixo,
    larguraObstaculo,
    comprimentoObstaculo,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu) {
    xObstaculo = 500;
    if (pontos >= score) {
      score = pontos;
    }
    pontos = 0;
    yBolinha = 200;
    for (let k = 0; k < 1000; k++) {
      numeros[k] = parseInt(Math.random() * (200 - 0) + 0);
    }
    velocidade = 5;
    calcula = xBolinha + 200;
  }
  for (let i = 0; i < 1000; i++) {
    colidiu = collideRectCircle(
      xObstaculo + 200 * (i + 1),
      yObstaculo + numeros[i],
      larguraObstaculo,
      comprimentoObstaculo,
      xBolinha,
      yBolinha,
      raio
    );
    if (colidiu) {
      xObstaculo = 500;
      if (pontos >= score) {
        score = pontos;
      }
      pontos = 0;
      yBolinha = 200;
      for (let k = 0; k < 1000; k++) {
        numeros[k] = parseInt(Math.random() * (200 - 0) + 0);
      }
      velocidade = 5;
      calcula = xBolinha + 200;
    }
    colidiu = collideRectCircle(
      xObstaculo + 200 * (i + 1),
      yObstaculoBaixo + numeros[i],
      larguraObstaculo,
      comprimentoObstaculo,
      xBolinha,
      yBolinha,
      raio
    );
    if (colidiu) {
      xObstaculo = 500;
      if (pontos >= score) {
        score = pontos;
      }
      pontos = 0;
      yBolinha = 200;
      for (let k = 0; k < 1000; k++) {
        numeros[k] = parseInt(Math.random() * (200 - 0) + 0);
      }
      velocidade = 5;
      calcula = xBolinha + 200;
    }
  }
}

function contarPontos() {
  for (let i = 0; i < 1000; i++ ) {
    if (xObstaculo + (200 * i)  == xBolinha) {
      if (pontos < 30) {
        pontos += 1
      }
    } 
  }
}

function mostraPontos() {
  stroke(255);
  textAlign(CENTER);
  textSize(30);
  fill(color(255, 0, 0));
  rect(275, 10, 50, 50);
  fill(255);
  text(pontos, 300, 45);
}

function movimentaBolinha() {
  if (keyIsDown(DOWN_ARROW)) {
    yBolinha += 10;
  }
  if (keyIsDown(UP_ARROW)) {
    yBolinha -= 10;
  }
}

function highScore() {
  stroke(255);
  textAlign(CENTER);
  textSize(30);
  fill(color(255, 0, 0));
  rect(490, 10, 50, 50);
  fill(255);
  text(score, 515, 45);
}
