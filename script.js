/**** IMPORT ****/
import {listImg} from './data.js';


/********* DOM ********/
const cardsVerso = document.querySelectorAll('.verso');
const imgElements = document.querySelectorAll('.card');


/********* FUNCTIONS **********/
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function melangerLesCartes(){
  let listChiffresUtilises = [];
  let listImgElementsUtilises = [];
  
  
  // L'image non doublé
  let imgElementSeule = getRandomArbitrary(0, 25);
  let indexFruit = getRandomArbitrary(0, 25);
  let nomFruit = listImg[indexFruit];
  
  // imgElements[imgElementSeule].attributes[1].textContent = `./assets/images/${nomFruit}.jpg`;
  imgElements[imgElementSeule].setAttribute("src", `./assets/images/${nomFruit}.jpg`);

  
  listChiffresUtilises.push(indexFruit);
  listImgElementsUtilises.push(imgElementSeule);
  
  
  // Les images doublées
  for(let i = 0; i < 12; i++){
    let imgElement1 = getRandomArbitrary(0, 25);
    let imgElement2 = getRandomArbitrary(0, 25);
    let indexFruit = getRandomArbitrary(0, 25);
    let nomFruit = listImg[indexFruit];
  
    while(listChiffresUtilises.includes(indexFruit)){
      indexFruit = getRandomArbitrary(0, 25);
      nomFruit = listImg[indexFruit];
    };
    listChiffresUtilises.push(indexFruit);
  
    while(listImgElementsUtilises.includes(imgElement1)){
      imgElement1 = getRandomArbitrary(0, 25);
    };
    listImgElementsUtilises.push(imgElement1);
  
    while(listImgElementsUtilises.includes(imgElement2)){
      imgElement2 = getRandomArbitrary(0, 25);
    };
    listImgElementsUtilises.push(imgElement2);
  
    console.log(`La carte${imgElement1} et ${imgElement2} ont le numero ${indexFruit} qui est ${nomFruit}`);
  
    // imgElements[imgElement1].attributes["src"].textContent = `./assets/images/${nomFruit}.jpg`;
    // imgElements[imgElement2].attributes["src"].textContent = `./assets/images/${nomFruit}.jpg`;
    imgElements[imgElement1].setAttribute("src", `./assets/images/${nomFruit}.jpg`);
    imgElements[imgElement2].setAttribute("src", `./assets/images/${nomFruit}.jpg`);
  }
  console.log(listChiffresUtilises)
  console.log(listImgElementsUtilises)
}




/****** CODE ******/

melangerLesCartes();

let numberCardsTourned = [];
let cardsTourned = [];
cardsVerso.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.add('skipFront');
    card.nextElementSibling.classList.add('goBack');
    
    if(cardsTourned.length < 2){
      cardsTourned.push(card);
    }else{
      cardsTourned.forEach(card => {
        card.classList.remove('goBack');
        card.previousElementSibling.classList.remove('skipFront');
      });
    }
  })
});

// imgElements.forEach(card => {
//   card.addEventListener('click', (e) => {
//     card.classList.remove('goBack');
//     card.previousElementSibling.classList.remove('skipFront');
//   });
// });
