const validationIcons = document.querySelectorAll('.icone-verif');
const validationTexts = document.querySelectorAll('.error-msg');
const inputs = document.querySelectorAll('input');

const form = document.querySelector('form');
const container = document.querySelector('.container');



const validInput = {
    user : false,
    mail : false,
    pwd : false,
    confirm : false
}

form.addEventListener('submit', submitForm)
function submitForm(event){
    event.preventDefault(); // Empecher la soumission du formulaire

    let keys = Object.keys(validInput); // Récupérer les clés des props de l'objet validInput
    
    let filterInp = keys.filter(key => !validInput[key]) // récupérer les champs qui sont à false 

if(filterInp.length){
    // Afficher les erreurs des inputs non valides
    filterInp.forEach(input => {
        displayValidation(false, keys.indexOf(input))

        //Ajouter l'animation si il reste des erreurs 
        container.classList.add('shake');

        setTimeout(() => {
            container.classList.remove("shake");

        }, 500)
    })
}else{
    alert('données envoyées');
    form.submit();
}
    
}




// Fonction d'affichage de la validation
function displayValidation(validation, index){
    if(validation){
        validationIcons[index].style.display = 'inline';
        validationIcons[index].src="ressources/check.svg";
       if(validationTexts[index]) validationTexts[index].style.display = 'none';
    }else{
        validationIcons[index].style.display = 'inline';
        validationIcons[index].src="ressources/error.svg";
        if(validationTexts[index])validationTexts[index].style.display = 'block';
    }
}


// Validation de l'utilisateur
const userInput = inputs[0];
userInput.addEventListener('input',userValiation);

function userValiation(){
if(userInput.value.length >= 3){
        displayValidation(true, 0)
        validInput.user = true;
}else{
        displayValidation(false, 0)
}
}


// Validation de l'email
const mailInput = inputs[1];
mailInput.addEventListener('input',mailValidation);

const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
function mailValidation(){

    if(regexMail.test(mailInput.value)){
        displayValidation(true, 1)
        validInput.mail = true;
    }else{
        displayValidation(false, 1)
    }

 }

// Validation du mot de passe
const pwdInput = inputs[2];
pwdInput.addEventListener('input',pswdValidation);

const pwdVerif = {
    length : false,
    symbol : false,
    number : false
}

const regexList ={
    symbol: /[^a-zA-Z0-9\s]/,
    number: /\d/
}

function pswdValidation(){
let countVerif = 0;

    // Vérification de la longueur
if(pwdInput.value.length >= 6){
pwdVerif.length = true;
countVerif++;
}

// Vérification des symboles et des chiffres
for(const prop in regexList){
    if(regexList[prop].test(pwdInput.value)){
        pwdVerif[prop] = true;
        countVerif++;
    }
}

// vérification si le champ est valide
if(countVerif !== 3){
    displayValidation(false, 2)
}else{
    displayValidation(true, 2)
    validInput.pwd = true;
}


pwdPower();
}

// Vérification de la puissance du mot de passe 

const lines = document.querySelectorAll('.lines div');
const pwdConfirm = inputs[3];
function pwdPower(){
 const pwdLength = pwdInput.value.length;

 lines.forEach((el) => {
        el.style.display = 'none';
 });

    if(!pwdLength){
        return;
    }
    else if(pwdLength > 9 && pwdVerif.symbol && pwdVerif.number) {
        console.log('fort');
        lines[0].style.display = 'block';
        lines[1].style.display = 'block';
        lines[2].style.display = 'block';

    }else if (pwdLength > 6 && pwdVerif.symbol && pwdVerif.number){
        console.log('moyen');
        lines[0].style.display = 'block';
        lines[1].style.display = 'block';
    }else{
        console.log('faible');
        lines[0].style.display = 'block';
    }

    if(pwdConfirm.value.length !== 0){
    confirmValidation()
    }
}


// Vérification de la confirmation du mot de passe


pwdConfirm.addEventListener('input', confirmValidation);

function confirmValidation(){
    const confirmedpwd = pwdConfirm.value;

    //  Vérifier si les deux champs si vides
    if(!confirmedpwd && ! pwdInput.value){
        return;
    }
    if(confirmedpwd === pwdInput.value){
        displayValidation(true, 3)
        validInput.confirm = true;
    }else{
        displayValidation(false, 3)
    }

}