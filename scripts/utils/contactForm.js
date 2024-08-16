export const contactForm = (photographer) => {

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

  // To prevent further propagation of the current event
  const stopPropagation = (event) => { 
      event.stopPropagation();
  };

  // To close modal by pressing the escape key
  const onKeyDownModal = (e) => {
    if(e.key === "Escape") {
      closeModal()
    }
  };

  // Adds photographer ID to the title
  contactMe.innerHTML = "Contactez-moi<br>" + photographer.name;

  function launchModal() {
    modal.style.display = "flex";
    body.style.overflow = "hidden"; 

    wrapper.setAttribute("aria-hidden", true);
    modal.setAttribute("aria-hidden", false);
    modal.setAttribute("aria-modal", false);
    
    modal.addEventListener("click", closeModal); 
    modal.querySelector(".modal").addEventListener("click", stopPropagation);
    btnCloseModal.addEventListener("click", closeModal);
    window.addEventListener("keydown", onKeyDownModal)

    btnCloseModal.focus();

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
    window.removeEventListener("keydown", onKeyDownModal)
    
    btnOpenModal.focus();
  }

  // Launches modal event by clicking on the button
  btnOpenModal.addEventListener("click", launchModal);

  /*********** Setting and removing error messages ***********/

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

    if (!(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(emailValue)) {
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
    } else if (!(/^[A-Za-zÀ-ÖØ-öø-ÿ '-][^<>]+$/).test(userMessageValue)) {
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

    return result; 
  }

  /*********** Form submission ***********/
  const validate = (event) => {
    event.preventDefault();
    if (validateFields(event)) {
      closeModal();
      
      console.log({
        firstName: firstName.value, 
        lastName: lastName.value, 
        email: email.value, 
        userMessage: userMessage.value,
      });
    }
  };
}