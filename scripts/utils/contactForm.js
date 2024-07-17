/*********** Elements ***********/

// DOM elements
const modal = document.querySelector(".contact_modal");
const btnOpenModal = document.querySelector(".contact_button");
const btnCloseModal = document.querySelector(".close_contact_button");
const btnSubmit = document.querySelector(".submit_button");
const body = document.body;
const backgroundHtml = document.querySelector(".wrapper");

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

  backgroundHtml.setAttribute("aria-hidden", true);
  modal.setAttribute("aria-hidden", false);
  modal.setAttribute("aria-modal", false);
  
  modal.addEventListener("click", closeModal); 
  modal.querySelector(".modal").addEventListener("click", stopPropagation);

  // Pour focuser sur le bouton de fermeture lorsque la modale s'ouvre
  // Pour l'instant ça ne fonctionne pas D:
  btnCloseModal.focus();

  btnCloseModal.addEventListener("click", closeModal);

  btnSubmit.addEventListener("click", validate);
}

function closeModal() {
  modal.style.display = "none";
  body.style.overflow = "auto";

  backgroundHtml.setAttribute("aria-hidden", false);
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
  
  return (
      {
        photographer: database.photographers.find(p => ''+p.id === ''+id),
      }
  )
}

const id = await getPhotographerIdForm();

contactMe.textContent = "Contactez-moi " + id;
console.log(id)

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
  element.parentNode.setAttribute("data-error-visible", false);
  element.setAttribute("aria-invalid", false);

  if (!(/^(.{2,})$/).test(nameValue)) {
    result = false;
    element.parentNode.dataset.error="Veuillez entrer au moins 2 caractères."
    element.parentNode.setAttribute("data-error-visible", true);
    element.setAttribute("aria-invalid", true);
  } else if (!(/^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/).test(nameValue)) {
    result = false;
    element.parentNode.dataset.error="Caractères invalides.";
    element.parentNode.setAttribute("data-error-visible", true);
    element.setAttribute("aria-invalid", true);
  }
  return result;
}

// Email function
const validateEmail = (element) => {
  let result = true;
  const emailValue = element.value;
  element.parentNode.setAttribute("data-error-visible", false);
  element.setAttribute("aria-invalid", false);

  if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(emailValue)) {
    result = false;
    element.parentNode.dataset.error="Veuillez entrer une adresse email valide.";
    element.parentNode.setAttribute("data-error-visible", true);
    element.setAttribute("aria-invalid", true);
  }
  return result;
 }

 // User message function
 const validateUserMessage = (element) => {
  let result = true;
  const userMessageValue = element.value;
  element.parentNode.setAttribute("data-error-visible", false);
  element.setAttribute("aria-invalid", false);

  if (!(/^(.{2,})$/).test(userMessageValue)) {
    result = false;
    element.parentNode.dataset.error="Veuillez entrer au moins 2 caractères."
    element.parentNode.setAttribute("data-error-visible", true);
    element.setAttribute("aria-invalid", true);

  // Interdire les chevrons  
  } else if (!(/^[A-Za-zÀ-ÖØ-öø-ÿ '-][^\<\>]+$/).test(userMessageValue)) {
    result = false;
    element.parentNode.dataset.error="Caractères invalides."
    element.parentNode.setAttribute("data-error-visible", true);
    element.setAttribute("aria-invalid", true);
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