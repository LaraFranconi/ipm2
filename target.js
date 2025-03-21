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
      circleColor = color(0, 200, 0); // Verde se correto
    } else {
      circleColor = color(37, 150, 186); // Azul padrão
    }

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
