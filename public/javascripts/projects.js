const button3 = document.querySelectorAll(".button3");
const body = document.body;

function updateTheme(isDark) {
  const header = document.querySelector(".header.fixed");
  const headerTop = header ? header.querySelector(".header__top") : null;

  body.classList.toggle("dark", isDark);
  if (header) {
    header.classList.toggle("dark", isDark);
  }
  if (headerTop) {
    headerTop.classList.toggle("dark", isDark);
  }

  const headerFixedLogo = document.querySelector(".header.fixed .header__logo img");
    if (headerFixedLogo) {
        if (isDark) {
            headerFixedLogo.src = "images/header/header__logo.svg";
        } else {
            headerFixedLogo.src = "images/footer/footer__logo.svg";
        }
    } else {
        console.error("Логотип не найден в header.fixed");
    }
    const detailsImages = document.querySelectorAll(".header__details img");
    detailsImages.forEach((img) => {
        if (isDark) {
            if (img.src.includes("header__telfixed.svg")) {
                img.src = "images/header/header__tel.svg"; 
            } else if (img.src.includes("header__emailfixed.svg")) {
                img.src = "images/header/header__email.svg"; 
            }
        } else {
            if (img.src.includes("header__tel.svg")) {
                img.src = "images/header/header__telfixed.svg";
            } else if (img.src.includes("header__email.svg")) {
                img.src = "images/header/header__emailfixed.svg";
            }
        }
    });

    
    const detailTexts = document.querySelectorAll(".header__details p");
    detailTexts.forEach((p) => {
        if (isDark) {
            p.style.color = "white";
        } else {
            p.style.color = "var(--mainTextColor)";
        }
    });
  button3.forEach(button => {
    const button3Image = button.querySelector("img");
    if (isDark) {
      if (button3Image) {
        button3Image.src = "images/header/header__button3dark.svg";
      }
      button.classList.add("dark");

      const footerLogoImage = document.querySelector(".footer__logo.prj img");
      const headerLogoImage = document.querySelector(".header__logo.prj img");
      footerLogoImage.src = "images/header/header__logo.svg";
      headerLogoImage.src = "images/header/header__logo.svg";
      document.querySelector("footer").classList.add("dark");
    } else {
      
      if (button3Image) {
        button3Image.src = "images/header/header__button3.svg";
      }
      button.classList.remove("dark");

      document.querySelector("footer").classList.remove("dark");

      const footerLogoImage = document.querySelector(".footer__logo img");
      const headerLogoImage = document.querySelector(".header__logo.prj img");
      footerLogoImage.src = "images/footer/footer__logo.svg";
      headerLogoImage.src = "images/footer/footer__logo.svg";
    }
  })
}
const isDarkTheme = localStorage.getItem("darkTheme") === "true";
updateTheme(isDarkTheme);

button3.forEach(button => {
  button.addEventListener("click", () => {
    const isDark = !body.classList.contains("dark");
    updateTheme(isDark);
    localStorage.setItem("darkTheme", isDark);
  });
});
const openButton = document.querySelectorAll(".button.button1");
const fixedHeader = document.querySelector('.header.fixed');
const mainContent = document.querySelector('main');
fixedHeader.classList.remove('visible');

