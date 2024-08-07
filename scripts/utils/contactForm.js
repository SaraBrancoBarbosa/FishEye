/*********** Elements ***********/

// DOM elements
const modal = document.querySelector(".contact_modal");
const btnOpenModal = document.querySelector(".contact_button");
const btnCloseModal = document.querySelector(".close_button");
const btnSubmit = document.querySelector(".submit_button");
const body = document.body;
const wrapper = document.querySelector(".wrapper");

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

  wrapper.setAttribute("aria-hidden", true);
  modal.setAttribute("aria-hidden", false);
  modal.setAttribute("aria-modal", false);
  
  modal.addEventListener("click", closeModal); 
  modal.querySelector(".modal").addEventListener("click", stopPropagation);

  // Focus on the closing button when opening the modal
  btnCloseModal.focus();

  btnCloseModal.addEventListener("click", closeModal);

  btnSubmit.addEventListener("click", validate);
}

function closeModal() {
  modal.style.display = "none";
  body.style.overflow = "auto";

  wrapper.setAttribute("aria-hidden", false);
  modal.setAttribute("aria-hidden", true);
  modal.setAttribute("aria-modal", true);

  modal.removeEventListener("click", closeModal);
  modal.querySelector(".modal").removeEventListener("click", stopPropagation);

  btnOpenModal.focus();
}

// Closes modal by pressing the escape key
window.onkeydown = function(e){
  if(e.key === "Escape") {
    closeModal()
  }
};

// Launches modal event by clicking on the button
btnOpenModal.addEventListener("click", launchModal);

/*********** Add photographer ID to the title ***********/

async function getPhotographerIdForm() {
    
  const id = new URLSearchParams(window.location.search).get("id")
  const database = await fetch("data/database.json")
  .then(response => response.json());    
  
  return database.photographers.find(p => ""+p.id === ""+id) 
  
}

const photographer = await getPhotographerIdForm();

contactMe.innerHTML = "Contactez-moi<br>" + photographer.name;

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
  element.setAttribute("aria-errormessage", "");
}

/*********** Form elements functions ***********/

// First name and last name function
const validateName = (element) => {
  let result = true;
  const nameValue = element.value;
  removeErrorElement(element);

  if (!(/^(.{2,})$/).test(nameValue)) {
    result = false;
    element.parentNode.dataset.error=errorMessage.nameValueMinimum;
    element.setAttribute("aria-errormessage", errorMessage.nameValueMinimum);
    errorElement(element);
  } else if (!(/^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/).test(nameValue)) {
    result = false;
    element.parentNode.dataset.error=errorMessage.nameValueInvalid;
    element.setAttribute("aria-errormessage", errorMessage.nameValueInvalid);
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
    element.setAttribute("aria-errormessage", errorMessage.emailValue);

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
    element.setAttribute("aria-errormessage", errorMessage.userMessageValueMinimum);
    errorElement(element);

  // Ban chevrons 
  } else if (!(/^[A-Za-zÀ-ÖØ-öø-ÿ '-][^\<\>]+$/).test(userMessageValue)) {
    result = false;
    element.parentNode.dataset.error=errorMessage.userMessageValueInvalid;
    element.setAttribute("aria-errormessage", errorMessage.userMessageValueInvalid);
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

  console.log(firstName.value, lastName.value, email.value, userMessage.value);
};