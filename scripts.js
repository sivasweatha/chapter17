class Chapter17 {
  constructor(text1, text2, id) {
    this.text1 = text1;
    this.speed = 200;
    this.text2 = text2;
    this.time = [500, 50, 20, 10, 40, 100];
    this.id = id;
    this.k = 0;
    this.iteration = 0;
    this.showing = this.text1;
    this.interval = null;
    this.type();
  }

  type() {
    if (this.k < this.text1.length) {
      document.getElementById("text").innerHTML += this.text1.charAt(this.k);
      this.k++;
      setTimeout(this.type.bind(this), this.speed);
    }
  }

  decreaseOpacity(i) {
    if (i >= 0) {
      this.getH2().style.opacity = `${i}`
      i -= 0.01;
      setTimeout(this.decreaseOpacity.bind(this), 65, i)
    }
  }

  shuffleString(string) {
    let array = string.split("");

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
  }

  setH2(showing) {
    this.getH2().innerHTML = showing;
  }

  getH2() {
    return document.querySelector(`${this.id}`);
  }

  main() {
    let target = this.getH2();
    let iteration = this.iteration;

    clearInterval(this.interval);

    let onsec = () => {
      if (target.innerText.length - 1 < iteration) {
        this.showing = this.text2;
        this.setH2(this.showing);
        clearInterval(this.interval);
        this.decreaseOpacity(1);
        return;
      }

      this.setH2(this.shuffleString(this.text1));

      if (iteration >= this.text1.length) {
        clearInterval(this.interval);
      }

      iteration += 1 / 3;
    };

    this.interval = setInterval(onsec, 30);
  }
}

const revelation = new Chapter17(
  "TOM MARVOLO RIDDLE",
  "I AM LORD VOLDEMORT",
  "h2"
);

let handler = (event) => {
  revelation.main();
  event.target.removeEventListener("mouseover", handler);
};

document
  .querySelector(`${revelation.id}`)
  .addEventListener("mouseover", handler);
