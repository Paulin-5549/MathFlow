// Gestion du mode sombre PERSISTANT
const boutonSombre = document.getElementById('sombre');
const header = document.querySelector('header');
const ensemble = document.getElementById('ensemble');
const footer = document.querySelector('footer');

let modeSombre = false;

function toggleModeSombre() {
  modeSombre = !modeSombre;
  if (modeSombre) {
    header.classList.add('sombre-mode');
    ensemble.classList.add('sombre-mode');
    footer.classList.add('sombre-mode');
  } else {
    header.classList.remove('sombre-mode');
    ensemble.classList.remove('sombre-mode');
    footer.classList.remove('sombre-mode');
  }
}

boutonSombre.onclick = function(e) {
  e.preventDefault();
  toggleModeSombre();
};

// Calculatrice
let display = document.querySelector('#ensemble input');

// Fonction pour ajouter un caractère
window.appendToDisplay = function(v) {
  if (display.value === 'Error') {
    display.value = '';
  }
  // Empêcher d'ajouter plusieurs opérateurs à la suite
  const dernierChar = display.value.slice(-1);
  const operateurs = ['+', '-', '*', '/', '÷'];
  if (operateurs.includes(dernierChar) && operateurs.includes(v)) {
    return;
  }
  // Empêcher de commencer par un opérateur (sauf si c'est un nombre ou une parenthèse)
  if (display.value === '' && operateurs.includes(v) && v !== '-') {
    return;
  }
  display.value += v;
};

// Fonction pour effacer tout
window.clearDisplay = function() {
  display.value = '';
};

// Fonction pour effacer le dernier caractère (bouton SVG)
window.effacerDernier = function() {
  if (display.value === 'Error') {
    display.value = '';
  } else {
    display.value = display.value.slice(0, -1);
  }
};

// Fonction pour calculer le résultat
window.calculete = function() {
  if (display.value === '' || display.value === 'Error') {
    display.value = '';
    return;
  }
  
  try {
    let exp = display.value;
    // Remplacer ÷ par /
    exp = exp.replace(/÷/g, '/');
    // Remplacer × par * si besoin
    exp = exp.replace(/×/g, '*');
    
    // Vérifier si l'expression se termine par un opérateur
    const dernierChar = exp.slice(-1);
    const operateurs = ['+', '-', '*', '/'];
    if (operateurs.includes(dernierChar)) {
      exp = exp.slice(0, -1);
    }
    
    // Évaluer l'expression
    const result = eval(exp);
    
    // Arrondir si nécessaire (pour éviter les nombres à trop de décimales)
    if (typeof result === 'number' && !Number.isInteger(result)) {
      display.value = parseFloat(result.toFixed(8)).toString();
    } else {
      display.value = result.toString();
    }
  } catch(e) {
    display.value = 'Error';
  }
};

// Fonction pour le bouton égale (alias de calculete)
window.egal = function() {
  window.calculete();
};

// Bloque le rechargement du formulaire mais laisse les boutons fonctionner
document.addEventListener('click', function(e) {
  const button = e.target.closest('button');
  if (button) {
    e.preventDefault();
    // Ne pas bloquer si c'est notre bouton sombre (c'est un label)
    if (button.id === 'sombre') {
      return;
    }
  }
});

// Empêcher la soumission du formulaire
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    return false;
  });
}