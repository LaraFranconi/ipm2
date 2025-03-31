// Função que devolve a cor de cada letra
function getColorFromLetter(letter) {
  const colors = {
    B: [255, 178, 102], I: [255, 178, 102], Q: [255, 178, 102], Y: [255, 178, 102], // laranja
    C: [255, 255, 102], J: [255, 255, 102], R: [255, 255, 102], // amarelo
    D: [141, 247, 141], K: [141, 247, 141], S: [141, 247, 141], // verde
    E: [164, 252, 252], L: [164, 252, 252], T: [164, 252, 252], // ciano
    F: [84, 139, 247],  M: [84, 139, 247],  V: [84, 139, 247], // azul 
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
            red(originalColor) * 0.3,
            green(originalColor) * 0.3,
            blue(originalColor) * 0.3
        );
    } else {
        circleColor = getColorFromLetter(this.label.charAt(0));
    }

    fill(circleColor);
    circle(this.x, this.y, this.width);

    // Desenhar a letra de fundo (grande e transparente)
    const initial = this.label.charAt(0).toUpperCase();
    textAlign(CENTER, CENTER);
    textFont("Arial", this.width * 0.8); // Letra grande proporcional ao círculo
    fill(0, 0, 0, 50); // Cor levemente transparente
    text(initial, this.x, this.y + 5); // Letra centralizada

    // Dividir o texto em partes (separado por espaços e preservando hífens)
    let words = this.label.split(' ').flatMap(word => {
      return word; // Palavra sem hífen permanece inalterada
    });

    // Ajustar o alinhamento do texto
    textFont("Arial", 21);
    textStyle(BOLD);

    // Desenhar cada palavra em uma linha separada
    const lineHeight = 25; // Altura entre as linhas
    const startY = this.y - (lineHeight * (words.length - 1)) / 2; // Ajustar posição inicial

    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      // Simular contorno branco desenhando o texto várias vezes ao redor
      fill(255); // Cor branca para o contorno
      for (let dx = -2; dx <= 2; dx++) {
          for (let dy = -2; dy <= 2; dy++) {
              if (dx !== 0 || dy !== 0) {
                text(word, this.x + dx, startY + i * lineHeight + dy);
              }
          }
      }

      // Desenhar o texto principal na frente
      fill(color(0, 0, 0)); // Cor preta para o texto principal
      noStroke();
      text(word, this.x, startY + i * lineHeight);
    }
  }
}
