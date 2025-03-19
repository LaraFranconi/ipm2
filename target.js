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
    if (this.clickedState === "correct") {
      fill(color(0, 200, 0)); // Verde se foi o correto
    } else {
      fill(color(173, 216, 230)); // Azul padrão
    }

    circle(this.x, this.y, this.width);

    // Texto dentro da bolinha
    textFont("Arial", 15);
    fill(color(0, 0, 0));
    textAlign(CENTER);

    // Primeira letra em negrito
    textStyle(BOLD);
    text(this.label.charAt(0), this.x - textWidth(this.label.slice(1)) / 2, this.y);

    // Restante do texto normal
    textStyle(NORMAL);
    text(this.label.slice(1), this.x + textWidth(this.label.charAt(0)) / 2, this.y);

  }
}