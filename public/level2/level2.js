/**** IMPORT ****/
import {listImg} from '../data.js';


/********* DOM ********/
const loadingContainer = document.querySelector('.loading');
const opacityElement = document.querySelector('.opacity-actif');

const timeCount = document.querySelector('.time-count-text');

const cardsVerso = document.querySelectorAll('.verso');
const imgElements = document.querySelectorAll('.card');

const successElement = document.querySelector('.successGame');
const successTime = document.querySelector('.successTime');
const succesGameTitle = document.querySelector('.successGame-title');
const succesGameText = document.querySelector('.successGame-text');

const successHomeBtn = document.querySelector('.successGameHome');
const successRetryBtn = document.querySelector('.successGameRetry');

const btnReset = document.querySelector('.reset');

const progressBarElement = document.querySelector('.progressBarAvance');


/********* FUNCTIONS **********/
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

function melangerLesCartes(cardsNumber, ImgNumber){

 return new Promise((resolve, reject) => {
    let listChiffresUtilises = [];
    let listImgElementsUtilises = [];
    cardsNumber;
    ImgNumber;
    
    
    // L'image non doublé (la 1ère image)
      // Choisir la div img aléatoirement
    let imgElementSeule = getRandomArbitrary(0, cardsNumber);
      // Choisir l'img en BDD aléatoirement
    let indexFruit = getRandomArbitrary(0, ImgNumber);
      // Récupérer le nom du fruit pour injecter dans la src de l'img
    let nomFruit = listImg[indexFruit];
    
      // Donner la valeur au src de l'élément img
    imgElements[imgElementSeule].setAttribute("src", `../assets/images/${nomFruit}.jpg`);
  
    // Sauvegarder les chiffres utilisés pour la récup en BDD
    listChiffresUtilises.push(indexFruit);
    // Sauvegarder les chiffres utilisés pour la récup des éléments img
    listImgElementsUtilises.push(imgElementSeule);
    
    
    // Les images doublées
    for(let i = 0; i < Math.floor(cardsNumber / 2); i++){
      // Même principe que pour la carte seule mais avec deux éléments img
      let imgElement1 = getRandomArbitrary(0, cardsNumber);
      let imgElement2 = getRandomArbitrary(0, cardsNumber);
      let indexFruit = getRandomArbitrary(0, ImgNumber);
      let nomFruit = listImg[indexFruit];
    
      // Si le chiffre utilisé à déjà était trouvé alors relancer la recherche aléatoire
      while(listChiffresUtilises.includes(indexFruit)){
        indexFruit = getRandomArbitrary(0, ImgNumber);
        nomFruit = listImg[indexFruit];
      };
        // Après avoir trouvé, sauvegarder le chiffre
      listChiffresUtilises.push(indexFruit);
    
      // Si le chiffre utilisé à déjà était trouvé alors relancer la recherche aléatoire
      while(listImgElementsUtilises.includes(imgElement1)){
        imgElement1 = getRandomArbitrary(0, cardsNumber);
      };
        // Après avoir trouvé, sauvegarder le chiffre
      listImgElementsUtilises.push(imgElement1);
  
      // Si le chiffre utilisé à déjà était trouvé alors relancer la recherche aléatoire
      while(listImgElementsUtilises.includes(imgElement2)){
        imgElement2 = getRandomArbitrary(0, cardsNumber);
      };
        // Après avoir trouvé, sauvegarder le chiffre
      listImgElementsUtilises.push(imgElement2);
    
      // Après avoir tout trouvé, donner l'attribut src de l'img en BDD à l'élément HTML img
      imgElements[imgElement1].setAttribute("src", `../assets/images/${nomFruit}.jpg`);
      imgElements[imgElement2].setAttribute("src", `../assets/images/${nomFruit}.jpg`);
    };
    console.log('cartes mélangées');
    resolve(true);
  });
 
};

function cacherCartes(listeCartes){
  listeCartes.forEach(card => {
    console.log(card.previousElementSibling);
    card.previousElementSibling.classList.remove('skipFront');
    card.classList.remove('goBack');
  });
};

function loadApp(){
  return new Promise((resolve, reject) => {
    window.addEventListener('load', () => {
        console.log(document.readyState)
        loadingContainer.classList.add('disparition');
        opacityElement.classList.add('disparition');
        resolve();
    });
  })
};

function startChrono(timeChrono){
  // 300s = 5mn
  let intervalId = setInterval(() => {
    let minutes = Math.floor(timeChrono / 60);
    let secondes = timeChrono;
    while (secondes > 60){
      secondes -= 60;
    };
    if(secondes === 60){
      secondes = 0;
    };
    timeChrono -= 1;

    if(secondes < 10){
      secondes = '0' + secondes;
    };
    timeCount.textContent = `${minutes}:${secondes}`;

    // A la fin du chrono
    if(timeChrono < 0){
      clearInterval(intervalId);
      successElement.classList.add('successGame-no');
      succesGameTitle.textContent = 'Perdu';
      succesGameTitle.classList.add('successGame-title-no');
      succesGameText.textContent = 'Trop tard ! Le temps est écoulé... :\'(';
      successElement.classList.remove('disparition');
      opacityElement.classList.remove('disparition');

      // Réinitialiser la barre de progression
      document.styleSheets[0].insertRule(`.progressBarAvance {width: 0%`,document.styleSheets[0].cssRules.length);
    };
  }, 1000);

  return intervalId;
};

