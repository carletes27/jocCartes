document.addEventListener("DOMContentLoaded", function() {
// Array amb l'ubicació de les cinc imatges
  data = ["./img/ca.png", "./img/hk.png", "./img/im.png", "./img/th.png", "./img/wv.png"];

  //Funció que retorna un array de deu elements (les cinc imatges duplicades) barrejat
  function retornaCartes() {
    let cartes = [...data, ...data];
    let indexAct = cartes.length,
      indexAlea,
      valTemp;
    while (indexAct !== 0) {
      indexAlea = Math.floor(Math.random() * indexAct);
      indexAct -= 1;
      valTemp = cartes[indexAct];
      cartes[indexAct] = cartes[indexAlea];
      cartes[indexAlea] = valTemp;
    }
    return cartes;
  }

  // Recuperem les dades emmagatzemades al Web Storage
  let nomUsuari = localStorage.getItem("nomJugador");
  let moviments = parseInt(localStorage.getItem("moviments"));
  let color = localStorage.getItem("color");

  // Verifiquem dades
  if (!nomUsuari || isNaN(moviments) || !color) {
    return;
  }

  // Seleccionem l’element amb classe «mov»
  const movSpan = document.querySelector('.mov');
  if (!movSpan) {
    return;
  }

  // Mostrem els moviments en l'element corresponent
  movSpan.textContent = moviments;

  // Quan l’usuari passi el ratolí per la carta corresponent tingui una vora
  let cartes = document.querySelectorAll('.carta');
  cartes.forEach(carta => {
    carta.addEventListener('mouseenter', function() {
      if (!bloquejat) this.style.border = `3px solid ${color}`;
    });
    carta.addEventListener('mouseleave', function() {
      if (!bloquejat) this.style.border = '';
    });
  });

  // Cridem a la funció retornaCartes()
  let imatges = retornaCartes();
  imatges.forEach((imgSrc, index) => {
    document.getElementById((index + 1).toString()).setAttribute('src', imgSrc);
  });

  // Quan l’usuari faci clic sobre alguna de les cartes obtingui la classe «girada»
  let primeraCarta = null;
  let segonaCarta = null;
  let bloquejat = false;

  function handleCardClick() {
    if (bloquejat || this.classList.contains('girada')) return;
    this.classList.add('girada');

  // Comprovem si les dues cartes són iguals o no.
      if (!primeraCarta) {
        primeraCarta = this;
      } else {
        segonaCarta = this;
        bloquejat = true;
        // Si són iguals, es deixaran girades
        if (primeraCarta.querySelector('img').src === segonaCarta.querySelector('img').src) {
          primeraCarta.removeEventListener('click', arguments.callee);
          segonaCarta.removeEventListener('click', arguments.callee);
          resetCartes();
        } else {
          // Si són diferents, se’ls haurà de treure la classe «girada»
          setTimeout(() => {
            primeraCarta.classList.remove('girada');
            segonaCarta.classList.remove('girada');
            resetCartes();
          }, 500);
        }
        // Una vegada clicada la segona carta, s’haurà de descomptar una unitat de moviments
        moviments--;
        movSpan.textContent = moviments;

        if (moviments <= 0) {
          alert(`${nomUsuari}, ja no et queden més moviments!`);
          bloquejarTotesLesCartes();
        }
      }
    }

  // Assignem la mateixa funció per totes les cartes
  cartes.forEach(carta => {
    carta.addEventListener('click', handleCardClick);
  });

  function resetCartes() {
    primeraCarta = null;
    segonaCarta = null;
    bloquejat = false;
  }

  function bloquejarTotesLesCartes() {
    bloquejat = true;
    cartes.forEach(carta => {
      carta.removeEventListener('click', handleCardClick);
      carta.style.pointerEvents = 'none';
    });
  }

  // Destapem cartes al pulsar ESC
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      cartes.forEach(carta => {
        carta.classList.add('girada');
        carta.removeEventListener('click', arguments.callee);
      });
    }
  });
});
