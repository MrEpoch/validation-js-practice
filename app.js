const form = document.querySelector("form");
const email = document.querySelector("#mail");
const country = document.querySelector("#country");
const zip = document.querySelector("#zip");
const password = document.querySelector("#password");
const confPass = document.querySelector("#conf-password");

const emailError = document.querySelector("#mail + span.errorMail");
const countryError = document.querySelector("#country + span.errorCountry");
const zipError = document.querySelector("#zip + span.errorZip");
const passwordError = document.querySelector("#password + span.errorPass");
const confPassError = document.querySelector(
  "#conf-password + span.errorConfPass"
);

const checkZip = (shortState) => {
  function ZipObj(regExpZip, state, zipDig, zipCondt) {
    this.RegExpZip = regExpZip;
    this.message = `${state} ZIP's must have exactly ${zipDig}, ${zipCondt}`;
  }
  const zipStates = {
    ch: new ZipObj(
      "^(CH-)?\\d{4}$",
      "Switzerland",
      "4",
      "e.g. CH-1950 or 1950"
    ),
    fr: new ZipObj("^(F-)?\\d{5}$", "France", "5", "e.g. F-75012 or 75012"),
    de: new ZipObj("^(D-)?\\d{5}$", "Germany", "5", "e.g. D-12345 or 12345"),
    nl: new ZipObj(
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland",
      "4",
      "followed by 2 letters except SA, SD and SS"
    ),
    cz: new ZipObj("^(CZ-)?\\d{5}$", "Czech", "5", "e.g. CZ-10000 or 10000"),
  };

  if (shortState === "fr" || shortState === "de" || shortState === "cz") {
    zip.setAttribute("minLength", "5");
    zip.setAttribute("maxlength", "5");
  } else {
    zip.setAttribute("maxlength", "4");
    zip.setAttribute("minlength", "4");
  }

  const constraint = new RegExp(zipStates[shortState].RegExpZip, "");
  if (constraint.test(zip.value)) {
    return true;
  }
  if (!constraint.test(zip.value)) {
    return zipStates[shortState].message;
  }
  return false;
};

function showError() {
  const emailErr = () => {
    if (email.validity.valueMissing) {
      emailError.textContent = "You need to enter email address.";
    } else if (email.validity.typeMismatch) {
      emailError.textContent = "Entered value needs to be valid email address.";
    } else if (email.validity.tooShort) {
      emailError.textContent = `Email should at least be ${email.minLength} characters long you enter ${email.value.length}.`;
    }
  };

  const countryErr = () => {
    if (country.validity.valueMissing) {
      countryError.textContent = "You need to choose country.";
    }
  };

  const zipErr = (shortState) => {
    if (checkZip(shortState) !== true) {
      zipError.textContent = checkZip(shortState);
    } else if (zip.validity.valueMissing) {
      zipError.textContent = "ZIP is required!";
    } else if (zip.validity.tooShort) {
      zipError.textContent = "Too short!";
    } else if (zip.validity.tooLong) {
      zipError.textContent = "Too long";
    }
  };

  const passErr = () => {
    passwordError.textContent = "At least 8 characters long";
  };

  const confpassErr = () => {
    if (password.value !== confPass.value) {
      passwordError.textContent = "Password and confirm password don't match";
      confPassError.textContent = "Password and confirm password don't match";
    }
  };

  return { emailErr, countryErr, zipErr, passErr, confpassErr };
}

const formListener = () => {
  form.addEventListener("submit", (event) => {
    if (!email.validity.valid) {
      showError().emailErr();
      event.preventDefault();
    }
    if (!country.validity.valid) {
      showError().countryErr();
      event.preventDefault();
    }
    if (!zip.validity.valid) {
      showError().zipErr(country.value);
      event.preventDefault();
    }
    if (!password.validity.valid) {
      showError().passErr();
      event.preventDefault();
    }
    if (!confPass.validity.valid) {
      showError().confpassErr();
      event.preventDefault();
    }
  });
};

formListener();

email.addEventListener("input", () => {
  if (email.value.length !== 0) {
    email.classList.add("val");
  } else {
    email.classList.remove("val");
  }
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "errorMail";
  } else {
    showError().emailErr();
  }
});

country.addEventListener("input", () => {
  if (country.value.length !== 0) {
    country.classList.add("val");
  } else {
    country.classList.remove("val");
  }
  if (country.validity.valid) {
    countryError.textContent = "";
    countryError.className = "errorCountry";
  } else {
    showError().countryErr();
  }
});

zip.addEventListener("input", () => {
  if (zip.value.length !== 0) {
    zip.classList.add("val");
  } else {
    zip.classList.remove("val");
  }
  if (zip.validity.valid) {
    zipError.textContent = "";
    zipError.className = "errorZip";
  } else {
    showError().zipErr(country.value);
  }
});

password.addEventListener("input", () => {
  if (password.value.length !== 0) {
    password.classList.add("val");
  } else {
    password.classList.remove("val");
  }
  if (password.validity.valid) {
    passwordError.textContent = "";
    passwordError.className = "errorPass";
  } else {
    showError().passErr();
  }
});

confPass.addEventListener("input", () => {
  if (confPass.value.length !== 0) {
    confPass.classList.add("val");
  } else {
    confPass.classList.remove("val");
  }
  if (confPass.validity.valid) {
    confPassError.textContent = "";
    passwordError.textContent = "";
    confPassError.className = "errorConfPass";
    passwordError.className = "errorPass";
  } else {
    showError().confpassErr();
  }
});