function loaderDisparition(){
    return new Promise((resolve, reject) => {
      loadingContainer.classList.add('disparition');
      opacityElement.classList.add('disparition');
      console.log('loader disparu')
      resolve();
    });
};

async function app(chrono, totalNumberCards, numberOfDataBaseIMG){
  let cardsNumber = totalNumberCards;
  let progression;
  let cardsTourned = [];
  let cardsFind = [];
  let chronoTime = chrono;
  
  // Chrono si il a été choisi
    // Compte à rebours en seconde
  let withChrono = document.location.search.split('&')[1];
  let intervalId = '';
  if(withChrono){
    intervalId = startChrono(chronoTime);
  }else{
    timeCount.textContent = `0:00`;

  };



  await melangerLesCartes(totalNumberCards, numberOfDataBaseIMG);

   // Lors du clique sur la carte
  cardsVerso.forEach(card => {
    card.addEventListener('click', () => {
      // Révéler la carte
      card.classList.add('skipFront');
      card.nextElementSibling.classList.add('goBack');
      

      // Sauvegarder la carte cliquée
      cardsTourned.push(card.nextElementSibling);
      console.log(cardsTourned)


      // Au bout de deux: vérifier si elles sont identiques
      if(cardsTourned.length === 2){
        let srcCard1 = cardsTourned[0].attributes["src"].textContent;
        let srcCard2 = cardsTourned[1].attributes["src"].textContent;

        // Si cartes identiques
        if(srcCard1 === srcCard2){
            // Sauvegarder dans un tableau à part
          cardsFind.push(cardsTourned[0], cardsTourned[1]);
          console.log(cardsFind)

            // Mettre la barre de progression à jour
          progression = (cardsFind.length / (cardsNumber - 1)) * 100;

          document.styleSheets[0].insertRule(`.progressBarAvance {width: ${progression}%`,document.styleSheets[0].cssRules.length);

            // Vider le tableau de cartes cliquées
          cardsTourned = []; 
          
          console.log(cardsFind.length)
        }else{
          // Si pas identique, retourner les cartes
          setTimeout(() => {
            cacherCartes(cardsTourned);
            cardsTourned = [];
        }, 1700);
        };
      };


      // Après avoir tourné la dernière carte qui est l'intru
      if(cardsFind.length === cardsNumber - 1 && cardsTourned[0]){
        cardsFind.push(cardsTourned[0]);

        // Arrêter le compteur
        clearInterval(intervalId);
        successElement.classList.add('successGame-yes');
        succesGameTitle.textContent = 'Bravo !';
        succesGameTitle.classList.add('successGame-title-yes');
        succesGameText.textContent = 'Vous avez gagné la partie en ';
        console.log(timeCount.textContent)
        successTime.textContent = `${timeCount.textContent} !`;
        successElement.classList.remove('disparition');
        opacityElement.classList.remove('disparition');

        // Réinitialiser la barre de progression
        progression = 0;

        document.styleSheets[0].insertRule(`.progressBarAvance {width: ${progression}%`,document.styleSheets[0].cssRules.length);
      };
    });
  });

   // Lors du clique sur le bouton "Recommencer"
   btnReset.addEventListener('click', async () => {
    // Demander confirmation avant de recommencer 
    if(confirm('Etes vous sûr de vouloir recommmencer la partie?')){
      // Bloquer le compteur et réinitialiser setinterval
      if(withChrono){
        clearInterval(intervalId);
      };

      loadingContainer.classList.remove('disparition');
      opacityElement.classList.remove('disparition');
      // Si oui
        if(cardsTourned.length > 0 || cardsFind.length > 0){
          // Regarder si des cartes sont déjà retournées et les cacher puis vider les tableaux de sauvegarde
          cacherCartes(cardsTourned);
          cardsTourned = [];
          cacherCartes(cardsFind);
          cardsFind = [];
        };
        

        // Mélanger les cartes
        await melangerLesCartes(totalNumberCards, numberOfDataBaseIMG)
        
        
        // Faire disparaitre le loader
        await loaderDisparition();
        
        // Relancer un nouveau chrono
        if(withChrono){
          intervalId = startChrono(chronoTime);
        };
    };
    
  });

  // Lors du clique sur le bouton "Recommencer" en cas de succès
  successRetryBtn.addEventListener('click', async () => {
    // Bloquer le compteur et réinitialiser setinterval
    if(withChrono){
      clearInterval(intervalId);
      timeCount.textContent = `0:00`;
    };
    
    successElement.classList.add('disparition');
    loadingContainer.classList.remove('disparition');
    
    if(cardsTourned.length > 0 || cardsFind.length > 0){
      // Regarder si des cartes sont déjà retournées et les cacher puis vider les tableaux de sauvegarde
      cacherCartes(cardsTourned);
      cardsTourned = [];
      cacherCartes(cardsFind);
      cardsFind = [];
    };
    
    
    // Mélanger les cartes
    await melangerLesCartes(totalNumberCards, numberOfDataBaseIMG)
    
    // Relancer un nouveau chrono
    if(withChrono){
      intervalId = startChrono(chronoTime);
    };
    // Faire disparaitre le loader
    await loaderDisparition();

  });

  // Lors du clique sur le bouton accueil
  successHomeBtn.addEventListener('click', () => {
    document.location.href='http://localhost:3000/';
    console.log('home')
  })

};

async function startApp(){
  // Enlever la div de chargement et l'opacité que lorsque la page est prête 
  await loadApp();

  // Lancer les éléments de l'application
  app(300, 15, 25);
}


/****** CODE ******/
// Lancer l'application
startApp();

