// Função que devolve a cor de cada letra
function getColorFromLetter(letter) {
  const colors = {
    B: [102, 255, 102], H: [102, 255, 102], M: [102, 255, 102], T: [102, 255, 102], Z: [102, 255, 102], // verde
    C: [255, 255, 102], I: [255, 255, 102], O: [255, 255, 102], U: [255, 255, 102], // amarelo
    D: [255, 102, 255], J: [255, 102, 255], P: [255, 102, 255], V: [255, 102, 255], // roxo
    E: [255, 178, 102], K: [255, 178, 102], Q: [255, 178, 102], W: [255, 178, 102], // laranja
    F: [102, 255, 255], L: [102, 255, 255], R: [102, 255, 255], x: [102, 255, 255] // cyan
  };

  if (colors[letter]) {
    return color(...colors[letter]);
  }
  return color(255, 102, 102); // vermelho para as restantes
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
    circleColor = getColorFromLetter(this.label.charAt(0));

    /*
    if (this.clickedState === "correct") {
      circleColor = color(0, 200, 0); // Verde se correto
    } else {
      circleColor = getColorFromLetter(this.label.charAt(0));
    }
    */

    fill(circleColor);
    circle(this.x, this.y, this.width);

    // Pegar a primeira letra da legenda e transformar em maiúscula
    const initial = this.label.charAt(0).toUpperCase();

    // Definir uma cor levemente mais escura para a letra de fundo
    let bgColor = color(0,0,0,50);

    // Desenhar a letra de fundo primeiro (grande e levemente transparente)
    textAlign(CENTER, CENTER);
    textFont("Arial", this.width * 0.8); // Letra grande proporcional ao círculo
    fill(bgColor); 
    text(initial, this.x, this.y + 5); // Letra centralizada antes do texto principal

    // Agora desenhamos o texto principal na frente
    textFont("Arial", 15);
    fill(color(0, 0, 0)); // Cor preta para o texto principal
    textStyle(BOLD);
    text(this.label, this.x, this.y);
  }
}
