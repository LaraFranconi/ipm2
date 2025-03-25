// Função que devolve a cor de cada letra
function getColorFromLetter(letter) {
  const colors = {
    B: [255, 178, 102], I: [255, 178, 102], Q: [255, 178, 102], Y: [255, 178, 102], // laranja
    C: [255, 255, 102], J: [255, 255, 102], R: [255, 255, 102], // amarelo
    D: [141, 247, 141], K: [141, 247, 141], S: [141, 247, 141], // verde
    E: [164, 252, 252], L: [164, 252, 252], T: [164, 252, 252], // ciano
    F: [120, 162, 245], M: [120, 162, 245], V: [120, 162, 245], // azul 
    G: [177, 107, 250], O: [177, 107, 250], W: [177, 107, 250], // rojo 
  };

  if (colors[letter]) {
    return color(...colors[letter]);
  }
  return color(235, 102, 102); // vermelho para as restantes
}


// Target class (position and width)
class Target {
  constructor(x, y, w, l, id) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.label = l;
    this.id = id;
    this.clickedState = null; // null = não clicado, 'correct' = certo, 'wrong' = errado
  }

  // Função que reseta o botão para o estado original
  reset() {
    this.clickedState = null;
  }

  // Verifica se o clique foi dentro do círculo
  clicked(mouse_x, mouse_y) {
    return dist(this.x, this.y, mouse_x, mouse_y) < this.width / 2;
  }

// Muda a cor dependendo do estado
draw() {
    // Definir cor do círculo principal
    let circleColor;

    if (this.clickedState === "correct") {
      // Escurecer a cor original
      const originalColor = getColorFromLetter(this.label.charAt(0));
      circleColor = color(
          red(originalColor) * 0.3, // Reduzir o componente vermelho
          green(originalColor) * 0.3, // Reduzir o componente verde
          blue(originalColor) * 0.3  // Reduzir o componente azul
      );
    } else {
        circleColor = getColorFromLetter(this.label.charAt(0));
    }

    fill(circleColor);
    circle(this.x, this.y, this.width);

    // Pegar a primeira letra da legenda e transformar em maiúscula
    const initial = this.label.charAt(0).toUpperCase();

    // Definir uma cor levemente mais escura para a letra de fundo
    let bgColor = color(0, 0, 0, 50);

    // Desenhar a letra de fundo primeiro (grande e levemente transparente)
    textAlign(CENTER, CENTER);
    textFont("Arial", this.width * 0.8); // Letra grande proporcional ao círculo
    fill(bgColor);
    text(initial, this.x, this.y + 5); // Letra centralizada antes do texto principal

    // Agora desenhamos o texto principal na frente com contorno
    textFont("Arial", 17);
    textStyle(BOLD);

    // Simular contorno branco desenhando o texto várias vezes ao redor
    fill(255); // Cor branca para o contorno
    for (let dx = -2; dx <= 2; dx++) {
        for (let dy = -2; dy <= 2; dy++) {
            if (dx !== 0 || dy !== 0) {
                text(this.label, this.x + dx, this.y + dy);
            }
        }
    }

    // Desenhar o texto principal na frente
    fill(color(0, 0, 0)); // Cor preta para o texto principal
    noStroke(); // Garantir que não há contorno adicional
    text(this.label, this.x, this.y);
  }
}