window.addEventListener('scroll', () => {
    if (window.scrollY > mainContent.offsetTop) {
        fixedHeader.classList.add('visible');
    } else {
        fixedHeader.classList.remove('visible');
    }
});
openButton.forEach(button => {
  button.addEventListener("click", function () {    
    fixedHeader.style.display = 'none';

    const popup = document.createElement("div");
    popup.classList.add("popup");

    const popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");

    const closeButton = document.createElement("img");
    closeButton.classList.add("close");
    closeButton.src = "images/header/header__popupClose.svg";
    closeButton.alt = "Закрыть";

    const headerContainer = document.createElement("div");
    headerContainer.classList.add("popup__header");

    const title = document.createElement("h2");
    title.textContent = "Напишите нам";

    const subtitle = document.createElement("p");
    subtitle.innerHTML =
      "Есть вопрос? Свяжитесь с нами и мы предложим интересное решение";

    headerContainer.appendChild(title);
    headerContainer.appendChild(subtitle);
    popupContent.appendChild(closeButton);
    popupContent.appendChild(headerContainer);

    const inputsContainer = document.createElement("div");
    inputsContainer.classList.add("popup__inputs");

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Имя*";
    nameInput.required = true;

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.placeholder = "Email*";
    emailInput.required = true;

    const phoneInput = document.createElement("input");
    phoneInput.type = "tel";
    phoneInput.placeholder = "Телефон*";
    phoneInput.required = true;

    phoneInput.addEventListener("input", function () {
      let input = phoneInput.value.replace(/\D/g, "");
      if (input.length > 11) input = input.slice(0, 11);

      let formatted = "+7 ";
      if (input.length > 1) {
        formatted += "(" + input.slice(1, 4);
        if (input.length > 4) {
          formatted += ") " + input.slice(4, 7);
          if (input.length > 7) {
            formatted += "-" + input.slice(7, 9);
            if (input.length > 9) {
              formatted += "-" + input.slice(9, 11);
            }
          }
        }
      }
      phoneInput.value = formatted;
    });

    inputsContainer.appendChild(nameInput);
    inputsContainer.appendChild(emailInput);
    inputsContainer.appendChild(phoneInput);

    const textarea = document.createElement("textarea");
    textarea.placeholder = "Комментарий (по желанию)";
    inputsContainer.appendChild(textarea);
    popupContent.appendChild(inputsContainer);

    const submitContainer = document.createElement("div");
    submitContainer.classList.add("popup__submit");

    const fileContainer = document.createElement("div");
    fileContainer.classList.add("popup__file");

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";

    const fileButton = document.createElement("button");
    fileButton.classList.add("file-button");

    fileButton.addEventListener("click", function () {
      fileInput.click();
    });

    const fileLabel = document.createElement("span");
    fileLabel.classList.add("desktop");

    fileLabel.textContent = "Прикрепить файл";
    fileContainer.appendChild(fileInput);
    fileContainer.appendChild(fileButton);
    fileContainer.appendChild(fileLabel);

    const submitButtonContainer = document.createElement("div");
    submitButtonContainer.classList.add("popup__button");
    const submitButton = document.createElement("button");
    submitButton.textContent = "Отправить";
    submitButton.type = "button";
    submitButtonContainer.appendChild(submitButton);

    submitContainer.appendChild(fileContainer);
    submitContainer.appendChild(submitButtonContainer);
    popupContent.appendChild(submitContainer);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);

    popup.style.display = "flex";

    closeButton.addEventListener("click", function () {
      document.body.removeChild(popup);
      fixedHeader.style.display = 'block';

    });

    window.addEventListener("click", function (event) {
      if (event.target === popup) {
        document.body.removeChild(popup);
        fixedHeader.style.display = 'block';

      }
    });

    submitButton.addEventListener("click", function () {
      let isValid = true;

      const namePattern = /^[А-ЯЁ][а-яё]{0,14}$/;
      if (!namePattern.test(nameInput.value)) {
        nameInput.classList.add("error");
        isValid = false;
      } else {
        nameInput.classList.remove("error");
      }

      if (!emailInput.validity.valid) {
        emailInput.classList.add("error");
        isValid = false;
      } else {
        emailInput.classList.remove("error");
      }

      if (phoneInput.value.trim() === "") {
        phoneInput.classList.add("error");
        isValid = false;
      } else {
        phoneInput.classList.remove("error");
      }

      if (isValid) {
        alert("Форма успешно отправлена!");
        document.body.removeChild(popup);
      } else {
        alert("Пожалуйста, исправьте ошибки в форме.");
      }
    });
});
});