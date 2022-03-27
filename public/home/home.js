/**** DOM ****/
const chronoCheckbox = document.querySelector('.chrono-checkbox');

let withChrono = false;

chronoCheckbox.addEventListener('change', () => {
  if(chronoCheckbox.checked){
    withChrono = true;
  }else{
    withChrono = false;
  }
  console.log(withChrono)
})

export {
  withChrono,
};