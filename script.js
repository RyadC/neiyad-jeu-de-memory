/**** IMPORT ****/
import {listImg} from './data.js';


/********* DOM ********/
const loadingContainer = document.querySelector('.loading');
const opacityElement = document.querySelector('.opacity-actif');

const cardsVerso = document.querySelectorAll('.verso');
const imgElements = document.querySelectorAll('.card');

const btnReset = document.querySelector('.reset');

const progressBarElement = document.querySelector('.progressBarAvance');


/********* FUNCTIONS **********/
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

function melangerLesCartes(){
  let listChiffresUtilises = [];
  let listImgElementsUtilises = [];
  
  
  // L'image non doublé (la 1ère image)
    // Choisir la div img aléatoirement
  let imgElementSeule = getRandomArbitrary(0, 25);
    // Choisir l'img en BDD aléatoirement
  let indexFruit = getRandomArbitrary(0, 25);
    // Récupérer le nom du fruit pour injecter dans la src de l'img
  let nomFruit = listImg[indexFruit];
  
    // Donner la valeur au src de l'élément img
  imgElements[imgElementSeule].setAttribute("src", `./assets/images/${nomFruit}.jpg`);

  // Sauvegarder les chiffres utilisés pour la récup en BDD
  listChiffresUtilises.push(indexFruit);
  // Sauvegarder les chiffres utilisés pour la récup des éléments img
  listImgElementsUtilises.push(imgElementSeule);
  
  
  // Les images doublées
  for(let i = 0; i < 12; i++){
    // Même principe que pour la carte seule mais avec deux éléments img
    let imgElement1 = getRandomArbitrary(0, 25);
    let imgElement2 = getRandomArbitrary(0, 25);
    let indexFruit = getRandomArbitrary(0, 25);
    let nomFruit = listImg[indexFruit];
  
    // Si le chiffre utilisé à déjà était trouvé alors relancer la recherche aléatoire
    while(listChiffresUtilises.includes(indexFruit)){
      indexFruit = getRandomArbitrary(0, 25);
      nomFruit = listImg[indexFruit];
    };
      // Après avoir trouvé, sauvegarder le chiffre
    listChiffresUtilises.push(indexFruit);
  
    // Si le chiffre utilisé à déjà était trouvé alors relancer la recherche aléatoire
    while(listImgElementsUtilises.includes(imgElement1)){
      imgElement1 = getRandomArbitrary(0, 25);
    };
      // Après avoir trouvé, sauvegarder le chiffre
    listImgElementsUtilises.push(imgElement1);

    // Si le chiffre utilisé à déjà était trouvé alors relancer la recherche aléatoire
    while(listImgElementsUtilises.includes(imgElement2)){
      imgElement2 = getRandomArbitrary(0, 25);
    };
      // Après avoir trouvé, sauvegarder le chiffre
    listImgElementsUtilises.push(imgElement2);
  
    // Après avoir tout trouvé, donner l'attribut src de l'img en BDD à l'élément HTML img
    imgElements[imgElement1].setAttribute("src", `./assets/images/${nomFruit}.jpg`);
    imgElements[imgElement2].setAttribute("src", `./assets/images/${nomFruit}.jpg`);
  };
};

function cacherCartes(listeCartes){
  listeCartes.forEach(card => {
    console.log(card.previousElementSibling);
    card.previousElementSibling.classList.remove('skipFront');
    card.classList.remove('goBack');
  });
};



/****** CODE ******/
// Enlever la div de chargement et l'opacité que lorsque la page est prête 
document.addEventListener('readystatechange', () => {
  if(document.readyState === "complete"){
    console.log(document.readyState)
    loadingContainer.classList.add('disparition');
    opacityElement.classList.add('disparition');
  }
});

// Compte à rebours
let now = 300; // 300s = 5mn
setInterval(() => {
  let minutes = Math.floor(now / 60);
  let secondes = now;
  while (secondes > 60){
    secondes -= 60;
  }
  if(secondes === 60){
    secondes = 0;
  }
  now -= 1;
}, 1000)



let cardsNumber = 25;
let progression;
let cardsTourned = [];
let cardsFind = [];

melangerLesCartes();

// Lors du clique sur le bouton "Recommencer"
btnReset.addEventListener('click', () => {
  // Demander confirmation avant de recommencer 
  if(confirm('Etes vous sûr de vouloir recommmencer la partie?')){
    // Si oui
    if(cardsTourned.length > 0 || cardsFind > 0){
      // Regarder si des cartes sont déjà retournées et les cacher puis vider les tableaux de sauvegarde
      cacherCartes(cardsTourned);
      cardsTourned = [];
      cacherCartes(cardsFind);
      cardsFind = [];
    };
    // Mélanger les cartes
    setTimeout(() => {
      melangerLesCartes();
    }, 0);
  };
  
});

// Lors du clique sur la carte
cardsVerso.forEach(card => {
  card.addEventListener('click', () => {
    // Révéler la carte
    card.classList.add('skipFront');
    card.nextElementSibling.classList.add('goBack');
    
    // Sauvegarder la carte cliquée
    cardsTourned.push(card.nextElementSibling);
    console.log(card.nextElementSibling)

    // Au bout de deux: vérifier si elles sont identiques
    if(cardsTourned.length === 2){
      let srcCard1 = cardsTourned[0].attributes["src"].textContent;
      let srcCard2 = cardsTourned[1].attributes["src"].textContent;

      // Si cartes identiques
      if(srcCard1 === srcCard2){
          // Sauvegarder dans un tableau à part
        cardsFind.push(cardsTourned[0], cardsTourned[1]);

          // Mettre la barre de progression à jour
        progression = (cardsFind.length / (cardsNumber - 1)) * 100;

        document.styleSheets[1].insertRule(`.progressBarAvance {width: ${progression}%`,document.styleSheets[1].cssRules.length);

          // Vider le tableau de cartes cliquées
        cardsTourned = [];  

      }else{
        // Si pas identique, retourner les cartes
        setTimeout(() => {
          cacherCartes(cardsTourned);
          cardsTourned = [];
      }, 1700);
      };
      };
  });
});

