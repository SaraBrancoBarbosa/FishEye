/*********** Elements ***********/

// DOM elements
const modal = document.querySelector(".contact_modal");
const btnOpenModal = document.querySelector(".contact_button");
const btnCloseModal = document.querySelector(".close_button");
const btnSubmit = document.querySelector(".submit_button");
const body = document.body;

// Form elements
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const userMessage = document.getElementById("user-message");
const contactMe = document.getElementById("modalTitle");

/*********** Launching and closing modal form ***********/

// Function to prevent further propagation of the current event
const stopPropagation = (event) => { 
    event.stopPropagation();
}

function launchModal() {
	modal.style.display = "flex";
  body.style.overflow = "hidden"; 

  modal.setAttribute("aria-hidden", false);
  modal.setAttribute("aria-modal", false);
  
  modal.addEventListener("click", closeModal); 
  modal.querySelector(".modal").addEventListener("click", stopPropagation);

  // Pour focuser sur le bouton de fermeture lorsque la modale s'ouvre
  btnCloseModal.focus();

  btnCloseModal.addEventListener("click", closeModal);

  btnSubmit.addEventListener("click", validate);
}

function closeModal() {
  modal.style.display = "none";
  body.style.overflow = "auto";

  modal.setAttribute("aria-hidden", true);
  modal.setAttribute("aria-modal", true);

  modal.removeEventListener("click", closeModal);
  modal.querySelector(".modal").removeEventListener("click", stopPropagation);
}

// Closes modal by pressing the escape key
window.addEventListener("keydown",(event) => {
  if (event.key === 'Escape') {
    closeModal()
  }
});

// Launches modal event by clicking on the button
btnOpenModal.addEventListener("click", launchModal);

/*********** Add photographer ID to the title ***********/

async function getPhotographerIdForm() {
    
  const id = new URLSearchParams(window.location.search).get('id')
  const database = await fetch('data/database.json')
  .then(response => response.json());    
  
  return database.photographers.find(p => ''+p.id === ''+id) 
  
}

const photographer = await getPhotographerIdForm();

contactMe.textContent = "Contactez-moi " + photographer.name;
console.log(photographer)

/*********** Setting and removing the error messages ***********/

const errorElement = (element) => {
  element.parentNode.setAttribute("data-error-visible", true);
  element.setAttribute("aria-invalid", true);
}

const errorMessage = {
  nameValueMinimum: "Veuillez entrer au moins 2 caractères.",
  nameValueInvalid: "Caractères invalides.",
  emailValue: "Veuillez entrer une adresse email valide.",
  userMessageValueMinimum: "Veuillez entrer au moins 2 caractères.",
  userMessageValueInvalid: "Caractères invalides.",
};

const removeErrorElement = (element) => {
  element.parentNode.setAttribute("data-error-visible", false);
  element.setAttribute("aria-invalid", false);
}

/*********** Form elements functions ***********/

/**
 * Validating function
 * @param {HTMLElement} element
 * @returns {boolean} True if element.value is valid
 */

// First name and last name function
const validateName = (element) => {
  let result = true;
  const nameValue = element.value;
  removeErrorElement(element);

  if (!(/^(.{2,})$/).test(nameValue)) {
    result = false;
    element.parentNode.dataset.error=errorMessage.nameValueMinimum;
    errorElement(element);
    
  } else if (!(/^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/).test(nameValue)) {
    result = false;
    element.parentNode.dataset.error=errorMessage.nameValueInvalid;
    errorElement(element);
  }
  return result;
}

// Email function
const validateEmail = (element) => {
  let result = true;
  const emailValue = element.value;
  removeErrorElement(element);

  if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(emailValue)) {
    result = false;
    element.parentNode.dataset.error=errorMessage.emailValue;
    errorElement(element);
  }
  return result;
 }

 // User message function
 const validateUserMessage = (element) => {
  let result = true;
  const userMessageValue = element.value;
  removeErrorElement(element);

  if (!(/^(.{2,})$/).test(userMessageValue)) {
    result = false;
    element.parentNode.dataset.error=errorMessage.userMessageValueMinimum;
    errorElement(element);

  // Ban chevrons 
  } else if (!(/^[A-Za-zÀ-ÖØ-öø-ÿ '-][^\<\>]+$/).test(userMessageValue)) {
    result = false;
    element.parentNode.dataset.error=errorMessage.userMessageValueInvalid;
    errorElement(element);
  }
  return result;
}

/*********** Fields validation of the form ***********/

function validateFields() {
  let result = true;

  result = validateName(firstName) && result;
  result = validateName(lastName) && result;
  result = validateEmail(email) && result;
  result = validateUserMessage(userMessage) && result;

  // If all the fields are correct, the result is validated
  return result; 
}

/*********** Form submission ***********/
const validate = (event) => {
  event.preventDefault();
  if (!validateFields(event)) {
  } else {
    closeModal();
  }
};

/*
Plus tard, le bouton de contact enverra un message au
photographe. Pour l'instant, seulement afficher le contenu des
trois champs dans les logs de la console.
*/