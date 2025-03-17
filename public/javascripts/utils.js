document.addEventListener("DOMContentLoaded", () => {
  const button3 = document.querySelector(".button3");
  const button3Image = button3.querySelector("img");
  const body = document.body;

  button3.addEventListener("click", () => {
    body.classList.toggle("dark");

    document.querySelector(".main__buttons").classList.toggle("dark");
    document
      .querySelector(".main__projects__titleNight")
      .classList.toggle("dark");
    document.querySelector(".main__projects__nextel").classList.toggle("dark");
    document
      .querySelector(".main__projects__video__subtitle p")
      .classList.toggle("dark");
    document.querySelector("footer").classList.toggle("dark");

    const mainText = document.querySelector(".main__text");
    const mainButtonsText = document.querySelectorAll(".main__buttons__text");
    const mainButtonsSubtext = document.querySelectorAll(
      ".main__buttons__subtext"
    );

    if (body.classList.contains("dark")) {
      mainText.classList.add("dark");
      mainButtonsText.forEach((text) => text.classList.add("dark"));
      mainButtonsSubtext.forEach((subtext) => subtext.classList.add("dark"));

      button3Image.src = "images/header/header__button3dark.png";
      button3.classList.add("dark");

      const projectTitleImage = document.querySelector(
        ".main__projects__titleNight img"
      );
      const footerLogoImage = document.querySelector(".footer__logo img");

      if (body.classList.contains("dark")) {
        projectTitleImage.src = "images/main/main__projects__dark__arrow.png";
        footerLogoImage.src = "images/header/header__logo.png";
      }

      const buttonImages = document.querySelectorAll(
        ".main__buttons__text img"
      );
      buttonImages.forEach((img) => {
        img.src = img.src.replace(
          "main__buttons__play.png",
          "main__buttons__darkplay.png"
        );
      });
    } else {
      mainText.classList.remove("dark");
      mainButtonsText.forEach((text) => text.classList.remove("dark"));
      mainButtonsSubtext.forEach((subtext) => subtext.classList.remove("dark"));

      button3Image.src = "images/header/header__button3.png";
      button3.classList.remove("dark");

      const buttonImages = document.querySelectorAll(
        ".main__buttons__text img"
      );
      buttonImages.forEach((img) => {
        img.src = img.src.replace(
          "main__buttons__darkplay.png",
          "main__buttons__play.png"
        );
      });
    }
    const buttonsToChange = document.querySelectorAll(
      ".main__buttons__founded, .main__buttons__projects"
    );
    buttonsToChange.forEach((button) => {
      button.classList.toggle("dark");
    });
  });
  const openButton = document.querySelector(".button.button1");

  openButton.addEventListener("click", function () {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    const popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");

    const closeButton = document.createElement("img");
    closeButton.classList.add("close");
    closeButton.src = "images/header/header__popupClose.png";
    closeButton.alt = "Закрыть";
    closeButton.style.width = "40px";
    closeButton.style.height = "40px";

    const headerContainer = document.createElement("div");
    headerContainer.classList.add("popup__header");

    const title = document.createElement("h2");
    title.textContent = "Напишите нам";

    const subtitle = document.createElement("p");
    subtitle.innerHTML =
      "Есть вопрос? Свяжитесь с нами и мы предложим <br> интересное решение";

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
    });

    window.addEventListener("click", function (event) {
      if (event.target === popup) {
        document.body.removeChild(popup);
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
