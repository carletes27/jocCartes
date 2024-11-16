document.addEventListener("DOMContentLoaded", function() {
    // Creem la constant que selecciona el formulari
    const formulari = document.querySelector("form");
  
    // Funció per validar el camp codi
    function validarCodi(codi) {
      // Format correcte del codi
      const correcte = /^[0-5]{3}\$(hulk|spider|wolf)_?\^$/;
      // Format buit del codi
      if (!codi) {
        console.log("El codi no pot estar buit.");
        return false;
      }
      // Format incorrecte del codi
      if (!correcte.test(codi)) {
        console.log("El codi no té el format correcte.");
        return false;
      }
  
      return true;
    }
  
    // Funció per enviar el formulari
    function enviarFormulari(event) {
      // Primer prevenim l'enviament per defecte del formulari  
      event.preventDefault();  
      // Creem les constants dels camps
      const nom = document.querySelector('input[name="usuari"]').value;
      const codi = document.querySelector('input[name="codi"]').value;
      const moviments = document.querySelector('input[name="moviments"]:checked').value;
      const color = document.querySelector('#color-input').value;
  
      // Validem el camp codi
      if (!validarCodi(codi)) {
        return;
      }
  
      // Emmagatzenem en el Local Storage
      localStorage.setItem('nomJugador', nom);
      localStorage.setItem('moviments', moviments);
      localStorage.setItem('color', color);
  
      // Redirigim automàticament a l’HTML de l’aplicació del segon apartat
      window.location.href = 'memorioc.html';
    }
  
    formulari.addEventListener("submit", enviarFormulari);
  });
  