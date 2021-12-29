// Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro/2

// Velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

// Variáveis do Gol
let xGol = 2
let yGol = 150
let comprimentoGol = 2 
let larguraGol = 100

// Variáveis do Gol oponente
let xGolOponente = 596

// Variáveis da raquete
let xDasRaquetes = [200, 490] 
let yDasRaquetes = [175, 175] 
let raqueteComprimento = 10;
let raqueteAltura = 60

let colidiu = false;
let colidiuGol = false;
let colidiuGolOponente = false;

// Variáveis do oponente
let xDasRaquetesOponente = [100, 390]
let yDasRaquetesOponente = [175, 175]


let chanceDeErrar = 0;

// Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

// Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  // trilha = loadSound("sons/trilha.mp3");
  // ponto = loadSound("sons/ponto.mp3");
  // raquetada = loadSound("sons/raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  // trilha.loop();
}

function draw() {
  background(color(0,160,0));
  desenhaCampo()
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
  mostraRaquetes();
  movimentaRaquetes()
  verificaColisaoRaquete();
  incluiPlacar()
  marcaPonto ()
  mostraGol(xGol)
  mostraGol(xGolOponente)
  
}

function mostraBolinha(){
  fill(255)
  circle(xBolinha, yBolinha, diametro)
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha
  yBolinha += velocidadeYBolinha
}

function verificaColisao(){
  if (xBolinha + raio > width || xBolinha < raio) {
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha > height-raio || yBolinha < raio) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquetes(){
  strokeWeight(2)
  fill(color(255,0,0))
  for(let i = 0; i < xDasRaquetes.length; i++) {
    rect(xDasRaquetes[i], yDasRaquetes[i], raqueteComprimento, raqueteAltura)
  }
  fill(color(0,255,0))
  for (let i = 0; i < xDasRaquetesOponente.length; i++) {
     rect(xDasRaquetesOponente[i], yDasRaquetesOponente[i], raqueteComprimento, raqueteAltura)
  }
}

function movimentaRaquetes() {
  if (keyIsDown(UP_ARROW)){
    for(let i = 0; i < yDasRaquetes.length; i++) {
      yDasRaquetes[i] -= 10;
          if(yDasRaquetes[i] < -30) {
        yDasRaquetes[i] = -30
      }
    }
    
  }
  if (keyIsDown(DOWN_ARROW)){
    for(let i = 0; i < yDasRaquetes.length; i++) {
      yDasRaquetes[i] += 10;
        if(yDasRaquetes[i] > 370) {
      yDasRaquetes[i] = 370
    }
    }
    
  }
  
  if (keyIsDown(87)){
    for(let i = 0; i < yDasRaquetesOponente.length; i++) {
      yDasRaquetesOponente[i] -= 10;
      if(yDasRaquetesOponente[i] < -30) {
        yDasRaquetesOponente[i] = -30
      }
    }
    
  }
  if (keyIsDown(83)){
    for(let i = 0; i < yDasRaquetesOponente.length; i++) {
      yDasRaquetesOponente[i] += 10;
      if(yDasRaquetesOponente[i] > 370) {
        yDasRaquetesOponente[i] = 370
      }
    }
  }
}

function verificaColisaoRaquete() {
  for (let i = 0; i < xDasRaquetes.length; i++) {
    colidiu = collideRectCircle(xDasRaquetes[i], yDasRaquetes[i], raqueteComprimento, raqueteAltura, xBolinha, yBolinha, diametro)
    if(colidiu) {
      velocidadeXBolinha *= -1;
    }
  }
  
  for (let i = 0; i < xDasRaquetesOponente.length; i++) {
    colidiu = collideRectCircle(xDasRaquetesOponente[i], yDasRaquetesOponente[i], raqueteComprimento, raqueteAltura, xBolinha, yBolinha, diametro)
    if(colidiu) {
      velocidadeXBolinha *= -1;
    }
  }
}


function incluiPlacar() {
  
  textAlign(CENTER);
  textSize(20);
  noStroke()
  fill(color(255,150,0));
  push();
  stroke(255)
  rect(175, 11, 50, 25)
  rect(375, 11, 50, 25)
  pop()
  fill(255)
  text(meusPontos, 200, 30)
  fill(color(255,150,0))
  fill(255)
  text(pontosOponente, 400, 30)
}

function marcaPonto () {
  colidiuGol = collideRectCircle(xGol, yGol, comprimentoGol, larguraGol, xBolinha, yBolinha, diametro)
  colidiuGolOponente = collideRectCircle(xGolOponente, yGol, comprimentoGol, larguraGol, xBolinha, yBolinha, diametro)
  
  if(colidiuGol) {
    pontosOponente += 1
    xBolinha = 300
    yBolinha = 200
    for(let i = 0; i < yDasRaquetes.length ; i++) {
      yDasRaquetes[i] = 175
      yDasRaquetesOponente[i] = 175
    }
  }
  
  if(colidiuGolOponente) {
    meusPontos += 1
    xBolinha = 300
    yBolinha = 200
    for(let i = 0; i < yDasRaquetes.length ; i++) {
      yDasRaquetes[i] = 175
      yDasRaquetesOponente[i] = 175
    }
  }
  
}

function mostraGol(x) {
  rect (x, yGol, comprimentoGol, larguraGol)
}



function desenhaCampo() {
  
  stroke(255)
  
  // linha de cima
  rect(10, 5, 580, 2)
  // linha de baixo
  rect(10, 395, 580, 2)
  // linha da esquerda
  rect(9, 5, 2, 390)
  // linha da direita
  rect(589, 5, 2, 390)
  //linha do meio
  rect(299, 5, 2, 390) 
  // circulo do meio
  circle(300, 200, 6)
  noFill()
  strokeWeight(3)
  stroke(255,255,255)
  ellipse(300, 200, 100)
  // área esquerda
  // área maior
  rect(10, 120, 60, 1)
  rect(70, 120, 1, 160)
  rect(10, 280, 60, 1)
  // área menor
  rect(10, 150, 30, 1)
  rect(40, 150, 1, 100)
  rect(10, 250, 30, 1)
  // meio circulo esquerdo
  arc(70, 200, 50, 90, (PI * 3)/2, PI/2)
  // circulo meio da área esquerda
  circle(55, 200, 3)
  // área direita
  // área maior
  rect(530, 120, 60, 1)
  rect(530, 120, 1, 160)
  rect(530, 280, 60, 1)
  // área menor
  rect(560, 150, 30, 1)
  rect(560, 150, 1, 100)
  rect(560, 250, 30, 1)
  // meio circulo direito
  arc(530, 200, 50, 90, PI/2, (PI * 3)/2)
  // circulo meio da área esquerda
  circle(545, 200, 3)
  // escanteio superior esquerdo
  arc(9, 9, 40, 40, 0, PI/2)
  // escanteio superior direito
  arc(591, 9, 40, 40, PI/2, PI)
  // escanteio inferior direito
  arc(591, 393, 40, 40, PI, 3*PI/2)
  // escanteio inferior esquerdo
  arc(9, 393, 40, 40, 3*PI/2, PI*2)
}
